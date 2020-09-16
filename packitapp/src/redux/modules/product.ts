
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

export const loadProduct = () => {
    return typedAction('product/LOAD')
}

type ProductAction = ReturnType<typeof hydrateProducts | typeof loadProduct>;

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
        default:{
            return state
        }
    }
}