export const noop = () => {};

export const getByIdFactory = <T extends {id: string}>(values: T[]) => {
	return (id: string) => values.find(value => value.id === id);
};
