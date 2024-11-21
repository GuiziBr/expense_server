"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidationPipe = void 0;
const appError_1 = require("../../../modules/utils/appError");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const zod_validation_error_1 = require("zod-validation-error");
class ZodValidationPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(value) {
        try {
            return this.schema.parse(value, {});
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const param = (0, zod_validation_error_1.fromZodError)(error)?.details[0]?.path[0];
                const message = (0, zod_validation_error_1.fromZodError)(error)?.details[0]?.message;
                throw new appError_1.default(`${param} ${message}`);
            }
            throw new common_1.BadRequestException('Validation Failed');
        }
    }
}
exports.ZodValidationPipe = ZodValidationPipe;
//# sourceMappingURL=zod-validation-pipe.js.map