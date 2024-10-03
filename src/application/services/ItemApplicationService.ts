import { Item } from "../../core/domain/entities/Item";
import { ItemService } from "../../core/domain/services/ItemService";
import { Repository } from "../../core/ports/repository/Repository";

export class ItemApplicationService {
	constructor(
		private itemService: ItemService,
		private itemRepository: Repository<Item>
	) {}
	public async createItem(item: Item): Promise<Item> {
		if (!this.itemService.validateItem(item)) {
			throw new Error("Invalid item");
		}
		return this.itemRepository.save(item);
	}
	public async getById(id: number): Promise<Item> {
		const item = await this.itemRepository.getById(id);
		return item;
	}
	public async getAll(): Promise<Item[]> {
		const items = await this.itemRepository.getAll();
		return items;
	}
}
