import express, { Response, Request } from "express";
import { Item } from "../../../../../../core/domain/entities/Item";
import { ItemApplicationService } from "../../../../../services/ItemApplicationService";

const router = express.Router();

export class ItemController {
	constructor(private itemApplicationService: ItemApplicationService) {}

	async createItem(req: Request<{}, {}, Item>, res: Response) {
		try {
			const item = await this.itemApplicationService.save(req.body);
			res.status(201).json(item);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const item = await this.itemApplicationService.getById(req.params.id);
			if (item) {
				res.json(item);
			} else {
				res.status(404).json({ error: "Item not found" });
			}
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getAll(_: Request, res: Response) {
		try {
			const items = await this.itemApplicationService.getAll();
			res.json(items);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

export default router;
