
import { typedAction } from './utils'

export type Product = {
    id: number,
    name: string
}

export type ProductState = {
    products: Product[]
}

const initialState: ProductState = { products: [] }

export const hydrateProducts = (products: Product[]) => {
    return typedAction('product/HYDRATE', products)
}

export const clearProducts = () => {
    return typedAction('product/CLEAR')
}

type ProductAction = ReturnType<typeof hydrateProducts | typeof clearProducts>;

export function productReducer(
    state= initialState,
    action: ProductAction
): ProductState{
    switch (action.type){
        case 'product/HYDRATE':{
            return {
                products: action.payload
            }
        }
        case 'product/CLEAR':{
            return {
                products: []
            }
        }
        default:{
            return state
        }
    }
}