import axios, { AxiosResponse } from "axios";
import { ApiError, RegisterRequest, AuthenticateResponse, LoginRequest, ProductsResponse, WorkerResponse, CreateProductRequest, CreateProductResponse, ProductResponse } from "./apiTypes";
import { CREATE_PRODUCT_PATH, CREATE_WORKER_PATH, DELETE_PRODUCT_PATH, DELETE_WORKER_PATH, GET_ALL_PRODUCTS_PATH, GET_ALL_WORKERS_PATH, GET_PRODUCT_PATH, GET_WORKER_PATH, LOGIN_USER_PATH, REGISTER_USER_PATH, UPDATE_PRODUCT_PATH, UPDATE_WORKER_PATH } from "./apiPaths";
import { Product, User, Worker } from "../../types";
import { Params } from "react-router-dom";

export async function registerCall(params:RegisterRequest): Promise<AuthenticateResponse | ApiError> {
    try{
        const response = await axios.post<AuthenticateResponse>(
            REGISTER_USER_PATH,
            params,
            {
                headers:{
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                }
            }
            )
            
            return {
                data: response.data.data, 
                status: response.status
            }
            
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message)
            return {
                message: error.message,
                status: error.response?.status ?? 500
            }
        }else{
            throw error
        }
    }

}

export async function loginCall(params:LoginRequest): Promise<AxiosResponse | ApiError> {
    try{
        const response = await axios.post<AuthenticateResponse>(
            LOGIN_USER_PATH,
            params,
            {
                headers:{
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                }
            }
            )
            return response
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message)
            return {
                message: error.message,
                status: error.response?.status ?? 500
            }
        }else{
            throw error
        }
    }
}

export async function createProductCall(params: FormData): Promise<AxiosResponse | ApiError>{
    try{
        const response = await axios.post<CreateProductResponse>(
            CREATE_PRODUCT_PATH,
            params,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    // Accept: "application/json"
                }
            }
        )
        return response
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message)
            return {
                message: error.message,
                status: error.response?.status ?? 500
            }
        }else{
            throw error
        }
    }
}

export async function deleteProductCall(productId: number): Promise<AxiosResponse | ApiError>{
    try{
        const response = await axios.delete<AxiosResponse>(
            DELETE_PRODUCT_PATH + `/${productId}`
            
        )
        return response
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message)
            return {
                message: error.message,
                status: error.response?.status ?? 500
            }
        }else{
            throw error
        }
    }
}


export async function updateProductCall(params: FormData, productId: string): Promise<AxiosResponse | ApiError> {
    console.log(params.get("ingredients"))
    try{
        const response = await axios.patch<ProductResponse>(
            UPDATE_PRODUCT_PATH.replace("{productId}", productId?.toString()),
            params,
            {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    // Accept: "application/json"
                }
            }
            )
            return response
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message)
            return {
                message: error.message,
                status: error.response?.status ?? 500
            }
        }else{
            throw error
        }
    }
}

export async function createWorkerCall(params: FormData): Promise<AxiosResponse | ApiError>{
    try{
        const response = await axios.post<CreateProductResponse>(
            CREATE_WORKER_PATH,
            params,
            {
                headers: {
                    "Content-Type": "application/json",
                    // Accept: "application/json"
                }
            }
        )
        return response
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message)
            return {
                message: error.message,
                status: error.response?.status ?? 500
            }
        }else{
            throw error
        }
    }
}

export async function deleteWorkerCall(id: number): Promise<AxiosResponse | ApiError>{
    try{
        const response = await axios.delete<AxiosResponse>(
            DELETE_WORKER_PATH + `/${id}`
            
        )
        return response
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message)
            return {
                message: error.message,
                status: error.response?.status ?? 500
            }
        }else{
            throw error
        }
    }
}


export async function getAllProductsCall(): Promise<AxiosResponse | ApiError> {
    try{
        const response = await axios.get<ProductsResponse>(
            GET_ALL_PRODUCTS_PATH,
            {
                headers:{
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                }
            }
            )
            return response
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message)
            return {
                message: error.message,
                status: error.response?.status ?? 500
            }
        }else{
            throw error
        }
    }
}

export async function getProductsCall(productId: string): Promise<AxiosResponse | ApiError> {
    try{
        const response = await axios.get<ProductResponse>(
            GET_PRODUCT_PATH.replace("{productId}", productId),
            {
                headers:{
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                }
            }
            )
            return response
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message)
            return {
                message: error.message,
                status: error.response?.status ?? 500
            }
        }else{
            throw error
        }
    }
}

export async function getWorkerCall(workerId: string | undefined): Promise<AxiosResponse | ApiError> {
    try{
        const response = await axios.get<Worker>(
            GET_WORKER_PATH + `/${workerId?.toString()}`,
            {
                headers:{
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                }
            }
            )
            return response
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message)
            return {
                message: error.message,
                status: error.response?.status ?? 500
            }
        }else{
            throw error
        }
    }
}

export async function updateWorkerCall(params: FormData, workerId: string): Promise<AxiosResponse | ApiError> {
    try{
        const response = await axios.patch<Worker>(
            UPDATE_WORKER_PATH.replace("{workerId}", workerId?.toString()),
            params,
            {
                headers:{
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                }
            }
            )
            return response
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message)
            return {
                message: error.message,
                status: error.response?.status ?? 500
            }
        }else{
            throw error
        }
    }
}


export async function getAllWorkersCall(): Promise<AxiosResponse | ApiError>{
    try{
        const response = await axios.get<WorkerResponse>(
            GET_ALL_WORKERS_PATH,
            {
                headers:{
                    'Content-Type': 'application/json',
                    Accept: "application/json"
                }
            }
        )
        return response
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ", error.message)
            return {
                message: error.message,
                status: error.response?.status ?? 500
            }
        }else{
            throw error
        }
    }
}