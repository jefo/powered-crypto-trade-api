import 'dotenv/config';
import { Elysia } from "elysia";
import { ClientProvider } from "./client-provider";

const app = new Elysia();
const clients = new ClientProvider();

app.group('/exchange', app => app
  .post(':exchange/createOrder', async ({ headers, params }) => {
    const token = headers.authorization!;
    if (!token) throw new Error('Unauthorized');
    const reqParams = params as any;
    const exchange = reqParams.exchange;
    const client = await clients.get(token, exchange);
  })
);

app.get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
