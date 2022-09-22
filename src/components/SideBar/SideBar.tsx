import React, {useState} from "react";
import {Link} from "react-router-dom";
import s from './SideBar.module.css'
import {useSelector} from "react-redux";
import {AuthSelectors} from "../../redux/dataSelectors";

export const SideBar: React.FC = () => {
    const [cat1, setCat1] = useState(false)
    const [cat2, setCat2] = useState(false)
    const isAuth = useSelector(AuthSelectors.isInit)
    return (
        <div className={s.sideBox}>
            Database menu

            <Link to={'/AdminLoginForm38n8g32chrtm56'} className={s.navButton}>Login</Link>
            <Link to={'/map'} className={s.navButton}>Map</Link>

            <Link to={'/material'} className={s.navButton}>Material</Link>
            <Link to={'/component'} className={s.navButton}>Component</Link>

            <Link to={'/quest'} className={s.navButton}>Quests</Link>
            <Link to={'/ability'} className={s.navButton}>Ability</Link>
            <Link to={'/monster'} className={s.navButton}>Monster</Link>
            <Link to={'/companion'} className={s.navButton}>Companion</Link>

            <button className={cat1 ? s.catBtnActive : s.catBtn} type={'button'}
                    onClick={() => setCat1(a => !a)}>Other</button>
            {cat1 &&
                <div className={s.catMenu}>
                    <Link to={'/shop'} className={s.navButton}>Shop</Link>
                    <Link to={'/loot'} className={s.navButton}>Loot</Link>
                    <Link to={'/npc'} className={s.navButton}>Npc</Link>
                    <Link to={'/recipe'} className={s.navButton}>Recipe</Link>
                </div>}

            <button className={cat2 ? s.catBtnActive : s.catBtn} type={'button'}
                    onClick={() => setCat2(a => !a)}>Other2</button>
            {cat2 &&
                <div className={s.catMenu}>
                    <Link to={'/region'} className={s.navButton}>Region</Link>
                    <Link to={'/location'} className={s.navButton}>Location</Link>
                    <Link to={'/event'} className={s.navButton}>Events</Link>
                    <Link to={'/questitemsource'} className={s.navButton}>Quest Item Source</Link>
                </div>}

            {isAuth && `Dev`}
            {isAuth &&
                <>
                    <Link to={'/staminaelixir'} className={s.navButton}>Stamina</Link>
                    <Link to={'/gatherpoint'} className={s.navButton}>GatherPoint</Link>
                    <Link to={'/mapobject'} className={s.navButton}>Map Objects</Link>
                    <Link to={'/questitem'} className={s.navButton}>Quest Item</Link>
                </>}


        </div>
    )
}