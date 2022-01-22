import React, {useEffect} from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Main from "./components/Main";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import {initApp} from "./store/actions";
import {isCurrentUserLoggedIn} from "./store/selectors";

function App() {
    const dispatch = useDispatch();
    const _isCurrentUserLoggedIn = useSelector(isCurrentUserLoggedIn);
    useEffect(() => {
        dispatch(initApp());
    }, [])

    return (

        <div className="App">

            <BrowserRouter>
                <Switch>
                    {(_isCurrentUserLoggedIn)
                        ? <Route exact path="/" component={Main}></Route>
                        : <Route exact path="/" component={Login}></Route>
                    }
                    <Route component={NotFound}></Route>
                </Switch>
            </BrowserRouter>


        </div>


    );
}

export default App;
