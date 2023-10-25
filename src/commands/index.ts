import { Order } from "ccxt";
import container from "../di";
import { Command, CreateOrderCommandSymbol } from "./types";
import { CreateOrderCommand } from "./create-order.command";
import { CreateOrderDto } from "../dto/create-order.dto";

container.bind<Command<CreateOrderDto, Order>>(CreateOrderCommandSymbol).to(CreateOrderCommand);
