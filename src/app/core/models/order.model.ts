import { addressModel } from "./address.model"
import { brandModel } from "./brand.model"

export interface orderModel {
    _id?: string,
    userId?: string,
    deliveryAddress : addressModel,
    items: orderItemModel[],
    tracking: Record<string, any>;
    payment: paymentModel | string,
    status: statusModel,
    total: number,
    quantity: number,
    discount: number
}

export interface trackingModel {
    placed: Date | false | string,
    packed: Date | false | string,
    shipped: Date | false | string,
    arrived: Date  | false | string,
    delivered: Date | false | string,
    returned: Date | false | string,
    cancelled: Date | false | string,
}

export interface paymentModel {
    _id? :string,
    userId?: string | string
    method: 'paypal' | 'razorpay' | 'COD',
    status: "paid" | 'pending' | 'failed' | 'refunded',
    transactionId?: string,
    amount: number,
    currency: 'INR' | 'USD'
    date: Date | string | false
}

export interface orderItemModel{
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
    quantity: number
    total: number
}

export type statusModel = 'pending' | 'placed' | 'packed' |'shipped' | 'arrived' | 'delivered' | 'returned' | 'cancelled'