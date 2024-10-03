import { Item } from "../entities/Item";
import { Order } from "../entities/Order";
import { Payment } from "../entities/Payment";
import { NotFoundError } from "../../../shared/error/NotFoundError";
import { Repository } from "../../ports/repository/Repository";

import { Client } from "../../ports/client/Client";

export class OrderService implements Repository<Order> {
	private readonly orderRepository: Repository<Order>;
	private readonly itemRepository: Repository<Item>;
	private readonly paymentClient: Client<Payment>;

	constructor(
		orderRepository: Repository<Order>,
		itemRepository: Repository<Item>,
		paymentClient: Client<Payment>
	) {
		this.orderRepository = orderRepository;
		this.itemRepository = itemRepository;
		this.paymentClient = paymentClient;
	}

	public async save(order: Order): Promise<Order> {
		order.createdAt = new Date();

		const itemResult = await Promise.all(
			order.items.map(async (item) => {
				return await this.itemRepository.getById(item.id);
			})
		);

		itemResult.forEach((item) => {
			if (!item) {
				throw new NotFoundError("Item not found in database");
			}
		});

		order.items = itemResult;

		const payment = await this.createPayment(order);

		const paymentResult = await this.paymentClient.send(payment);

		order.payments = [paymentResult];

		const orderSaved = await this.orderRepository.save(order);

		return orderSaved;
	}

	public async getById(id: number): Promise<Order> {
		return await this.orderRepository.getById(id);
	}

	public async getAll(): Promise<Order[]> {
		return await this.orderRepository.getAll();
	}

	private async createPayment(order: Order): Promise<Payment> {
		const payment = {
			order,
		} as Payment;

		return payment;
	}
}
