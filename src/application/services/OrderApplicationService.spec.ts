import { Repository } from "typeorm";
import { Order } from "../../core/domain/entities/Order";
import { OrderService } from "../../core/domain/services/OrderService";
import { InMemoryOrderRepository } from "../../infrastructure/adapters/repository/inMemory/InMemoryOrderRepository";
import { OrderApplicationService } from "./OrderApplicationService";
import { ItemApplicationService } from "./ItemApplicationService";

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
			let orderPayload = {
				amount: "200.00",
				items: [
					{
						id: 1,
						name: "Product A",
						price: "175.00",
					},
					{
						id: 2,
						name: "Product B",
						price: "25.00",
					},
				],
				payments: [
					{
						id: 1,
						paidAt: new Date("2023-12-31T23:59:59Z"),
					},
				],
			};

			const order = await orderApplicationService.save(orderPayload);
			expect(order.id).toEqual(1);
		});
		it("should throw an error if the items property is not an array", async () => {
			const invalidOrderPayload = {
				amount: "200.00",
				items: {
					id: 1,
					name: "Product A",
					price: "200.00",
				},

				payments: [
					{
						id: 1,
						paidAt: new Date("2023-12-31T23:59:59Z"),
					},
				],
			};

			await expect(
				// @ts-ignore
				orderApplicationService.save(invalidOrderPayload)
			).rejects.toThrowError("Invalid order");
		});
		it("should throw an error if the amount is not a string", async () => {
			const invalidOrderPayload = {
				amount: 200.0,
				items: {
					id: 1,
					name: "Product A",
					price: "200.00",
				},

				payments: [
					{
						id: 1,
						paidAt: new Date("2023-12-31T23:59:59Z"),
					},
				],
			};

			await expect(
				// @ts-ignore
				orderApplicationService.save(invalidOrderPayload)
			).rejects.toThrowError("Invalid order");
		});

		it("should throw an error if payments is not an array", async () => {
			const invalidOrderPayload = {
				amount: "450.00",
				items: {
					id: 1,
					name: "Product J",
					price: "450.00",
				},

				payments: {
					id: 1,
					paidAt: new Date("2023-12-31T23:59:59Z"),
				},
			};

			await expect(
				// @ts-ignore
				orderApplicationService.save(invalidOrderPayload)
			).rejects.toThrowError("Invalid order");
		});

		it("should throw an error if the order amount is not equal to the items total", async () => {
			let orderPayload = {
				amount: "1125.00",
				items: [
					{
						id: 1,
						name: "Product N",
						price: "100.00",
					},
					{
						id: 2,
						name: "Product M",
						price: "25.00",
					},
				],
				payments: [
					{
						id: 1,
						paidAt: new Date("2023-12-31T23:59:59Z"),
					},
				],
			};

			await expect(
				orderApplicationService.save(orderPayload)
			).rejects.toThrowError("Invalid order");
		});
	});

	describe("getById", () => {
		it("should get order by id", async () => {
			let orderPayload = {
				amount: "200.00",
				items: [
					{
						id: 1,
						name: "Product A",
						price: "190.00",
					},
					{
						id: 2,
						name: "Product B",
						price: "10.00",
					},
				],
				payments: [
					{
						id: 1,
						paidAt: new Date("2023-12-31T23:59:59Z"),
					},
				],
			};
			await orderApplicationService.save(orderPayload);
			const result = await orderApplicationService.getById(1);
			expect(result.id).toEqual(1);
		});
	});

	describe("getAll", () => {
		it("should find all the orders", async () => {
			const orders = [
				{
					amount: "200.00",
					items: [
						{
							id: 1,
							name: "Product A",
							price: "120.00",
						},
						{
							id: 2,
							name: "Product B",
							price: "80.00",
						},
					],
					payments: [
						{
							id: 1,
							paidAt: new Date("2023-12-31T23:59:59Z"),
						},
					],
				},
				{
					amount: "300.00",
					items: [
						{
							id: 1,
							name: "Product Fizz",
							price: "220.00",
						},
						{
							id: 2,
							name: "Product Buzz",
							price: "80.00",
						},
					],
					payments: [
						{
							id: 2,
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
	});
});
