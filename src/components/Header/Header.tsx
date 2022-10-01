import React from 'react';
import s from './Header.module.scss';
import {Login} from "../Auth/Login";
import {useSelector} from "react-redux";
import {AuthSelectors} from "../../redux/dataSelectors";
import {useLocation} from "react-router-dom";

type TProps = {};
export const Header:React.FC<TProps> = (props) => {
    const isAuth = useSelector(AuthSelectors.isInit)
    const loca = useLocation()
    return (
        <div className={s.headerMain}>
            <a  href={'https://www.mistlegacy.com/'} target={"_blank"} className={s.logo}/>
            <div className={s.title}>Mist in Forest {isAuth ? 'DEV MODE' : ''}</div>
            {(loca.pathname === '/AdminLoginForm38n8g32chrtm56' || isAuth) && <Login/>}
        </div>
    );
}