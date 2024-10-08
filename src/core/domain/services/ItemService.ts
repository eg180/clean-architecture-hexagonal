import { Item } from "../entities/Item";

export class ItemService {
	validateItem(item: Omit<Item, "id">): boolean {
		// Implement business rules for item validation
		return item.name.length > 0 && parseInt(item.price) > 0;
	}

	calculateDiscount(item: Omit<Item, "id">): number {
		const price = parseFloat(item.price);
		// Implement business logic for calculating discounts
		return Math.floor(price * 0.1 * 100) / 100; // 10% discount
	}
}
