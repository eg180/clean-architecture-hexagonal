import { Item } from "../entities/Item";

export class ItemFactory {
	static create(name: string, price: string): Item {
		if (name.trim().length === 0) {
			throw new Error("Item name cannot be empty");
		}
		if (parseInt(price) <= 0) {
			throw new Error("Item price must be greater than zero");
		}

		return { id: undefined, name, price };
	}
}
