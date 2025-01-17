import express from "express";
import { OrderService } from "../../../../../../core/domain/services/OrderService";
import { OrderController } from "../controller/OrderController";
import { OrderApplicationService } from "../../../../../services/OrderApplicationService";
import { InMemoryItemRepository } from "../../../../../../infrastructure/adapters/repository/inMemory/InMemoryItemRepository";
import { InMemoryOrderRepository } from "../../../../../../infrastructure/adapters/repository/inMemory/InMemoryOrderRepository";

const router = express.Router();

const orderService = new OrderService();
const inMemoryOrderRepository = new InMemoryOrderRepository();

const orderApplicationService = new OrderApplicationService(
	orderService,
	inMemoryOrderRepository
);

const orderController = new OrderController(orderApplicationService);

router.post("/", orderController.createOrder.bind(orderController));
router.get("/:id", orderController.getById.bind(orderController));
router.get("/", orderController.getAll.bind(orderController));

export default router;
