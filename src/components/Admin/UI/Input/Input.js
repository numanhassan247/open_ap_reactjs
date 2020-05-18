import React, { Fragment } from 'react';
import './Input.scss'


const Input = (props) => {


    let inputElement = null;
    let prependIcon = null;
    const inputClasses = ['form-control'];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid')
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input className={inputClasses.join(' ')} value={props.value} {...props.elementConfig}
                onChange={props.changed} />
            if (props.icon) {
                prependIcon = <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className={"cil " + props.icon}></i>
                    </span>
                </div>
            }
            break;
        case 'textarea':
            inputElement = <textarea className={inputClasses.join(' ')} value={props.value} {...props.elementConfig}
                onChange={props.changed} />
            break;
        case 'select':
            inputElement = (<select className={inputClasses.join(' ')} value={props.value}
                onChange={props.changed} >
                {props.elementConfig.options.map(opt => (
                    <option key={opt.value} value={opt.value}> {opt.displayValue}</option>
                ))}
            </select>)
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} value={props.value} {...props.elementConfig}
                onChange={props.changed} />
            break;
    }

    return (

        <Fragment>
            {prependIcon}
            {inputElement}
        </Fragment>
    )
}

export default Input
