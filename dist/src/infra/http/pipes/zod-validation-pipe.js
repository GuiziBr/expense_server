import { BadRequestException } from "@nestjs/common";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import AppError from "../../../modules/utils/appError.js";
export class ZodValidationPipe {
    schema;
    constructor(schema) {
        this.schema = schema;
    }
    transform(value) {
        try {
            return this.schema.parse(value, {});
        }
        catch (error) {
            if (error instanceof ZodError) {
                const param = String(fromZodError(error)?.details[0]?.path[0]);
                const message = fromZodError(error)?.details[0]?.message;
                throw new AppError(`${param} ${message}`);
            }
            throw new BadRequestException("Validation Failed");
        }
    }
}
//# sourceMappingURL=zod-validation-pipe.js.map