import { Product, User } from "../../types"

export type ApiError = {
    message: string, 
    status: number
}

export type RegisterRequest = {
    email: string,
    firstName: string,
    surname: string,
    password: string
}


export type AuthenticateResponse = {
    data: User,
    status: number
}

export type LoginRequest = {
    email: string,
    password: string
}

export type CreateProductRequest = {
    productName: string,
    price: number,
    ingredients: Array<string>,
    additionalInformation: string,
    image: File | null
}

export type CreateProductResponse = {
    data: Product,
    status: number
}

export type ProductResponse = {
    data: Product,
    status: number
}

export type ProductsResponse = { 
    data: Product[]
    status: number
}

export type WorkerResponse = {
    data: Worker[]
    status: number
} 

export type CreateWorkerResponse = {
    data: Worker,
    status: number
}