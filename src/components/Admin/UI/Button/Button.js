import React from 'react'

const Button = (props) => {
    return (
        <button
            type={(props.type) ? props.type : "button"}
            disabled={props.disabled}
            className={'btn ' + props.btnClass}
            onClick={props.clicked}
        >
            {props.children}
        </button>
    )
}

export default Button
