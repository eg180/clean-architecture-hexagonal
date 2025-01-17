import express from "express";
import { ItemController } from "../controller/ItemController";
import { ItemApplicationService } from "../../../../../services/ItemApplicationService";
import { ItemService } from "../../../../../../core/domain/services/ItemService";
import { InMemoryItemRepository } from "../../../../../../infrastructure/adapters/repository/inMemory/InMemoryItemRepository";

const router = express.Router();

const itemService = new ItemService();
const inMemoryRepository = new InMemoryItemRepository();
const itemApplicationService = new ItemApplicationService(
	itemService,
	inMemoryRepository
);
const itemController = new ItemController(itemApplicationService);

router.post("/", itemController.createItem.bind(itemController));
router.get("/:id", itemController.getById.bind(itemController));
router.get("/", itemController.getAll.bind(itemController));

export default router;
