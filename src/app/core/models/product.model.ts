import { brandModel } from "./brand.model";

export interface productModel{
    _id?: string,
    brand: brandModel,
    model: string,
    description: string
    color: string,
    size: number,
    price: number,
    material: string,
    style: string,
    year: number,
    images: string[],
    stock: number
}

export interface productModelBrand{
    brand: brandModel[]
}