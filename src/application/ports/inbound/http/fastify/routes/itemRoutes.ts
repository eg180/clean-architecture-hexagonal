import {
	FastifyInstance,
	FastifyPluginAsync,
	FastifyPluginOptions,
} from "fastify";
import fp from "fastify-plugin";
import { ItemService } from "../../../../../../core/domain/services/ItemService";
import { ItemApplicationService } from "../../../../../services/ItemApplicationService";
import { InMemoryItemRepository } from "../../../../../../infrastructure/adapters/repository/inMemory/InMemoryItemRepository";
import { Item } from "../../../../../../core/domain/entities/Item";

interface IdParams {
	id: string;
}

const itemRoutes: FastifyPluginAsync = async (
	server: FastifyInstance,
	options: FastifyPluginOptions
) => {
	const itemService = new ItemService();
	const itemRepository = new InMemoryItemRepository();
	const itemApplicationService = new ItemApplicationService(
		itemService,
		itemRepository
	);

	server.post<{ Body: Item }>("/", {}, async (request, reply) => {
		const item = await itemApplicationService.save(request.body);
		return reply.code(201).send(item);
	});

	server.get<{ Params: IdParams }>("/:id", {}, async (request, reply) => {
		const item = await itemApplicationService.getById(request.params.id);
		return reply.code(200).send(item);
	});

	server.get("/", {}, async (request, reply) => {
		const items = await itemApplicationService.getAll();
		return reply.code(200).send(items);
	});
};

export default fp(itemRoutes);
