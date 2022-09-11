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
            <Link to={'/quest'} className={styles.navButton}>Quests</Link>
            <Link to={'/ability'} className={styles.navButton}>Ability</Link>
            <Link to={'/monster'} className={styles.navButton}>Monster</Link>
            <Link to={'/recipe'} className={styles.navButton}>Recipe</Link>
            <Link to={'/companion'} className={styles.navButton}>Companion</Link>
            <Link to={'/questitem'} className={styles.navButton}>Quest Item</Link>
            <Link to={'/questitemsource'} className={styles.navButton}>Quest Item Source</Link>
        </div>
    )
}