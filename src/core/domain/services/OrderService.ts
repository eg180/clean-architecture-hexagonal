import { Order } from "../aggregates/Order";
import { Item } from "../aggregates/Item";

export class OrderService {
	public validateItem(orderData: any): boolean {
		try {
			// Use aggregate's validation
			const order = Order.create(orderData.items, orderData.amount);
			return true;
		} catch (error) {
			return false;
		}
	}

	// Other methods using Order aggregate...
}
