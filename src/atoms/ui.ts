import { atom } from "recoil";

export const flattenSide = atom({
	key: "flattenSide",
	default: false,
});

export const invertOrder = atom({
	key: "invertOrder",
	default: true,
});
