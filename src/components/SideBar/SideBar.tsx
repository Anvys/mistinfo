import React from "react";
import styles from './SideBar.module.css'

export const SideBar: React.FC = () =>{
    return(
        <div className={styles.sideBox}>
        SideBar
            <div className={styles.navButton}>Material</div>
        </div>
    )
}