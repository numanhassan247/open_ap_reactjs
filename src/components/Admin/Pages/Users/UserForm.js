import React, { useEffect, useReducer } from 'react'
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from 'yup';
import useRequest from '../../../../hooks/request';
import userReducer, { initState } from '../../Reducers/UserReducer';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import Spinner from '../../UI/Spinner/Spinner';
import Alert from '../../UI/Alert/Alert';
import Button from '../../UI/Button/Button';


const validationSchema = {
    first_name: Yup.string()
        .max(225, 'Must be 225 characters or less')
        .required('Required'),
    last_name: Yup.string()
        .max(225, 'Must be 225 characters or less')
        .required('Required'),
    status: Yup.string()
        .required('Required')
}



const UserForm = () => {

    const [state, dispatch] = useReducer(userReducer, initState)
    const { loading, data, error, send, requestID, alert } = useRequest()
    let { id } = useParams();


    useEffect(() => {

        // Get users data from API 
        send({ url: `users/single/${id}`, method: 'get', requestID: 'GET_BY_ID' });
    }, []);

    useEffect(() => {
        if (requestID === 'GET_BY_ID') {
            dispatch({ type: 'SET', users: data })
        }
        else if (requestID === 'UPDATE') {
            dispatch({ type: 'UPDATE', user: data, alert: alert })
        }

    }, [requestID])

    const handleUserFormSubmit = (values) => {
        values.id = id;
        send({ url: `users/update`, method: 'put', requestID: 'UPDATE', data: values });
    }
    const handleOnRemoveAlert = (values) => {
        dispatch({ type: 'REMOVE_ALERT' })
    }

    const initialValues = {
        first_name: state.users.first_name || '',
        last_name: state.users.last_name || '',
        status: state.users.status,
        address: state.users.address || '',
        zip: state.users.zip || '',
        phone_no: state.users.phone_no || '',
    }

    if (error) {
        return (<div className="row justify-content-center">
            <div className="col-md-10 col-sm-12">
                <Alert type='error'>
                    {error.message}
                </Alert>
            </div>
        </div>
        )
    }
    else {


        return (
            <div className="row justify-content-center">
                <div className="col-md-10 col-sm-12">
                    {(state.alert) &&
                        <Alert handleOnRemoveAlert={handleOnRemoveAlert} isRemovable={true} type={(state.alert.type) ? 'success' : 'error'}>
                            {state.alert.message}
                        </Alert>
                    }

                    {_.isEmpty(state.users) ?
                        <Spinner>Loading...</Spinner>
                        :


                        <Formik
                            initialValues={initialValues}
                            validationSchema={Yup.object(validationSchema)}
                            onSubmit={(values) => {
                                handleUserFormSubmit(values);
                            }}
                        >

                            {({ errors, touched, values }) => (

                                < div className="card">
                                    <Form className='form-horizontal'>
                                        <div className="card-header"><strong>User Details</strong></div>
                                        <div className="card-body">

                                            <div className="form-group row">
                                                <div className="col-md-12">
                                                    <strong>Account Information</strong>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label">Email</label>
                                                <div className="col-md-9">
                                                    <p className="form-control-static">{state.users.email}</p>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label">Created At</label>
                                                <div className="col-md-9">
                                                    <p className="form-control-static">{state.users.created_at}</p>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label" htmlFor="text-input">First Name:</label>
                                                <div className="col-md-9">
                                                    <Field className={'form-control ' + ((errors.first_name && touched.first_name) && 'is-invalid')} name="first_name" type="text" placeholder="First Name" />
                                                    <ErrorMessage name="first_name" >
                                                        {msg => <div className="error invalid-feedback">{msg}</div>}
                                                    </ErrorMessage>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label" htmlFor="text-input">Last Name:</label>
                                                <div className="col-md-9">
                                                    <Field className={'form-control ' + ((errors.last_name && touched.last_name) && 'is-invalid')} name="last_name" type="text" placeholder="Last Name" />
                                                    <ErrorMessage name="last_name" >
                                                        {msg => <div className="error invalid-feedback">{msg}</div>}
                                                    </ErrorMessage>
                                                </div>

                                            </div>

                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label" htmlFor="role_id">Role</label>
                                                <div className="col-md-9">
                                                    <Field as="select" name="role_id" className='form-control'>
                                                        <option value="1">Admin</option>
                                                        <option value="2">Staff</option>
                                                        <option value="3">Simple User</option>
                                                    </Field>
                                                </div>
                                            </div>


                                            <div className="form-group row">
                                                <label className="col-md-3 col-form-label">Status</label>
                                                <div className="col-md-9 col-form-label">
                                                    <div className="form-check">
                                                        <Field checked={(values.status) === '1' ? true : false} id='statusA' name='status' className='form-check-input' type='radio' value='1' />
                                                        <label className="form-check-label" htmlFor="statusA">Active</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <Field checked={(values.status) === '0' ? true : false} id='statusD' name='status' className='form-check-input' type='radio' value='0' />
                                                        <label className="form-check-label" htmlFor="statusD">Deactive</label>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="card-footer text-right">
                                            <Button btnClass="btn-sm btn-light mr-2" type="reset"> Cancel</Button>
                                            <Button disabled={loading} btnClass="btn-sm btn-success" type="submit"> {!loading ? 'Submit' : 'Saving...'} </Button>
                                        </div>
                                    </Form>

                                </div>
                            )}

                        </Formik>
                    }

                </div>
            </div >
        );
    }
}

export default UserForm
