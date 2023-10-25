import { Exchange, Order } from "ccxt";
import pretry from "promise.retry";
import { CreateOrderDto } from "../dto/create-order.dto";
import { Command } from "./types";

export class CreateOrderCommand implements Command<CreateOrderDto, Order> {
    constructor(
        private readonly exchange: Exchange,
    ) {
    }

    async execute(order: CreateOrderDto) {
        const createOrder = pretry(async () => {
            return this.exchange.createOrder(order.symbol, order.type, order.side, order.quantity, order.price)
        }, {
            timeout: 1000,
            times: 30,
        });
        return createOrder();
    }
}