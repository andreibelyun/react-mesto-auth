import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ isLogged, Component }) {

    return (
        <Route>
            {isLogged ? <Component /> : <Redirect to="/sign-in" />}
        </Route>
    );
}