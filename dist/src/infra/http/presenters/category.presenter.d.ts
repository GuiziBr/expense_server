import { Category } from "../../../domains/category.domain.js";
import { CategoryDTO } from "../../../modules/category/category.dto.js";
export declare class CategoryPresenter {
    static toHttp(category: Category): CategoryDTO;
}
