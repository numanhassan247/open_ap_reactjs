import React from 'react'

const UserTR = (props) => {
    const { user } = props

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
    return (

        <tr>
            <td>{(user.first_name || 'N/A') + ' ' + (user.last_name || '')}</td>
            <td>{user.created_at}</td>
            <td>Member</td>
            <td>
                <span className={statusClass}>{statusTxt}</span>
            </td>
            <td>
                <button className="btn btn-success mr-1" href="#">
                    <i className='cil cil-pencil'></i>
                </button>

                <button className="btn btn-info mr-1" href="#">
                    <i className='cil cil-description'></i>
                </button>
                <button className="btn btn-danger mr-1" href="#">
                    <i className='cil cil-trash'></i>
                </button>

            </td>
        </tr>
    )
}

export default UserTR
