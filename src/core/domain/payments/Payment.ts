import { Order } from "../orders/Order";

export interface Payment {
	id: number;
	order?: Order;
	paidAt: Date;
}
