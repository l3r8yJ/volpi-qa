import {$api} from "../http/api";
import {ICategory} from "../types/ICategory";
import {AxiosResponse} from "axios";


export class CategoryService {
    static fetchAllCategories(): Promise<AxiosResponse<ICategory[]>> {
        return $api.get<ICategory[]>("categories")
    }

    static fetchCategoryByName(name: string): Promise<AxiosResponse<ICategory>> {
        return $api.get<ICategory>("category/" + name)
    }

    static createCategory(name: string): Promise<AxiosResponse<ICategory>> {
        return $api.post<ICategory>("categories", name)
    }

    static updateCategory(updatedCategory: ICategory): Promise<AxiosResponse<ICategory>> {
        return $api.patch<ICategory>("categories" + updatedCategory.id, updatedCategory)
    }

    static deleteCategory(id: number):Promise<AxiosResponse<ICategory>>{
        return $api.delete<ICategory>("categories" + id)
    }
}
