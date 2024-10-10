import { OrderDTO } from "../../../../application/dto/OrderDTO";
import { Order } from "../../../../core/domain/entities/Order";
import { Repository } from "../../../../core/ports/repository/Repository";

export class InMemoryOrderRepository implements Repository<Order> {
	private orderList: Order[] = [];
	private static id: number = 0;

	save(order: OrderDTO): Promise<Order> {
		(order as Order).id = InMemoryOrderRepository.id += 1;
		this.orderList.push(order as Order);
		return Promise.resolve(order as Order);
	}

	getById(id: number): Promise<Order> {
		const order =
			this.orderList.find((order) => order.id === id) ?? ({} as Order);
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
