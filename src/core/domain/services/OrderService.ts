import { Order } from "../entities/Order";
import { OrderDTO } from "../../../application/dto/OrderDTO";

export class OrderService {
	validateItem(order: OrderDTO): boolean {
		return true;
	}
}
