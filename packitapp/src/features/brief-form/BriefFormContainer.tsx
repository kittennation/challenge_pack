import React from 'react'
import { RootState } from '../../redux'
import { hydrateProducts } from '../../redux/modules/product'
import { addBrief, addBriefSuccess } from '../../redux/modules/brief'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { BriefForm } from './BriefForm'

const mapStateToProps = (state: RootState) => ({
    products: state.product.products,
    briefs: state.brief.briefs
})

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        hydrateProducts,
        addBrief,
        addBriefSuccess
    }, dispatch)
}

export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export const BriefFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(BriefForm)
