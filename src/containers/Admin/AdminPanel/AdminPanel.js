import '@coreui/coreui';
import '../../../scss/Admin/style.scss';
import React from 'react'
import Layout from '../../../components/Admin/Layout/Layout'
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Logout from '../../../containers/Admin/Auth/Logout'
import Users from '../../../components/Admin/Pages/Users/Users'
import Stores from '../../../components/Admin/Pages/Stores/Stores';
import UserForm from '../../../components/Admin/Pages/Users/UserForm';

const AdminPanel = () => {
    let match = useRouteMatch();

    return (
        <Layout >
            <Switch>
                <Route path={match.url + '/logout'} ><Logout /></Route>
                <Route exact path={match.url + '/users/edit/:id'} component={() => <UserForm />} />
                <Route path={match.url + '/users'} component={() => <Users />} />
                <Route path={match.url + '/stores'} component={() => <Stores />} />
            </Switch>
        </Layout>
    )
}


export default AdminPanel