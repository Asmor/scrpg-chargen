import { atom } from "recoil";

export const flattenSide = atom({
	key: "flattenSide",
	default: true,
});

export const invertOrder = atom({
	key: "invertOrder",
	default: true,
});
