import React, { useEffect, useState, Fragment, useReducer } from 'react'
import Spinner from '../../UI/Spinner/Spinner'
import UserTR from '../Users/UserTR'
import useRequest from '../../../../hooks/request';

const userReducer = (users, action) => {
    switch (action.type) {
        case 'SET':
            return action.users;
        case 'ADD':
            return [...users, action.user];
        case 'DELETE':
            return users.filter(user => user.id !== action.id);
        default:
            throw new Error('oops something went wrong!');
    }
}


const Stores = () => {

    const [users, dispatch] = useReducer(userReducer, [])
    const { loading, data, error, send } = useRequest()

    useEffect(() => {
        // Get users data from API 
        send('users', 'get', true);
    }, []);

    useEffect(() => {
        dispatch({ type: 'SET', users: data })
    }, [data]);


    let pageJSX = null
    if (!loading && users.length > 0) {
        pageJSX = (data.map(user => (
            <UserTR key={user.id} user={user} />
        )))
    }

    if (loading)
        return <Spinner>Loading...</Spinner>

    else {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header"> User Managment</div>
                        <div className="card-body">
                            <table className="table table-responsive-sm table-bordered table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Date registered</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {pageJSX}

                                </tbody>
                            </table>
                            <nav>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" href="#">Prev</a>
                                    </li>
                                    <li className="page-item active">
                                        <a className="page-link" href="#">1</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">2</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">3</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">4</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Stores
