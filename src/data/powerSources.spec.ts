import { expectUniqueIds } from "@/util/test";
import powerSources from "./powerSources";

describe("Power Sources", () => {
	test("Have unique IDs", () => {
		expectUniqueIds(powerSources);
	});
});
