import "reflect-metadata";
import express from "express";
import { Request, Response } from "express";
import OrderController from "./controller/OrderController";
import { errorHandler } from "./error/errorHandler";
// import { AppDataSource } from "../../infrastructure/adapters/repository/typeorm/data-source";
import itemRoutes from "../express/routes/itemRoutes";
import orderRoutes from "../express/routes/orderRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// AppDataSource.initialize().catch((error) => console.log('ERROR TYPEORM: ', error))

app.get("/health", (req: Request, res: Response) => {
	res.send("Application using Express!!!");
});

app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/item", itemRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(
		`⚡️[server]: Express server is running at https://localhost:${PORT}`
	);
});
