import { Category } from '@/domains/category.domain';
import { CategoryDTO } from '@/modules/category/category.dto';
export declare class CategoryPresenter {
    static toHttp(category: Category): CategoryDTO;
}
