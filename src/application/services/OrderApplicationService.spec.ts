import { Repository } from "typeorm";
import { IOrder } from "../../core/domain/interfaces/IOrder";
import { OrderService } from "../../core/domain/services/OrderService";
import { InMemoryOrderRepository } from "../../infrastructure/adapters/repository/inMemory/InMemoryOrderRepository";
import { OrderApplicationService } from "./OrderApplicationService";
import { Money } from "../../core/domain/valueObjects/Money";
import { IPayment } from "../../core/domain/interfaces/IPayment";
import { IItem } from "../../core/domain/interfaces/IItem";
import { CreateOrderDTO } from "../dto/CreateOrderDTO";

describe("Order application service", () => {
	let orderApplicationService: OrderApplicationService;
	let orderRepository: InMemoryOrderRepository;

	beforeEach(() => {
		const orderService = new OrderService();
		orderRepository = new InMemoryOrderRepository();
		orderApplicationService = new OrderApplicationService(
			orderService,
			orderRepository
		);
	});

	afterEach(() => {
		orderRepository.clear();
	});

	describe("save", () => {
		it("should create an order", async () => {
			let orderDTO: CreateOrderDTO = {
				amount: Money.fromString("200.00"),
				items: [
					{
						id: "950e57da-05b8-4eb6-a5bf-9659587e06cd",
						name: "Product A",
						price: Money.fromString("175.00"),
					},
					{
						id: "2370a0c5-7b47-4dd4-b1cb-c66c2160922a",
						name: "Product B",
						price: Money.fromString("25.00"),
					},
				],
				payments: [
					{
						amount: Money.fromString("200.00"),
						paidAt: new Date("2023-12-31T23:59:59Z"),
					},
				],
			};

			const order = await orderApplicationService.save(orderDTO);
			expect(order.id).toBeDefined();

			// Verify the order was actually saved
			const savedOrder = await orderApplicationService.getById(order.id);
			expect(savedOrder).toBeDefined();
			expect(savedOrder.id).toBe(order.id);
		});
		it("should throw an error if the items property is not an array", async () => {
			const invalidOrderPayload = {
				amount: Money.fromString("200.00"),
				items: {
					id: 1,
					name: "Product A",
					price: Money.fromString("200.00"),
				},
				payments: [] as IPayment[],
			};

			await expect(
				orderApplicationService.save(invalidOrderPayload)
			).rejects.toThrow("Items must be an array");
		});
		it("should throw an error if the amount is not a Money instance or a string", async () => {
			let invalidOrderPayload: CreateOrderDTO = {
				// @ts-expect-error
				amount: 200.0,
				items: [
					{
						id: "012d2d57-73f8-465d-9782-d61a99b904d4",
						name: "Product A",
						price: Money.fromString("175.00"),
					},
					{
						id: "2370a0c5-7b47-4dd4-b1cb-c66c2160922a",
						name: "Product B",
						price: Money.fromString("25.00"),
					},
				],
				payments: [] as IPayment[],
			};

			await expect(
				// @ts-ignore
				orderApplicationService.save(invalidOrderPayload)
			).rejects.toThrowError("Amount must be a string or Money instance");
		});

		it("should throw an error if payments is not an array", async () => {
			const invalidOrderPayload: CreateOrderDTO = {
				amount: Money.fromString("450.00"),
				items: [
					{
						name: "Product J",
						price: Money.fromString("450.00"),
					},
				],
				payments: {
					// @ts-expect-error
					amount: Money.fromString("450.00"),
					paidAt: new Date("2023-12-31T23:59:59Z"),
				},
			};

			await expect(
				// @ts-ignore
				orderApplicationService.save(invalidOrderPayload)
			).rejects.toThrowError("Payments must be an array");
		});

		it("should throw an error if the order amount is not equal to the items total", async () => {
			let orderPayload: IOrder = {
				amount: Money.fromString("1125.00"),
				items: [
					{
						id: "012d2d57-73f8-465d-9782-d61a99b904d4",
						name: "Product N",
						price: Money.fromString("100.00"),
					},
					{
						id: "2370a0c5-7b47-4dd4-b1cb-c66c2160922a",
						name: "Product M",
						price: Money.fromString("25.00"),
					},
				],
				payments: [
					{
						amount: Money.fromString("1125.00"),
						id: 1,
						paidAt: new Date("2023-12-31T23:59:59Z"),
					},
				],
			};

			await expect(
				orderApplicationService.save(orderPayload)
			).rejects.toThrowError("Order total does not match items total");
		});

		it("should throw an error when saving an order with empty items array", async () => {
			const orderPayload = {
				amount: Money.fromString("0.00"),
				items: [] as IItem[],
				payments: [] as IPayment[],
			};

			await expect(
				orderApplicationService.save(orderPayload)
			).rejects.toThrowError("Invalid order");
		});

		it("should throw an error when saving an order with empty payments array", async () => {
			const orderPayload: CreateOrderDTO = {
				amount: Money.fromString("200.00"),
				items: [
					{
						id: "012d2d57-73f8-465d-9782-d61a99b904d4",
						name: "Product A",
						price: Money.fromString("200.00"),
					},
				],
				payments: [
					{
						paidAt: new Date("2023-12-31T23:59:59Z"),
					},
				] as IPayment[],
			};

			await expect(
				orderApplicationService.save(orderPayload)
			).rejects.toThrowError("Invalid order");
		});
	});

	describe("getById", () => {
		it("should get order by id", async () => {
			let orderPayload: CreateOrderDTO = {
				amount: Money.fromString("174.00"),
				items: [
					{
						id: "012d2d57-73f8-465d-9782-d61a99b904d4",
						name: "Product A",
						price: Money.fromString("169.00"),
					},
					{
						id: "2370a0c5-7b47-4dd4-b1cb-c66c2160922a",
						name: "Product B",
						price: Money.fromString("5.00"),
					},
				],
				payments: [
					{
						amount: Money.fromString("174.00"),
						paidAt: new Date("2023-12-31T23:59:59Z"),
					},
				],
			};
			const order = await orderApplicationService.save(orderPayload);
			const foundOrder = await orderApplicationService.getById(order.id);
			expect(order.id).toEqual(foundOrder.id);
		});

		it("should throw an error when order is not found", async () => {
			await expect(
				orderApplicationService.getById("asdfwefwefwefe-asdfee")
			).rejects.toThrowError("Order with id asdfwefwefwefe-asdfee not found");
		});
	});

	describe("getAll", () => {
		it("should find all the orders", async () => {
			const orders = [
				{
					amount: Money.fromString("200.00"),
					items: [
						{
							id: 1,
							name: "Product A",
							price: Money.fromString("120.00"),
						},
						{
							id: 2,
							name: "Product B",
							price: Money.fromString("80.00"),
						},
					],
					payments: [
						{
							id: 1,
							amount: Money.fromString("200.00"),
							paidAt: new Date("2023-12-31T23:59:59Z"),
						},
					],
				},
				{
					amount: Money.fromString("300.00"),
					items: [
						{
							id: 1,
							name: "Product Fizz",
							price: Money.fromString("220.00"),
						},
						{
							id: 2,
							name: "Product Buzz",
							price: Money.fromString("80.00"),
						},
					],
					payments: [
						{
							id: 2,
							amount: Money.fromString("300.00"),
							paidAt: new Date("2022-11-31T23:59:59Z"),
						},
					],
				},
			];
			orders.forEach(async (order) => {
				await orderApplicationService.save(order);
			});

			const result = await orderApplicationService.getAll();
			expect(result).toHaveLength(2);
		});

		it("should return empty array when no orders exist", async () => {
			const result = await orderApplicationService.getAll();
			expect(result).toHaveLength(0);
			expect(result).toEqual([]);
		});
	});
});
