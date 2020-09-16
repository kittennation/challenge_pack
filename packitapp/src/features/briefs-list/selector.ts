import { createSelector } from 'reselect';
import { RootState } from '../../redux'


const getBriefs = (state:RootState, props:any) => 
    state.brief.briefs

const getFilter = (state:RootState, props:any) =>
    state.brief.filter

export const makeGetVisibleBriefs = () => {
    return createSelector(
        [ getFilter, getBriefs ], ( filter, briefs ) => {
            return briefs.filter(brief => (brief.productId === filter || filter === -1))
        }
    )
}
