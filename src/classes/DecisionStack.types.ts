import Decision, { DecisionUpdate } from "./Decision.types";

export default interface DecisionStack {
	decisions: Decision[];
	initialized: boolean;
	onUpdate: DecisionUpdate;
}
