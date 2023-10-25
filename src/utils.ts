import { CreateOrderDto } from "./dto/create-order.dto";
import { SignalDto } from "./dto/signal.dto";

export function calculatePositionSize(deposit: number, percent: number): number {
    if (deposit <= 0 || percent <= 0 || percent > 100) {
        throw new Error("Неверные параметры: депозит и процент должны быть положительными числами, и процент не может быть больше 100.");
    }
    // Рассчитываем размер позиции в зависимости от процента
    const positionSize = (deposit * percent) / 100;
    return positionSize;
}

export function createGridOrders(deposit: number, signal: SignalDto): CreateOrderDto[] {
    const gridOrders: CreateOrderDto[] = [];
    const positionSize = calculatePositionSize(deposit, 10);
    for (const price of signal.entry) {
        const order: CreateOrderDto = {
            symbol: signal.pair,
            side: signal.direction,
            type: 'limit',
            price: price,
            quantity: positionSize / signal.entry.length,
        };
        gridOrders.push(order);
    }
    return gridOrders;
}
