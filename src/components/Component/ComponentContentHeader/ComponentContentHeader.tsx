import React, {useEffect, useState} from 'react';
import style from './ComponentContentHeader.module.css'
import {Link, useLocation, useNavigate} from "react-router-dom";

type TProps = {};
export const ComponentContentHeader:React.FC<TProps> = (props) => {
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
            <div>Components header</div>
            {curLoc === 'component' &&<button className={style.navButton}><Link to={'/component/add'}>Add</Link></button>}
            {curLoc === 'add' &&<button className={style.navButton}><Link to={'/component'}>View</Link></button>}
        </div>
    );
}