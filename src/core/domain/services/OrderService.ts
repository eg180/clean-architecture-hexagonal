import { Order } from "../entities/Order";
import { OrderDTO } from "../../../application/dto/OrderDTO";
import { ItemDTO } from "../../../application/dto/ItemDTO";

export class OrderService {
	validateItem(order: OrderDTO): boolean {
		if (
			typeof order.amount !== "string" ||
			(order.items && !Array.isArray(order.items)) ||
			(order.payments && !Array.isArray(order.payments)) ||
			!this.itemTotalIsOrderTotal(order)
		) {
			return false;
		}

		// Add more validation checks as needed

		return true;
	}

	// other business logic if necessary
	itemTotalIsOrderTotal(order: OrderDTO): boolean {
		const itemsTotal: number = order.items.reduce((prev: any, curr) => {
			if (prev?.price) {
				return parseFloat(prev.price) + parseFloat(curr.price);
			} else {
				return curr;
			}
		}, 0);
		console.log(itemsTotal, parseFloat(order.amount));
		return itemsTotal === parseFloat(order.amount);
	}
}
