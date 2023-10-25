export class SignalDto {
    exchange: string = '';
    clientId: string = '';
    pair: string = '';
    direction: 'buy' | 'sell' = 'buy';
    leverage: string = '';
    entry: number[] = [];
    targets: number[] = [];
    stopLoss: number = 0;
}