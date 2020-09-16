import { typedAction } from './utils'
import { Product } from './product'

export type Brief = {
    id: number,
    title: string,
    comment: string,
    productId: number,
    product ?: Product
}

export type BriefState = {
    briefs: Brief[],
    filter: number
}

const initialState: BriefState = {
    briefs: [],
    filter: -1
}

export const hydrateBrief = (briefs: Brief[]) => {
    return typedAction('brief/HYDRATE', briefs)
}

export const setFilter = (filter: number) => {
    return typedAction('filter/SET', filter)
}

export const loadBrief = () => {
    return typedAction('brief/LOAD')
}

type BriefAction = ReturnType<
    | typeof hydrateBrief
    | typeof setFilter
    | typeof loadBrief
>

export function briefReducer(
    state=initialState,
    action: BriefAction
):BriefState {
    switch(action.type){
        case 'brief/HYDRATE':{
            return {
                ...state,
                briefs: action.payload}
        }
        case 'filter/SET':{
            return {
                ...state,
                filter: action.payload
            }
        }
        default:
            return {...state}
    }
}