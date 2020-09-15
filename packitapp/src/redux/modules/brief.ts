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
    briefs: Brief[]
}

const initialState: BriefState = {
    briefs: []
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

type BriefAction = ReturnType<
    | typeof hydrateBrief
    | typeof addBrief
    | typeof removeBrief
    | typeof editBrief
>

export function briefReducer(
    state=initialState,
    action: BriefAction
):BriefState {
    switch(action.type){
        case 'brief/HYDRATE':{
            return {briefs: action.payload}
        }
        case 'brief/ADD':{
            let _briefs = state.briefs
            _briefs.push(action.payload)
            return {
                briefs: _briefs
            }
        }
        case 'brief/REMOVE':{
            let _briefs = state.briefs.filter(b => (b.id != action.payload))
            return {
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
                briefs: _briefs
            }
        }
        default:
            return {...state}
    }
}