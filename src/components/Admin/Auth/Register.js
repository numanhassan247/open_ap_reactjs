import React from 'react'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

const Register = (props) => {

    return (
        <div className='in-middle'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card mx-4">
                            <div className="card-body p-4">
                                {props.spinner}
                                {props.errorMessage}
                                <h1>Register</h1>
                                <p className="text-muted">Create your account</p>
                                <div className="input-group mb-3">
                                    <Input
                                        elementType={'input'}
                                        elementConfig={{ name: 'fname', type: 'text', placeholder: 'First Name' }}
                                        value={props.form.fname}
                                        icon='cil-user'
                                        changed={props.handleOnChangeInput}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <Input
                                        elementType={'input'}
                                        elementConfig={{ name: 'lname', type: 'text', placeholder: 'Last Name' }}
                                        value={props.form.lname}
                                        icon='cil-user'
                                        changed={props.handleOnChangeInput}
                                    />
                                </div>

                                <div className="input-group mb-3">
                                    <Input
                                        elementType={'input'}
                                        elementConfig={{ name: 'email', type: 'email', placeholder: 'Email' }}
                                        value={props.form.email}
                                        icon='cil-envelope-open'
                                        changed={props.handleOnChangeInput}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <Input
                                        elementType={'input'}
                                        elementConfig={{ name: 'password', type: 'password', placeholder: 'Password' }}
                                        value={props.form.password}
                                        icon='cil-lock-locked'
                                        changed={props.handleOnChangeInput}
                                    />
                                </div>
                                <div className="input-group mb-4">
                                    <Input
                                        elementType={'input'}
                                        elementConfig={{ name: 'rePassword', type: 'password', placeholder: 'Repeat Password' }}
                                        value={props.form.rePassword}
                                        icon='cil-lock-locked'
                                        changed={props.handleOnChangeInput}
                                    />
                                </div>
                                <button className="btn btn-block btn-success" type="button" onClick={props.handleDoAuth}>Create Account</button>
                                <p className="text-center my-1">OR</p>
                                <button className="btn btn-block btn-primary" type="button" onClick={props.handleClickLogin}>Login</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
