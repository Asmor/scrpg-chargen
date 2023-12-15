import abilities from "@/data/abilities";
import archetypes, { getArchetypeById } from "@/data/archetypes";
import backgrounds from "@/data/backgrounds";
import personalities from "@/data/personalities";
import powerSources from "@/data/powerSources";
import powersAndQualities from "@/data/powersQualities";
import { PowerCategory, QualityCategory } from "@/data/powersQualities.types";
import principles from "@/data/principles";
import { Container, PrimaryHeader } from "@/util/commonElements";
import { useMemo } from "react";

const filterPq = (specifiers: (string | PowerCategory | QualityCategory)[]) => {
	const allPqCats: string[] = [
		...Object.values(PowerCategory),
		...Object.values(QualityCategory),
	];

	return specifiers.filter(
		specifier => !allPqCats.includes(specifier)
	);
};

const IdAudit = () => {
	const warnings: JSX.Element[] = useMemo(() => {
		const warnings: JSX.Element[] = [];
		const allIds = new Set<string>();
		const duplicateIds = new Set<string>();

		// Get list of valid IDs and find duplicates
		[
			...abilities,
			...archetypes,
			...backgrounds,
			...personalities,
			...powersAndQualities,
			...powerSources,
			...principles,
		].map(entry => entry.id).forEach(id => {
			if ( allIds.has(id) ) {
				duplicateIds.add(id);
			} else {
				allIds.add(id);
			}
		});

		if ( duplicateIds.size ) {
			warnings.push(<div><b>Duplicate Ids:</b> { [...duplicateIds].join(", ") }</div>);
		}

		// Finds references to missing IDs
		const references: string[][] = [
			...abilities.map(ability => ([ability.id, ability.association])),
			...archetypes.map(archetype => {
				const ids = [archetype.id];
				ids.push(...(archetype.mandatoryPq || []));
				ids.push(...(archetype.mandatoryAbilities || []));
				archetype.orderedAssignablePqs.forEach(
					(oapq) => ids.push(...oapq.assignablePqs)
				);
				ids.push(...archetype.abilities);
				ids.push();
				return ids;
			}),
			...backgrounds.map(bg => ([bg.id, ...bg.assignablePqs])),
			...powerSources.map(ps => ([
				ps.id,
				...ps.assignablePqs,
				...ps.abilities,
				...(ps.extraAssignables?.assignablePqs || []),
			])),
			// todo principle abilities are missing
			// ...principles.map(principle => ([principle.id, principle.abilityId])),
			// todo personalities...

		];

		references.forEach(([entryid, ...otherIds]) => {
			const badIds = filterPq(otherIds).filter(id => !allIds.has(id));

			if ( badIds.length ) {
				warnings.push(<div>
					<b>Bad ID references</b>
					&nbsp;
					{ entryid } =&gt; { badIds.join(", ") }
				</div>)
			}
		});

		return warnings;
	}, []);


	if ( warnings.length ) {
		return <Container>
			<PrimaryHeader>ID Audit Warnings ({warnings.length})</PrimaryHeader>
			{ warnings }
		</Container>
	} else {
		return null;
	}
};

export default IdAudit;
