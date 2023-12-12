import { CharacterCreationStep } from "./Character";
import Decision, { DecisionUpdate } from "./Decision";

export default interface DecisionStack {
	decisions: Decision[];
	initialized: boolean;
	onUpdate: DecisionUpdate;
}

export const getnewDecisionStack = (onUpdate: Function): DecisionStack => {
	const stack: DecisionStack = {
		decisions: [],
		initialized: false,
		onUpdate: function (decisionIndex) {
			for ( let i = decisionIndex + 1; i < this.decisions.length; i++ ) {
				this.decisions[i].reset();
			}
			onUpdate();
		},
	};

	return stack;
};

export const initializeStack = (
	stack: DecisionStack,
	characterCreationSteps: CharacterCreationStep[],
) => {
	if (!stack.initialized) {
		stack.initialized = true;
		stack.decisions.push(
			...characterCreationSteps.map(step => step(stack))
		);
	}
};
