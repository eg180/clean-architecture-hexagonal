import { Order } from "../../../../core/domain/entities/Order";
import { Repository } from "../../../../core/ports/repository/Repository";

export class InMemoryOrderRepository implements Repository<Order> {
	private orderList: Order[] = [];

	save(order: Order): Promise<Order> {
		this.orderList.push(order);
		return Promise.resolve(order);
	}

	getById(id: number): Promise<Order> {
		const order =
			this.orderList.find((order) => order.id === id) ?? ({} as Order);
		return Promise.resolve(order);
	}

	getAll(): Promise<Order[]> {
		return Promise.resolve(this.orderList);
	}
}
