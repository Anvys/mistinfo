import React from "react";
import {Link} from "react-router-dom";
import styles from './SideBar.module.css'

export const SideBar: React.FC = () =>{
    return(
        <div className={styles.sideBox}>
        Database menu
            <Link to={'/material'} className={styles.navButton}>Material</Link>
            <Link to={'/component'} className={styles.navButton}>Component</Link>
            <Link to={'/npc'} className={styles.navButton}>Npc</Link>
            <Link to={'/region'} className={styles.navButton}>Region</Link>
            <Link to={'/location'} className={styles.navButton}>Location</Link>
            <Link to={'/gatherpoint'} className={styles.navButton}>GatherPoint</Link>
        </div>
    )
}