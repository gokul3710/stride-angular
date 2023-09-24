import { productModel } from './product.model';

export interface cartProductModel {
    _id: string,
    item: string,
    quantity: number,
    product: productModel
    total: number
}
