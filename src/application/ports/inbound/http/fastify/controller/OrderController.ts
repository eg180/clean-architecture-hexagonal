import {
	FastifyInstance,
	FastifyPluginOptions,
	FastifyPluginAsync,
} from "fastify";
import fp from "fastify-plugin";

import { OrderService } from "../../../../../../core/domain/services/OrderService";
import { Order } from "../../../../../../core/domain/entities/Order";
import { InMemoryOrderRepository } from "../../../../../../infrastructure/adapters/repository/inMemory/InMemoryOrderRepository";
import { OrderApplicationService } from "../../../../../../application/services/OrderApplicationService";

const orderService = new OrderService();
const inMemoryOrderRepository = new InMemoryOrderRepository();

const orderApplicationService: OrderApplicationService =
	new OrderApplicationService(orderService, inMemoryOrderRepository);

interface idParams {
	id: number;
}

const OrderController: FastifyPluginAsync = async (
	server: FastifyInstance,
	options: FastifyPluginOptions
) => {
	server.post<{ Body: Order }>("/", {}, async (request, reply) => {
		try {
			const order = await orderApplicationService.save(request.body);
			return reply.code(201).send(order);
		} catch (error) {
			request.log.error(error);
			return reply.send(500);
		}
	});

	server.get<{ Params: idParams }>("/:id", {}, async (request, reply) => {
		const id = request.params.id.toString();
		const order = await orderApplicationService.getById(id);
		return reply.code(200).send(order);
	});

	server.get("/", {}, async (_, reply) => {
		const orders = await orderApplicationService.getAll();
		return reply.code(200).send(orders);
	});

	server.get("/ping", {}, async (request, reply) => {
		return reply.code(200).send({ msg: "pong" });
	});
};

export default fp(OrderController);
