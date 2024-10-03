import express from "express";
import { Response, Request } from "express";
import { OrderService } from "../../../core/domain/services/OrderService";
import { InMemoryItemRepository } from "../../../infrastructure/adapters/repository/inMemory/InMemoryItemRepository";
import { InMemoryPaymentClient } from "../../../infrastructure/adapters/client/InMemoryPaymentClient";
import { Repository } from "../../../core/ports/repository/Repository";
import { Client } from "../../../core/ports/client/Client";
import { Order } from "../../../core/domain/entities/Order";
import { Item } from "../../../core/domain/entities/Item";
import { Payment } from "../../../core/domain/entities/Payment";
import { InMemoryOrderRepository } from "../../../infrastructure/adapters/repository/inMemory/InMemoryOrderRepository";
import { TypeOrmOrderRepository } from "../../../infrastructure/adapters/repository/typeorm/TypeOrmOrderRepository";
import { TypeOrmItemRepository } from "../../../infrastructure/adapters/repository/typeorm/TypeOrmItemRepository";

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
	const order = await orderService.save(req.body);
	res.json(order);
});

router.get("/:id", async (req: Request, res: Response<Order>) => {
	const id = parseInt(req.params.id);

	const order = await orderService.getById(id);
	res.json(order);
});

router.get("/", async (req: Request<{}>, res: Response<Order[]>) => {
	const orders = await orderService.getAll();
	res.json(orders);
});

export default router;
