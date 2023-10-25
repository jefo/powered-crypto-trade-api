export interface Command<TPayload, TResult> {
    execute(payload: TPayload): Promise<TResult>;
}

export const CreateOrderCommandSymbol = Symbol('CreateOrderCommand');
