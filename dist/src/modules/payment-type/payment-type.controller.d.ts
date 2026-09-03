import { CreatePaymentTypeDTO, ListPaymentTypesDTO, PaymentTypeByIdDTO, PaymentTypeDTO } from "./payment-type.dto.js";
import { PaymentTypeService } from "./payment-type.service.js";
export declare class PaymentTypeController {
    private readonly paymentTypeService;
    constructor(paymentTypeService: PaymentTypeService);
    listPaymentTypes(query?: ListPaymentTypesDTO): Promise<PaymentTypeDTO[]>;
    getPaymentTypeById(params: PaymentTypeByIdDTO): Promise<PaymentTypeDTO>;
    createPaymentType(body: CreatePaymentTypeDTO): Promise<PaymentTypeDTO>;
    updatePaymentType(params: PaymentTypeByIdDTO, body: CreatePaymentTypeDTO): Promise<PaymentTypeDTO>;
    deletePaymentType(params: PaymentTypeByIdDTO): Promise<void>;
}
