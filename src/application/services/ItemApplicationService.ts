import { Item } from "../../core/domain/aggregates/Item";
import { ItemDTO } from "../dto/ItemDTO";
import { ItemService } from "../../core/domain/services/ItemService";
import { Repository } from "../../core/ports/repository/Repository";

export class ItemApplicationService {
	constructor(
		private itemService: ItemService,
		private itemRepository: Repository<Item>
	) {}
	public async save(itemDto: ItemDTO): Promise<Item> {
		const item = Item.fromDTO(itemDto);
		return this.itemRepository.save(item);
	}
	public async getById(id: string): Promise<Item> {
		const item = await this.itemRepository.getById(id);
		return item;
	}
	public async getAll(): Promise<Item[]> {
		const items = await this.itemRepository.getAll();
		return items;
	}
}
