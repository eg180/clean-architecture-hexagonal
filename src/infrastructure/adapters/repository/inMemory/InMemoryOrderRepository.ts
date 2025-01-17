import { Order } from "../../../../core/domain/aggregates/Order";
import { Repository } from "../../../../core/ports/repository/Repository";

export class InMemoryOrderRepository implements Repository<Order> {
	private orderList: Order[] = [];
	private static id: number = 0;

	save(order: Order): Promise<Order> {
		this.orderList.push(order);
		return Promise.resolve(order);
	}

	getById(id: number): Promise<Order> {
		const order = this.orderList.find((order) => order.toDTO().id === id);
		if (!order) {
			throw new Error(`Order with id ${id} not found`);
		}
		return Promise.resolve(order);
	}

	getAll(): Promise<Order[]> {
		return Promise.resolve(this.orderList);
	}

	clear(): void {
		this.orderList = [];
		InMemoryOrderRepository.id = 0;
	}
}
