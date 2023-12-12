import Decision from "./Decision.types";

export default interface DecisionStack {
	decisions: Decision[];
	initialized: boolean;
}
