import React from "react";
import {SideBar} from "../SideBar/SideBar";
import {ContentSpace} from "../ContentSpace/ContentSpace";
import styles from './WorkSpace.module.css'


export const WorkSpace: React.FC = () => {

    return (
        <div className={styles.box}>
            <SideBar/>
            <ContentSpace/>
        </div>
    )
}