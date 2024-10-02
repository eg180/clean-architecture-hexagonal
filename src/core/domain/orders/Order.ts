import { Item } from "../items/Item";
import { Payment } from "../payments/Payment";

export interface Order {
	id: number;
	amount: string;
	items?: Item[];
	payments?: Payment[];
	createdAt: Date;
}
