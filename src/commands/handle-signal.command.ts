import { Exchange, Order } from "ccxt";
import pretry from "promise.retry";
import { CreateOrderDto } from "../dto/create-order.dto";
import { ClientProvider } from "../client-provider";
import { Command } from "./types";
import { SignalDto } from "../dto/signal.dto";
import { CreateOrderCommand } from "./create-order.command";
import { createGridOrders } from "../utils";

export class HandleSignalCommand implements Command<SignalDto, Order> {
    constructor(
        private readonly clientResolver: ClientProvider,
    ) {
    }

    async execute(payload: SignalDto) {
        const client = await this.clientResolver.get(payload.clientId, payload.exchange);
        const createOrderCmd = new CreateOrderCommand(client!);

        const createOrders = createGridOrders(1000, payload);
        // Determine the order side based on the direction

        // Create the ladder orders
        for (let i = 0; i < createOrders.length; i++) {
            const order = await createOrderCmd.execute(createOrders[i]);
            // TODO: Subscribe to status updates
        }

        // Create the stop loss order
        const stopLossOrder = await createOrderCmd.execute({
            symbol: payload.symbol,
            side: side === "buy" ? "sell" : "buy",
            type: "stop_loss",
            price: payload.stopLoss,
            quantity: payload.quantity,
        });

        // Create the take profit order
        const takeProfitOrder = await createOrderCmd.execute({
            symbol: payload.symbol,
            side: side === "buy" ? "sell" : "buy",
            type: "take_profit",
            price: payload.takeProfit,
            quantity: payload.quantity,
        });

        return takeProfitOrder;
    }
}