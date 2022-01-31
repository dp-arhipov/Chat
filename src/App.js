import React, {useEffect} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Main from "./components/Main";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import {initAuth} from "./store/actions";
import {isCurrentUserLoggedIn} from "./store/selectors";
import Auth from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <div className="App">
            <Auth>
                <BrowserRouter>
                    <Switch>
                        <PrivateRoute exact path="/" component={Main}/>
                        <Route exact path="/login" component={Login}/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            </Auth>
        </div>
    );
}

export default App;
