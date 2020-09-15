import React from 'react'
import { RootState } from '../../redux'
import { hydrateBrief, setFilter } from '../../redux/modules/brief'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import BriefList from './BriefList'
import { makeGetVisibleBriefs } from './selector'

const getVisibleBriefs = makeGetVisibleBriefs()

const mapStateToProps = (state: RootState, props:any) => ({
    products: state.product.products,
    briefs: getVisibleBriefs(state, props),
    filter: state.brief.filter
})

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        hydrateBrief,
        setFilter
    }, dispatch)
}

export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export const BriefListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(BriefList)