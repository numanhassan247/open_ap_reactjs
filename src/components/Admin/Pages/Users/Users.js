import React, { useEffect, Fragment, useReducer } from 'react'
import Spinner from '../../UI/Spinner/Spinner'
import useRequest from '../../../../hooks/request';
import { MDBDataTable } from 'mdbreact';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';
import { useHistory } from 'react-router-dom';
import userReducer, { initState } from "../../Reducers/UserReducer";


const Users = () => {
    let history = useHistory();

    const [state, dispatch] = useReducer(userReducer, initState)
    const { loading, data, error, send, requestID } = useRequest()

    useEffect(() => {
        // Get users data from API 
        send({ url: 'users', method: 'get', requestID: 'LIST' });
    }, []);


    useEffect(() => {
        if (requestID === 'LIST') {
            let fetchedUsers = [];
            if (data && data.length > 0) {
                for (let user of data) {
                    fetchedUsers.push(user);
                }
            }
            dispatch({ type: 'SET', users: fetchedUsers })
        }
        else if (requestID === 'DELETE') {
            dispatch({ type: 'DELETE_OK', id: state.id })
        }
    }, [requestID])




    const handleClickedEdit = (id) => {
        history.push(`users/edit/${id}`)
    }

    const handleClickedDelete = (id) => {
        dispatch({ type: 'DELETE_PROMPT', id: id })
    }

    const handleOkDeletePrompt = () => {
        send({
            url: 'users/delete', method: 'delete', requestID: 'DELETE',
            data: {
                ids: [state.id]
            }
        });

    }
    const handleCancelDeletePrompt = () => {
        dispatch({ type: 'DELETE_CANCEL' })
    }


    let pageJSX = null
    const tableActionBtn = (id) => (
        <Fragment>
            <Button btnClass="btn-dark mr-1"
                clicked={() => handleClickedEdit(id)} ><i className='cil cil-pencil'></i>
            </Button>
            <Button btnClass="btn-danger mr-1"
                clicked={() => handleClickedDelete(id)} ><i className='cil cil-trash'></i>
            </Button>
        </Fragment>
    )

    // Datatable configuration 
    const datatableConfig = {
        columns: [
            {
                label: 'Username',
                field: 'username',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Date registered',
                field: 'date_registered',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Role',
                field: 'role',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Status',
                field: 'status',
                sort: 'asc',
                width: 150,
                searchable: true
            },
            {
                label: 'Actions',
                field: 'actions',
                width: 150
            }
        ],
        rows: []
    }



    if (!loading && state.users.length > 0) {

        pageJSX = (state.users.map(user => {
            let statusClass = '';
            let statusTxt = '';
            switch (user.status) {
                case '1':
                    statusClass = 'badge badge-success'
                    statusTxt = 'Active'
                    break;
                case '0':
                    statusClass = 'badge badge-danger'
                    statusTxt = 'Deactive'
                    break;
                default:
                    statusClass = 'badge'
                    break;
            }
            datatableConfig.rows.push({
                username: (user.first_name || 'N/A') + ' ' + (user.last_name || ''),
                date_registered: user.created_at,
                role: 'Member',
                status: <span className={statusClass}>{statusTxt}</span>,
                actions: tableActionBtn(user.id)
            })

        }))
    }


    if (loading)
        return <Spinner>Loading...</Spinner>

    else {
        return (
            <Fragment>

                {state.confirmDelete &&
                    <Modal
                        modalStyle={'danger'}
                        onOk={handleOkDeletePrompt}
                        okText={'Delete'}
                        onCancel={handleCancelDeletePrompt}
                        cancelText={'Cancel'}
                        title={'Confirmation'}

                    >Are you sure you want to delete?</Modal>}
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='card'>
                            <div className='card-header'>User Managment</div>
                            <div className='card-body'>
                                <MDBDataTable
                                    small={false}
                                    striped
                                    bordered
                                    hover
                                    data={datatableConfig}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Users
