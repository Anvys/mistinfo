import React, {useState} from 'react';
import s  from './Login.module.css';
import {useAppDispatch} from "../../redux/store";
import {AuthSlice, AuthThunks} from "../../redux/reducers/authReducer";
import {useSelector} from "react-redux";
import {AuthSelectors} from "../../redux/dataSelectors";
import {useLocation, useNavigate} from "react-router-dom";

type TProps = {};
export const Login: React.FC<TProps> = (props) => {
    const isAuth = useSelector(AuthSelectors.isInit)
    const user = useSelector(AuthSelectors.getData)
    const [login, setLogin] = useState('')
    const [pswd, setPswd] = useState('')
    const dispatch = useAppDispatch()
    // const navi = useNavigate()

    // console.log((loca.pathname))
    const onLoginhandler = () => {
        console.log(`Loggin in `, login, pswd)
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
        <div className={s.loginMain}>
            <div className={s.notAuth}>{!isAuth && 'not Authorized'}</div>
            <div className={s.welcome}>{isAuth && `Welcome, ${user} !`}</div>


            {isAuth && <div><button  className={s.logoutBtn} type={'button'} onClick={onLogoutHandler}>logout</button></div>}
            {!isAuth &&<div className={s.loginFrom}>
                <input className={s.input} type={'text'} value={login} onChange={e => setLogin(e.target.value)} placeholder={'login'}
                       required/>
                <input  className={s.input} type={'password'} value={pswd} onChange={e=>setPswd(e.target.value)}  placeholder={'password'} required/>
                <button className={s.loginBtn} type={'button'} onClick={onLoginhandler}>login</button>
            </div>                }
            {/*{!isAuth && <button className={s.loginBtn} type={'button'} onClick={onLoginhandler}>login</button>}*/}
        </div>
    );
}