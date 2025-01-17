import {
	FastifyInstance,
	FastifyPluginAsync,
	FastifyPluginOptions,
} from "fastify";
import fp from "fastify-plugin";
import { OrderService } from "../../../../../../core/domain/services/OrderService";
import { OrderApplicationService } from "../../../../../services/OrderApplicationService";
import { InMemoryOrderRepository } from "../../../../../../infrastructure/adapters/repository/inMemory/InMemoryOrderRepository";
import { Order } from "../../../../../../core/domain/entities/Order";

interface IdParams {
	id: number;
}

const orderRoutes: FastifyPluginAsync = async (
	server: FastifyInstance,
	options: FastifyPluginOptions
) => {
	const orderService = new OrderService();
	const orderRepository = new InMemoryOrderRepository();
	const orderApplicationService = new OrderApplicationService(
		orderService,
		orderRepository
	);

	server.post<{ Body: Order }>("/", {}, async (request, reply) => {
		const order = await orderApplicationService.save(request.body);
		return reply.code(201).send(order);
	});

	server.get<{ Params: IdParams }>("/:id", {}, async (request, reply) => {
		const order = await orderApplicationService.getById(request.params.id);
		return reply.code(200).send(order);
	});

	server.get("/", {}, async (request, reply) => {
		const orders = await orderApplicationService.getAll();
		return reply.code(200).send(orders);
	});
};

export default fp(orderRoutes);
