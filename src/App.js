import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Chat from "./components/Chat";
import Login from "./components/Login";
import Test from "./components/Test";
import NotFound from "./components/NotFound";
import './App.scss';
import {useCurrentUser} from "./API";
import UserProfile from "./components/UserProfile";
import {AuthContext} from "./context";

function App() {
    const currentUser = useCurrentUser();
    return (

        <div className="App">
            <AuthContext.Provider value={{currentUser}}>
            <BrowserRouter>
                <Switch>
                    {(currentUser.isLoggedIn)
                        ? <Route exact path="/" component={Chat}></Route>
                        : <Route exact path="/" component={Login}></Route>
                    }

                    <Route exact path="/test" component={Test}></Route>
                    <Route exact path="/profile" component={UserProfile}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
            </BrowserRouter>
            </AuthContext.Provider>

        </div>


    );
}

export default App;
