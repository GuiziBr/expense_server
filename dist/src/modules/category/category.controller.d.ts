import { CategoryByIdDTO, CategoryDTO, CreateCategoryDTO, ListCategoryDTO } from './category.dto';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    listCategories(query?: ListCategoryDTO): Promise<CategoryDTO[]>;
    getCategoryById(params: CategoryByIdDTO): Promise<CategoryByIdDTO>;
    createCategory(body: CreateCategoryDTO): Promise<CategoryDTO>;
    updateCategory(params: CategoryByIdDTO, body: CreateCategoryDTO): Promise<CategoryDTO>;
    deleteCategory(params: CategoryByIdDTO): Promise<void>;
}
