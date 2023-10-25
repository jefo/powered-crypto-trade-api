import { type RedisClientType, createClient } from '@redis/client';
import ccxt, { Exchange } from 'ccxt';
import { ClientsRepo } from './repositories/clients.repo';

export class ClientProvider {
    // public cache: RedisClientType;
    private clients: Map<string, Exchange> = new Map();
    private clRepo = new ClientsRepo();

    async get(clientId: string, exchange: string) {
        const exch = ccxt.exchanges.find(exch => exch === exchange) as keyof typeof ccxt;
        const ExchangeClass = ccxt[exch];
        let instance = this.clients.get(clientId);
        if (instance) {
            return instance;
        } else {
            const client = this.clRepo.findById();
            instance = new ExchangeClass({
                apiKey: client.key,
                secret: client.secret,
            });
            this.clients.set(clientId, instance!);
            return instance;
        }
    }
}