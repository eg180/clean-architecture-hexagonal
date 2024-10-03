import { Item } from "../../../../core/domain/entities/Item";
import { Repository } from "../../../../core/ports/repository/Repository";

export class InMemoryItemRepository implements Repository<Item> {
	private itemList: Item[] = [];
	private static id: number = 0;

	save(item: Item): Promise<Item> {
		item.id = InMemoryItemRepository.id += 1;
		this.itemList.push(item);
		return Promise.resolve(item);
	}

	getById(id: number): Promise<Item> {
		const item = this.itemList.find((item) => item.id === id) ?? ({} as Item);
		return Promise.resolve(item);
	}

	getAll(): Promise<Item[]> {
		return Promise.resolve(this.itemList);
	}

	clear(): void {
		this.itemList = [];
		InMemoryItemRepository.id = 0;
	}
}
