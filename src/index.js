import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import {store} from './store'
import {Provider} from "react-redux";
import { CookiesProvider } from 'react-cookie';

import { ThemeProvider, createTheme} from '@material-ui/core/styles';
import makeStyles from "@mui/styles/makeStyles";

const theme = createTheme();


ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
        <CookiesProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </CookiesProvider>
           </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
