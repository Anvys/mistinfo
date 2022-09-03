import React from "react";
import {Link} from "react-router-dom";
import styles from './SideBar.module.css'

export const SideBar: React.FC = () =>{
    return(
        <div className={styles.sideBox}>
        Database menu
            <Link to={'/map'} className={styles.navButton}>Map</Link>
            <Link to={'/material'} className={styles.navButton}>Material</Link>
            <Link to={'/component'} className={styles.navButton}>Component</Link>
            <Link to={'/npc'} className={styles.navButton}>Npc</Link>
            <Link to={'/region'} className={styles.navButton}>Region</Link>
            <Link to={'/location'} className={styles.navButton}>Location</Link>
            <Link to={'/gatherpoint'} className={styles.navButton}>GatherPoint</Link>
            <Link to={'/loot'} className={styles.navButton}>Loot</Link>
            <Link to={'/staminaelixir'} className={styles.navButton}>Stamina</Link>
            <Link to={'/event'} className={styles.navButton}>Events</Link>
            <Link to={'/mapobject'} className={styles.navButton}>Map Objects</Link>
        </div>
    )
}