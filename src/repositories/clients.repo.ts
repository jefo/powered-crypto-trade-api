
export class ClientsRepo {
    findById() {
        return {
            key: process.env.API_KEY,
            secret: process.env.API_SECRET,
        }
    }
}
