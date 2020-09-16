import { RootState } from '../../redux'
import { hydrateProducts, loadProduct } from '../../redux/modules/product'
import { loadBrief } from '../../redux/modules/brief'
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
        loadBrief,
        loadProduct
    }, dispatch)
}

export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export const BriefFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(BriefForm)
