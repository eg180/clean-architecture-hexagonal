import { ItemDTO } from "../../../application/dto/ItemDTO";

export class ItemService {
	validateItem(item: ItemDTO): boolean {
		// Implement business rules for item validation
		return item.name.length > 0 && parseInt(item.price) > 0;
	}

	calculateDiscount(item: ItemDTO): number {
		const price = parseFloat(item.price);
		// Implement business logic for calculating discounts
		return Math.floor(price * 0.1 * 100) / 100; // 10% discount
	}
}
