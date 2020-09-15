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

export const addBrief = (brief: Brief)=> {
    return typedAction('brief/ADD', brief)
}

export const removeBrief = (id: number) => {
    return typedAction('brief/REMOVE', id)
}

export const editBrief = (brief: Brief) => {
    return typedAction('brief/EDIT', brief)
}

export const setFilter = (filter: number) => {
    return typedAction('filter/SET', filter)
}

type BriefAction = ReturnType<
    | typeof hydrateBrief
    | typeof addBrief
    | typeof removeBrief
    | typeof editBrief
    | typeof setFilter
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
        case 'brief/ADD':{
            let _briefs = state.briefs
            _briefs.push(action.payload)
            return {
                ...state,
                briefs: _briefs
            }
        }
        case 'brief/REMOVE':{
            let _briefs = state.briefs.filter(b => (b.id != action.payload))
            return {
                ...state,
                briefs: _briefs
            }
        }
        case 'brief/EDIT': {
            let _briefs = state.briefs
            let index = _briefs.findIndex(b => (b.id == action.payload.id))
            if (index != -1){
                _briefs[index] = action.payload
            }
            return {
                ...state,
                briefs: _briefs
            }
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