import React, {useEffect, useState} from 'react';
import style from './MaterialContentHeader.module.css'
import {Link, useLocation, useNavigate} from "react-router-dom";

type TProps = {};
export const MaterialContentHeader:React.FC<TProps> = (props) => {
    const history = useLocation()
    // const path = history.pathname.split('/')
    const [curLoc, setCurLoc] = useState('');
    useEffect(()=>{
        const path  = history.pathname.split('/')
        setCurLoc(path[path.length-1])
    }, [history.pathname])
    console.log(curLoc)
    return (
        <div className={style.header}>
            <div>Materials header</div>
            {curLoc === 'material' &&<button className={style.navButton}><Link to={'/material/add'}>Add</Link></button>}
            {curLoc === 'add' &&<button className={style.navButton}><Link to={'/material'}>View</Link></button>}
        </div>
    );
}