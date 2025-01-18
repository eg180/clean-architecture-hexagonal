import { Repository as RepositoryEntity } from "typeorm";
import { Item } from "../../../../core/domain/entities/Item";
import { Order } from "../../../../core/domain/entities/Order";
import { Payment } from "../../../../core/domain/entities/Payment";
import { Repository } from "../../../../core/ports/repository/Repository";
import { AppDataSource } from "./data-source";
import { ItemEntity } from "./entity/ItemEntity";
import { OrderEntity } from "./entity/OrderEntity";
import { PaymentEntity } from "./entity/PaymentEntity";
import { Money } from "../../../../core/domain/valueObjects/Money";

export class TypeOrmOrderRepository implements Repository<Order> {
	private readonly entityManager: RepositoryEntity<OrderEntity>;

	constructor() {
		this.entityManager = AppDataSource.getRepository(OrderEntity);
	}

	async save(order: Order): Promise<Order> {
		const orderEntity = this.mapToOrderEntity(order);

		const orderSaved = await this.entityManager.save(orderEntity);

		return this.mapToOrderModel(orderSaved);
	}

	async getById(id: string): Promise<Order> {
		const orderEntity = await this.entityManager
			.createQueryBuilder("order")
			.where("order.id = :id", { id })
			.leftJoinAndSelect("order.items", "item")
			.leftJoinAndSelect("order.payments", "payment")
			.getOne();

		return this.mapToOrderModel(orderEntity);
	}

	async getAll(): Promise<Order[]> {
		const allOrders = await this.entityManager
			.createQueryBuilder("order")
			.leftJoinAndSelect("order.items", "item")
			.leftJoinAndSelect("order.payments", "payment")
			.getMany();

		return allOrders.map((order) => this.mapToOrderModel(order));
	}

	async clear(): Promise<void> {
		await this.entityManager.clear();
	}

	private mapToOrderModel(orderEntity: OrderEntity): Order {
		const itemModel = orderEntity.items.map((item) => ({
			id: item.id.toString(),
			name: item.name,
			price: Money.fromString(item.price),
		}));

		const paymentModel = orderEntity.payments.map((payment) => ({
			id: payment.id.toString(),
			paidAt: payment.paidAt,
		}));

		return {
			id: orderEntity.id.toString(),
			amount: orderEntity.amount,
			items: itemModel,
			payments: paymentModel,
			createdAt: orderEntity.createdAt,
		};
	}

	private mapToOrderEntity(order: Order): OrderEntity {
		const itemList = order.items.map((item) => {
			const itemEntity: ItemEntity = new ItemEntity();
			itemEntity.id = parseInt(item.id);
			itemEntity.name = item.name;
			itemEntity.price = item.price.toString();
			return itemEntity;
		});

		const paymentList = order.payments.map((payment) => {
			const paymentEntity: PaymentEntity = new PaymentEntity();
			paymentEntity.id = parseInt(payment.id);
			paymentEntity.paidAt = payment.paidAt;
			return paymentEntity;
		});

		const orderEntity: OrderEntity = new OrderEntity();
		orderEntity.id = parseInt(order.id);
		orderEntity.amount = order.amount;
		orderEntity.items = itemList;
		orderEntity.payments = paymentList;
		orderEntity.createdAt = order.createdAt;

		return orderEntity;
	}
}
