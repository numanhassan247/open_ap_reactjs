import React from 'react'
import Button from '../Button/Button'

const Modal = (props) => {

    return (
        <div>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" id='delModal'>
                <div className={`modal-dialog modal-dialog-centered modal-${props.modalStyle}`} role="document">
                    <div className="modal-content">
                        <div className="modal-header danger">
                            <h5 className="modal-title" >{props.title}</h5>
                            <Button clicked={props.onCancel} className="Close">x</Button>

                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                        <div className="modal-footer">
                            <Button btnClass="btn-secondary" clicked={props.onCancel}>{props.cancelText}</Button>
                            <Button btnClass="btn-danger" clicked={props.onOk}>{props.okText}</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </div>
    )
}

export default Modal
