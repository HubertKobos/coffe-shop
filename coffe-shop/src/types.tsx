export type Product = {
    id: number,
    image: string,
    name: string,
    price: number,
    ingredients: Array<string>,
    additionalInformation?: string
}

export type CartProduct = Product & {
    quantity: number
}

export type Role = "MANAGER" | "WORKER" | "ADMIN" | undefined

export type Worker = {
    id: number,
    email?: string,
    firstName: string,
    surname: string,
    role?: Role,
    insuranceId: string,
    insuranceDate: string
    workContractDate: string,
    workContractId: string
}

// logged in user
export type User = {
    id: number | null,
    email: string | null
    firstName: string | null,
    surname: string | null,
    role: Role | null,
    token: string | null
}