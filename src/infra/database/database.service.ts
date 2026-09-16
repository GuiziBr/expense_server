import { Injectable, OnModuleInit } from "@nestjs/common"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../../generated/prisma/client.js"

/**
 * Shared database provider that extends the Prisma Client, exposing its query
 * API to the rest of the application while hooking into the Nest module
 * lifecycle to manage the underlying database connection.
 */
@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
	constructor() {
		super({
			adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
		})
	}

	/**
	 * Nest lifecycle hook invoked once this module has been initialized.
	 * Side effect: opens the connection to the database via Prisma's
	 * `$connect`, which must complete before any queries are issued.
	 *
	 * @returns A promise that resolves once the database connection is established.
	 */
	async onModuleInit() {
		await this.$connect()
	}

	/**
	 * Nest lifecycle hook invoked when the module is being destroyed
	 * (e.g. on application shutdown). Side effect: closes the database
	 * connection via Prisma's `$disconnect` to release resources cleanly.
	 *
	 * @returns A promise that resolves once the database connection is closed.
	 */
	async onModuleDestroy() {
		await this.$disconnect()
	}
}
