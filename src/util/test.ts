import { Entry } from "@/types/common";

export const findDuplicateIds = (values: Entry[]) => {
	const seen = new Set<string>();
	const duplicates = new Set<string>();

	values.map(value => value.id).forEach(id => {
		if (seen.has(id)) {
			duplicates.add(id);
		} else {
			seen.add(id);
		}
	});

	return [...duplicates].sort();
};

export const expectUniqueIds = (values: Entry[]) => {
	expect(findDuplicateIds(values)).toStrictEqual([]);
};
