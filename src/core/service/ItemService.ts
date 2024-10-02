import { Item } from "../domain/items/Item";
import { Repository } from "../ports/repository/Repository";

export class ItemService implements Repository<Item> {
	private readonly itemRepository: Repository<Item>;

	constructor(itemRepository: Repository<Item>) {
		this.itemRepository = itemRepository;
	}
	public async save(item: Item): Promise<Item> {
		const itemSaved = await this.itemRepository.save(item);

		return itemSaved;
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
