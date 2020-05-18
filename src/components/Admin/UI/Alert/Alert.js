import React, { useState } from 'react'

const Alert = (props) => {

    const [isDisplayed, setIsDisplayed] = useState(true);

    const handleClickClose = () => {
        setIsDisplayed(!isDisplayed)
        if (props.handleOnRemoveAlert)
            props.handleOnRemoveAlert()
    }

    let typeClass = 'alert';
    let dismiss = (props.isRemovable) ? true : false;

    switch (props.type) {
        case 'error':
            typeClass += ' alert-danger';
            break;
        case 'success':
            typeClass += ' alert-success';
            break;
        case 'warning':
            typeClass += ' alert-warning';
            break;
        case 'info':
            typeClass += ' alert-info';
            break;
        default:
            typeClass += ' alert-primary';
            break;
    }
    return (
        (isDisplayed) &&
        <div className={typeClass + ((dismiss) ? ' alert-dismissible fade show' : '')} role="alert">
            {props.children}
            {dismiss && <button type="button" className="close" onClick={handleClickClose}><span >&times;</span></button>}
        </div>
    )
}

export default Alert
