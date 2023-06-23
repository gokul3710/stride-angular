export interface addressModel{
    _id: string,
    name: string,
    phone: string,
    house: string,
    street: string
    city: string,
    state: string,
    country?: "India",
    pincode: string,
    landmark?: string,
    default?: boolean
}

export interface responseAddressModel {
    addresses: addressModel[]
}