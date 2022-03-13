import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Main from "./components/Main";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Auth from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";
import './App.scss';

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
