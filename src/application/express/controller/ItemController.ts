import express from "express";
import { Response, Request } from "express";
import { InMemoryItemRepository } from "../../../adapters/repository/inMemory/InMemoryItemRepository";
import { Repository } from "../../../core/ports/repository/Repository";
import { Item } from "../../../core/domain/items/Item";
import { TypeOrmItemRepository } from "../../../adapters/repository/typeorm/TypeOrmItemRepository";
import { ItemService } from "../../../core/service/ItemService";

const router = express.Router();

// const itemTypeOrmRepository: Repository<Item> = new TypeOrmItemRepository();
const inMemoryRepository: Repository<Item> = new InMemoryItemRepository();

const itemService: ItemService = new ItemService(inMemoryRepository);

router.post("/", async (req: Request<{}, {}, Item>, res: Response<Item>) => {
	const item = await itemService.save(req.body);
	res.json(item);
});

router.get("/:id", async (req, res) => {
	const item = await itemService.getById(parseInt(req.params.id));
	res.json(item);
});

router.get("/", async (_, res) => {
	const items = await itemService.getAll();
	res.json(items);
});

export default router;
