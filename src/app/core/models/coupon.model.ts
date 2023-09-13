export interface couponModel{
    _id?: string
    code: string,
    amount: number,
    expiry: Date | string,
    minPurchase: number
}