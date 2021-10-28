import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Chat from "./components/Chat";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import './App.scss';
import {useCurrentUser} from "./API";

function App() {
    const currentUser = useCurrentUser();
    return (

        <div className="App">
            <BrowserRouter>
                <Switch>
                    {(currentUser.isLoggedIn)
                        ? <Route exact path="/" component={Chat}></Route>
                        : <Route exact path="/" component={Login}></Route>
                    }
                    <Route component={NotFound}></Route>
                </Switch>
            </BrowserRouter>

        </div>


    );
}

export default App;
