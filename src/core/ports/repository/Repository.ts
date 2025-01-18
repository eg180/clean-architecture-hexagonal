import { CreateOrderDTO } from "../../../application/dto/CreateOrderDTO";
import { ItemDTO } from "../../../application/dto/ItemDTO";
import { Item } from "../../domain/entities/Item";
import { Order } from "../../domain/entities/Order";
// Purpose: Define interfaces for core business logic to interact with external concerns.

export interface Repository<T> {
	save(entity: T): Promise<T>;
	getById(id: string): Promise<T>;
	getAll(): Promise<T[]>;
	clear(): void;
}
