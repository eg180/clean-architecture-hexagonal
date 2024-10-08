import { OrderDTO } from "../../../application/dto/OrderDTO";
import { ItemDTO } from "../../../application/dto/ItemDTO";
import { Item } from "../../domain/entities/Item";
import { Order } from "../../domain/entities/Order";
// Purpose: Define interfaces for core business logic to interact with external concerns.

export interface Repository<T> {
	save(
		type: T
	): Promise<
		T & (T extends ItemDTO ? { id: number } : { id: number; createdAt: Date })
	>;
	getById(
		id: number
	): Promise<
		T & (T extends ItemDTO ? { id: number } : { id: number; createdAt: Date })
	>;
	getAll(): Promise<T[]>;
}
