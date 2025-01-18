import { Item } from "../../../../core/domain/aggregates/Item";
import { Repository } from "../../../../core/ports/repository/Repository";
import { v4 as uuidv4 } from "uuid";

export class InMemoryItemRepository implements Repository<Item> {
	private itemList: Item[] = [];
	private static id: string = uuidv4();

	save(item: Item): Promise<Item> {
		this.itemList.push(item);
		return Promise.resolve(item);
	}
	async getById(id: string): Promise<Item> {
		const item = this.itemList.find((item) => item.id === id);
		if (!item) {
			throw new Error(`Item with id ${id} not found`);
		}
		return Promise.resolve(item);
	}

	getAll(): Promise<Item[]> {
		return Promise.resolve(this.itemList);
	}

	clear(): void {
		this.itemList = [];
		InMemoryItemRepository.id = uuidv4();
	}
}
