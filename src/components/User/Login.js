import React from 'react';
import './Login.css';
import SlackLogo from '../../assets/img/slack.svg';
import { Button } from '@material-ui/core';
import { auth, provider } from '../../config/firebase';
import { useStateValue } from '../../Context/StateProvider';
import { actionTypes } from '../../Context/reducer';

function Login() {
    const [state, dispatch] = useStateValue();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then(result => {
                console.log(result);
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                });
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    return (
        <div className="login">
            <div className="login__container">
                <img src={SlackLogo} alt="Slack" />
                <h1>Sign in to Clever Programmer HQ</h1>
                <p>cleverprogrammer.slack.com</p>
                <Button onClick={signIn}>Sign In with Google</Button>
            </div>
        </div>
    );
}

export default Login;
