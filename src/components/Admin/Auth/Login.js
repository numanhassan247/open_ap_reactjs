import React from 'react'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

const Login = (props) => {

    return (
        <div className='in-middle'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card-group">
                            <div className="card p-4">
                                <div className="card-body">
                                    {props.spinner}
                                    {props.errorMessage}
                                    <h1>Login</h1>
                                    <p className="text-muted">Sign In to your account</p>
                                    <div className="input-group mb-3">
                                        <Input
                                            elementType={'input'}
                                            elementConfig={{ name: 'email', type: 'email', placeholder: 'Email' }}
                                            value={props.form.email}
                                            icon='cil-envelope-open'
                                            changed={props.handleOnChangeInput}
                                        />
                                    </div>
                                    <div className="input-group mb-4">
                                        <Input
                                            elementType={'input'}
                                            elementConfig={{ name: 'password', type: 'password', placeholder: 'Password' }}
                                            value={props.form.password}
                                            icon='cil-lock-locked'
                                            changed={props.handleOnChangeInput}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <Button btnClass={'btn-primary px-4'} clicked={props.handleDoAuth} >Login</Button>
                                        </div>
                                        <div className="col-6 text-right">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card text-white bg-primary py-5 d-md-down-none" >
                                <div className="card-body text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        <Button btnClass={'btn-lg btn-outline-light mt-3'} clicked={props.handleClickRegister} >Register Now!</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}



export default Login
