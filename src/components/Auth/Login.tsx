import React, {useState} from 'react';
import styles from './Login.module.css';
import {useAppDispatch} from "../../redux/store";
import {AuthSlice, AuthThunks} from "../../redux/reducers/authReducer";
import {useSelector} from "react-redux";
import {AuthSelectors} from "../../redux/dataSelectors";

type TProps = {};
export const Login: React.FC<TProps> = (props) => {
    const isAuth = useSelector(AuthSelectors.isInit)
    const user = useSelector(AuthSelectors.getUser)
    const [login, setLogin] = useState('')
    const [pswd, setPswd] = useState('')
    const dispatch = useAppDispatch()
    const onLoginhandler = () => {
        if (login && pswd) {
            dispatch(AuthThunks.login({login: login, password: pswd}))
            setPswd('')
            setLogin('')
        }
    }
    const onLogoutHandler = () => {
        dispatch(AuthSlice.actions.logout())
    }
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
            login / {isAuth ? 'Auth' : 'notAuth'}
            {isAuth && `Welcome, ${user} !`}
            {isAuth && <button type={'button'} onClick={onLogoutHandler}>logout</button>}
            {!isAuth &&
                [<input type={'text'} value={login} onChange={e => setLogin(e.target.value)} placeholder={'login'}
                       required/>,
                <input type={'text'} value={pswd} onChange={e=>setPswd(e.target.value)}  placeholder={'password'} required/>,
                <button type={'button'} onClick={onLoginhandler}>login</button>]
                }
        </div>
    );
}