import express, { Response, Request } from "express";
import { OrderApplicationService } from "../../services/OrderApplicationService";
import { Order } from "../../../core/domain/entities/Order";

const router = express.Router();
export class OrderController {
	constructor(private orderApplicationService: OrderApplicationService) {}

	async createOrder(req: Request<{}, {}, Order>, res: Response) {
		try {
			const order = await this.orderApplicationService.save(req.body);
			res.status(201).json(order);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const order = await this.orderApplicationService.getById(
				parseInt(req.params.id)
			);
			if (order) {
				res.status(200).json(order);
			} else {
				res.status(404).json({ error: "Order not found" });
			}
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getAll(_: Request, res: Response) {
		try {
			const orders = await this.orderApplicationService.getAll();
			res.status(200).json(orders);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

export default router;
