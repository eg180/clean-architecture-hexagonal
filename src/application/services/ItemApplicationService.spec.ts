import { Item } from "../../core/domain/aggregates/Item";
import { ItemApplicationService } from "./ItemApplicationService";
import { ItemService } from "../../core/domain/services/ItemService";
import { InMemoryItemRepository } from "../../infrastructure/adapters/repository/inMemory/InMemoryItemRepository";
import { ItemDTO } from "../dto/ItemDTO";
import { Money } from "../../core/domain/valueObjects/Money";

describe.skip("ItemApplicationService", () => {
	let inMemoryRepository: InMemoryItemRepository;
	let itemService: ItemService;
	let sut: ItemApplicationService;

	beforeEach(() => {
		itemService = new ItemService();
		inMemoryRepository = new InMemoryItemRepository();
		sut = new ItemApplicationService(itemService, inMemoryRepository);
	});

	afterEach(() => {
		inMemoryRepository.clear();
	});
	describe("save", () => {
		it("should create an Item", async () => {
			const item: ItemDTO = {
				name: "Assistencia",
				price: Money.fromString("20.0"),
			};

			const actual = await sut.save(item);

			expect(actual.id).toEqual(1);
		});

		it("should throw an error for item with zero-length item name", async () => {
			const invalidItem: ItemDTO = {
				name: "",
				price: Money.fromString("20.0"),
			};
			await expect(sut.save(invalidItem)).rejects.toThrow(
				"Item name cannot be empty"
			);
		});

		it("should throw an error for item with a negative price", async () => {
			expect(() => {
				Money.fromString("-1.0");
			}).toThrow("Amount cannot be negative");
		});
	});
	describe("getById", () => {
		it("should get item by id", async () => {
			const items = [
				{
					name: "item one",
					price: Money.fromString("1.00"),
				},
				{
					name: "item two",
					price: Money.fromString("1.99"),
				},
			];

			const savedItems = await Promise.all(
				items.map((item) => sut.save(item as ItemDTO))
			);
			const soughtItem = await sut.getById(savedItems[1].id.toString());
			expect(soughtItem.id).toBe(savedItems[1].id.toString());
		});
	});

	describe("getAll", () => {
		it("should find all Items", async () => {
			const item1 = {
				name: "item one",
				price: Money.fromString("1.00"),
			};
			const item2 = {
				name: "item two",
				price: Money.fromString("1.99"),
			};
			const item3 = {
				name: "item three",
				price: Money.fromString("2.99"),
			};
			const item4 = {
				name: "item two",
				price: Money.fromString("3.99"),
			};

			const items = [item1, item2, item3, item4];

			await Promise.all(items.map((item) => sut.save(item as ItemDTO)));

			const allItems = await sut.getAll();

			expect(allItems.length).toEqual(4);
		});
	});
});

describe.skip("it correctly implements ItemService", () => {
	let sut: ItemService;
	beforeEach(() => {
		sut = new ItemService();
	});
	it("should correctly calculate a discount", () => {
		const item: ItemDTO = {
			name: "Toy",
			price: Money.fromString("4.99"),
		};
		const actual = sut.calculateDiscount(item);
		expect(actual).toBe(0.49);
	});
});
