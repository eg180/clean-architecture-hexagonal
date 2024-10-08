import { Order } from "../../core/domain/entities/Order";
import { OrderService } from "../../core/domain/services/OrderService";
import { Repository } from "../../core/ports/repository/Repository";
import { OrderDTO } from "../dto/OrderDTO";

export class OrderApplicationService {
	constructor(
		private orderService: OrderService,
		private orderRepository: Repository<OrderDTO>
	) {}

	public async save(order: OrderDTO): Promise<Order> {
		if (!this.orderService.validateItem(order)) {
			throw new Error("Invalid order");
		}
		return this.orderRepository.save(order);
	}

	public async getById(id: number): Promise<Order> {
		const order = await this.orderRepository.getById(id);
		return order;
	}

	public async getAll(): Promise<OrderDTO[]> {
		const orders = await this.orderRepository.getAll();
		return orders;
	}
}
