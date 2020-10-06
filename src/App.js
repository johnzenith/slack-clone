import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Login from './components/User/Login';
import { useStateValue } from './Context/StateProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    const [{ user }, dispatch] = useStateValue();

    return (
        <div className="app">
            <Router>
                {!user ? (
                    <Login />
                ) : (
                    <>
                        <Header />
                        <div className="app__body">
                            <Sidebar />

                            <Switch>
                                <Route path="/room/:roomId">
                                    <Chat />
                                </Route>
                                <Route path="/">
                                    <h1>Home Screen</h1>
                                </Route>
                            </Switch>
                        </div>
                    </>
                )}
            </Router>
        </div>
    );
}

export default App;
