import { Order } from "../../core/domain/aggregates/Order";
import { OrderService } from "../../core/domain/services/OrderService";
import { Repository } from "../../core/ports/repository/Repository";

export class OrderApplicationService {
	constructor(
		private orderService: OrderService,
		private orderRepository: Repository<Order>
	) {}

	public async save(orderDto: any): Promise<Order> {
		console.log("orderDto - is the amount a string?", orderDto);
		const order = Order.fromDTO(orderDto);

		return this.orderRepository.save(order);
	}

	public async getById(id: string): Promise<Order> {
		const order = await this.orderRepository.getById(id);
		return order;
	}

	public async getAll(): Promise<Order[]> {
		const orders = await this.orderRepository.getAll();
		return orders;
	}
}
