import { Order } from "../aggregates/Order";

export class OrderService {
	public validateItem(orderData: any): boolean {
		try {
			// Let Order aggregate handle all validation
			Order.create(orderData.items, orderData.amount, orderData.payments);
			return true; // Order is valid if no errors thrown
		} catch (error) {
			// Any validation error from Order means invalid
			return false;
		}
	}

	// Other methods using Order aggregate...
}
