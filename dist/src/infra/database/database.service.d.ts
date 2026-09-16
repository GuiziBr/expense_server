import { OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma/client.js";
export declare class DatabaseService extends PrismaClient implements OnModuleInit {
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
