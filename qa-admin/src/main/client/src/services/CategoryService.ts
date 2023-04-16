import {$api} from "../http/api";
import {ICategory} from "../types/ICategory";


export class CategoryService{
    static fetchAllCategories(){
        return $api.get<ICategory[]>("categories")
    }
}
