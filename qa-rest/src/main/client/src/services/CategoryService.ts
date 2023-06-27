import {$api} from "../http/api";
import {AxiosResponse} from "axios";
import {ICategory} from "../types/ICategory";


export class CategoryService {
    static fetchAllCategories(): Promise<AxiosResponse<ICategory[]>> {
        return $api.get<ICategory[]>("categories")
    }

    static fetchCategoryById(id: number): Promise<AxiosResponse<ICategory>> {
        return $api.get<ICategory>(`categories/${id}`)
    }

    static fetchCategoryByName(categoryName: string): Promise<AxiosResponse<ICategory>> {
        return $api.get<ICategory>(`categories/by-name/${categoryName}`)
    }
}
