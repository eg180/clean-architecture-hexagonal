# Implementing Hexagonal Architecture in Node.js with TypeScript

![Hexagonal Architecture](https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Hexagonal_Architecture.svg/313px-Hexagonal_Architecture.svg.png)

The purpose of this project was to practice working with clean code principles. This project that implements **Hexagonal Architecture** using **Typescript** and **NodeJS**. The project utilizes **Express**, **Fastify**, and **TypeORM** as frameworks and tools to manage HTTP requests and database interactions on the edge layer.

## Purpose of the Architecture

The Hexagonal Architecture, also known as **Ports and Adapters** architecture, aims to create a flexible and loosely coupled design. It achieves this by separating the core business logic (application and domain) from the external systems (databases, web frameworks, etc.). The design promotes testability, maintainability, and scalability of the application.

In this project:

- The **Core** contains business logic that remains decoupled from the external layers.
- The **Infrastructure** layer deals with the specifics of external integrations (e.g., persistence mechanisms, clients).
- The **Application** layer is responsible for implementing use cases and orchestrating the flow of data.

### Core Concepts of Hexagonal Architecture

1. **Entities (Domain Layer)**:
   Entities represent the core business objects of the system, such as `Item`, `Order`, and `Payment`. They encapsulate the business rules and logic but are free from any technical dependencies (such as web frameworks or databases).

   Example: `Item.ts`, `Order.ts`, and `Payment.ts` are entities that contain attributes and methods relevant to the system's business logic.

2. **Ports**:
   Ports define interfaces that decouple the core logic from external systems or services. They act as entry (input ports) or exit (output ports) points to/from the application. These are implemented in the `application/ports/` directory for external services (e.g., `PaymentService`, `CacheService`) and in the `core/ports/` directory for persistence (`Repository.ts`) or external clients.

3. **Adapters (Infrastructure Layer)**:
   Adapters implement the details of external interactions based on the ports defined in the application or core layer. For example, adapters for data persistence (repositories using **TypeORM** or in-memory storage) or clients for third-party services like payment gateways.

   Example:

   - `TypeOrmItemRepository.ts` and `InMemoryItemRepository.ts` are repository adapters for interacting with storage.
   - `InMemoryPaymentClient.ts` is an example of a payment client adapter.

4. **Application Services (Application Layer)**:
   These services define the main use cases of the application. They act as orchestrators, interacting with the domain entities and ports to fulfill business requirements. The application services reside in the `services/` directory.

   Example:

   - `ItemApplicationService.ts` handles operations related to `Item` such as creating, updating, or fetching items.
   - `OrderApplicationService.ts` handles order-specific business logic.

5. **Controllers**:
   Controllers are part of the edge layer and handle HTTP requests from external clients. They convert the incoming data to the format expected by the application and delegate business operations to the application services.

   Example:

   - `ItemController.ts` handles item-related HTTP routes and maps them to the corresponding application service.
   - `OrderController.ts` does the same for orders.

   ## Default In-Memory Options

By default, the following in-memory implementations are used:

- **InMemoryItemRepository.ts** for item persistence.
- **InMemoryOrderRepository.ts** for order persistence.
- **InMemoryPaymentClient.ts** for payment processing.

These can be replaced by their **TypeORM** counterparts if you want to integrate a real database.

## Getting Started

### Prerequisites

Make sure you have **Docker** and **Docker-Compose** installed for running the infrastructure services (e.g., databases).

### Installation

Install all dependencies by running:

```bash
npm install
```

## Running the Application

You can run the application using either Express or Fastify.

### Using Express:

```bash
npm run start:express
```

### Using Fastify:

```bash
npm run start:fastify
```

## Running with Docker

To start the necessary infrastructure using Docker, you can run:

```bash
docker-compose up -d
```

## Testing

The project includes unit tests for core services. You can run the tests with:

```bash
npm run test
```

## Contributors

<img src="https://github.com/eg180.png?s=35" alt="Your Name" style="border-radius: 50%; width: 100px; height: 100px;" /> **Erick Gonzalez | eg180** - Restructuring for clean code principles, Include implentation for Orders service, expand test coverage

## Acknowledgments

This project is a fork of [Hexagonal Architecture Example](https://github.com/guilhermegarcia86/hexagonal-example), created by [guilhermegarcia86](https://github.com/guilhermegarcia86/hexagonal-example).

Significant changes have been made to better align with clean code principles, including project restructuring, implementation for Orders service, and expanding test coverage.
