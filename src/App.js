import './App.scss';
import React, { useEffect, useState, lazy, Suspense, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
import Spinner from './components/Admin/UI/Spinner/Spinner';
import ProtectedAuth from './hoc/ProtectedAuth';
const AdminPanel = lazy(() => import('./containers/Admin/AdminPanel/AdminPanel'));
const Auth = lazy(() => import('./containers/Admin/Auth/Auth'));

const App = (props) => {

  const [loading, setLoading] = useState(true)

  const { authCheckState } = props;
  useEffect(() => {
    setLoading(false)
    props.authCheckState();
  }, [authCheckState]);


  let routes = (
    < Spinner > Loading...</Spinner>
  );

  if (!loading) {
    routes = (
      <Switch >

        {/* site routes */}
        <Route exact path='/'>
          <Suspense fallback={< Spinner > Loading...</Spinner>}>
            Admin Route = /admin/
          </Suspense>
        </Route>


        <Route exact strict path='/admin/login' >
          <Suspense fallback={< Spinner > Loading...</Spinner>}>
            <Auth formType={'login'} />
          </Suspense>
        </Route>
        <Route exact strict path='/admin/register' >
          <Suspense fallback={< Spinner > Loading...</Spinner>}>
            <Auth formType={'register'} />
          </Suspense>
        </Route>

        {/* admin routes */}
        <ProtectedAuth>
          <Route path='/admin/' >
            <Suspense fallback={< Spinner > Loading...</Spinner>}>
              <AdminPanel />
            </Suspense>
          </Route>
        </ProtectedAuth>

      </Switch>
    );
  }

  return (
    <div className="c-app">
      {routes}
    </div >
  );
}

const mapStateToProps = state => ({
  isAuth: state.reducerAuth.token !== null
})
const mapDispatchToProps = dispatch => ({
  authCheckState: () => dispatch(actions.authCheckState())
});
export default connect(mapStateToProps, mapDispatchToProps)(App)
