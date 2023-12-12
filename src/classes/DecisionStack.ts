import DecisionStack from "./DecisionStack.types";

export const getnewDecisionStack = (): DecisionStack => {
	const stack: DecisionStack = {
		decisions: [],
		initialized: false,
	};

	return stack;
};
