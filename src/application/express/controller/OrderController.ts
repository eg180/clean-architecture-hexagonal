import express from "express";
import { Response, Request } from "express";
import { OrderService } from "../../../core/service/OrderService";
import { InMemoryItemRepository } from "../../../adapters/repository/inMemory/InMemoryItemRepository";
import { InMemoryPaymentClient } from "../../../adapters/client/InMemoryPaymentClient";
import { Repository } from "../../../core/ports/repository/Repository";
import { Client } from "../../../core/ports/client/Client";
import { Order } from "../../../core/domain/orders/Order";
import { Item } from "../../../core/domain/items/Item";
import { Payment } from "../../../core/domain/payments/Payment";
import { InMemoryOrderRepository } from "../../../adapters/repository/inMemory/InMemoryOrderRepository";
import { TypeOrmOrderRepository } from "../../../adapters/repository/typeorm/TypeOrmOrderRepository";
import { TypeOrmItemRepository } from "../../../adapters/repository/typeorm/TypeOrmItemRepository";

const router = express.Router();

const orderInMemoryRepository: Repository<Order> =
	new InMemoryOrderRepository();
const itemInMemoryRepository: Repository<Item> = new InMemoryItemRepository();
const paymentInMemoryClient: Client<Payment> = new InMemoryPaymentClient();

const orderTypeOrmRepository: Repository<Order> = new TypeOrmOrderRepository();
const itemTypeOrmRepository: Repository<Item> = new TypeOrmItemRepository();

// const orderService: OrderService = new OrderService(
// 	orderTypeOrmRepository,
// 	itemTypeOrmRepository,
// 	paymentInMemoryClient
// );

const orderService: OrderService = new OrderService(
	orderInMemoryRepository,
	itemInMemoryRepository,
	paymentInMemoryClient
);

router.post("/", async (req: Request<{}, {}, Order>, res: Response<Order>) => {
	const order = await orderService.createOrder(req.body);
	res.json(order);
});

router.get("/:id", async (req: Request, res: Response<Order>) => {
	const id = parseInt(req.params.id);

	const order = await orderService.findById(id);
	res.json(order);
});

router.get("/", async (req: Request<{}>, res: Response<Order[]>) => {
	const orders = await orderService.findAllOrders();
	res.json(orders);
});

export default router;
