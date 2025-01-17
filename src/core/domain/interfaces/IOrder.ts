import { Item } from "../entities/Item";

export interface IOrder {
	id?: number;
	items: Item[];
	amount: string;
	createdAt?: Date;
}
