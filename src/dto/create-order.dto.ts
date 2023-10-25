export class CreateOrderDto {
    symbol: string = '';
    side: 'sell' | 'buy' = 'buy';
    type: 'limit' | 'market' = 'limit';
    price: number = 0;
    quantity: number = 0;
}
