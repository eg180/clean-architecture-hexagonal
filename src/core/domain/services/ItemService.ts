import { Item } from "../entities/Item";

export class ItemService {
	validateItem(item: Item): boolean {
		// Implement business rules for item validation
		return item.name.length > 0 && parseInt(item.price) > 0;
	}

	calculateDiscount(item: Item): number {
		// Implement business logic for calculating discounts
		return parseInt(item.price) * 0.1; // 10% discount
	}
}
