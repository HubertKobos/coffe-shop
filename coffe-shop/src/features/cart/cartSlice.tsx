import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartProduct, Product } from "../../types";


interface CartState{
    products: CartProduct[]
    productsSum: number
    showNewAddedProductToast: boolean
    showDeletedProductToast: boolean
    showOrderPlacedModal: boolean,
    time:number
}


const getInitialState = () =>{
    const localStorageData = localStorage.getItem("data")
    const parsedProducts = localStorageData ? JSON.parse(localStorageData).products : []
    const parsedSum = localStorageData ? JSON.parse(localStorageData).productsSum : 0

    const initialState: CartState ={
        products: parsedProducts,
        productsSum: parsedSum,
        showNewAddedProductToast: false,
        showDeletedProductToast: false,
        showOrderPlacedModal: false,
        time: 0
    }
    return initialState;
}

export const cartSlice = createSlice({
    name: "cart",
    initialState:getInitialState(),
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) =>{
            state.showNewAddedProductToast = true;
  
            const existingProduct = state.products.find((product) => product.id === action.payload.id);
            
            if (existingProduct) {
              existingProduct.quantity += 1;
              state.productsSum += existingProduct.price;
            } else {
              state.products.push({ ...action.payload, quantity: 1 });
              state.productsSum += action.payload.price;
            }
            localStorage.setItem("data", JSON.stringify({
                "products": state.products,
                "productsSum": state.productsSum
            }))
        },
        hideNewAddedProductToast: (state) =>{
            state.showNewAddedProductToast = false
        }, 
        deleteProduct: (state, action: PayloadAction<number>) =>{
            state.showDeletedProductToast = true
            
            const productIdToDelete = action.payload
            state.products = state.products.filter((product) =>{
                if(product.id === productIdToDelete){
                    if(product.quantity > 1){
                        product.quantity -= 1
                        state.productsSum -= product.price
                        return true
                    }else{
                        state.productsSum -= product.price
                        return false
                    }
                }
                return true
        })
            localStorage.setItem("data", JSON.stringify({
                "products": state.products,
                "productsSum": state.productsSum
            }))
            
        },
        hideDeletedProductToast: (state) =>{
            state.showDeletedProductToast = false;
        },
        placeOrder: (state) =>{
            state.products = []
            state.productsSum = 0
            state.showOrderPlacedModal = true
        },
        hideShowOrderPlacedModal: (state) =>{
            state.showOrderPlacedModal = false
        },
        timeUp:(state)=>{
            state.time += 1;
        }
    }
})

export const {addProduct, hideNewAddedProductToast, deleteProduct, hideDeletedProductToast, placeOrder, hideShowOrderPlacedModal, timeUp} = cartSlice.actions

export const selectProducts = (state: CartState) => state.products

export default cartSlice.reducer