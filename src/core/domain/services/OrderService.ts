import { Item } from "../entities/Item";
import { Order } from "../entities/Order";
import { Payment } from "../entities/Payment";
import { NotFoundError } from "../../../shared/error/NotFoundError";
import { Repository } from "../../ports/repository/Repository";

import { Client } from "../../ports/client/Client";

export class OrderService {
	validateItem(order: Order): boolean {
		return true;
	}
}
