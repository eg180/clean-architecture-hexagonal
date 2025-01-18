import { ItemDTO } from "../../../application/dto/ItemDTO";
import { Money } from "../valueObjects/Money";

export class ItemService {
	calculateDiscount(item: ItemDTO): number {
		const price = parseFloat(item.price.toString());
		return Math.floor(price * 0.1 * 100) / 100; // 10% discount
	}
}
