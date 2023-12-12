import { CharacterCreationStep } from "./Character.types";
import DecisionStack from "./DecisionStack.types";

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
