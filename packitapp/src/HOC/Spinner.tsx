import React from 'react'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import "./Spinner.scss"

interface Props {
    color: string
}

export const Spinner = (props: Props) => {
    return <div className="spinner">
        <AutorenewIcon style={{ color: props.color }}/>
    </div>
}