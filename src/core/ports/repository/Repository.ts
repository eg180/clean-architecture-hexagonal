import { OrderDTO } from "../../../application/dto/OrderDTO";
import { ItemDTO } from "../../../application/dto/ItemDTO";
import { Item } from "../../domain/entities/Item";
import { Order } from "../../domain/entities/Order";
// Purpose: Define interfaces for core business logic to interact with external concerns.

export interface Repository<T> {
	save(entity: T): Promise<T & (T extends ItemDTO ? { id: number } : T)>;
	getById(id: number): Promise<T & (T extends ItemDTO ? { id: number } : T)>;
	getAll(): Promise<T[]>;
}
