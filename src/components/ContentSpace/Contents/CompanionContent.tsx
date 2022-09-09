import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {CompanionSelectors} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TCompanion, TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {CompanionThunks} from "../../../redux/reducers/companionReducer";

type TProps = {};
export const CompanionContent: React.FC<TProps> = (props) => {
    const isInit = useSelector(CompanionSelectors.isInit)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(CompanionThunks.getAll())
    const data = useSelector(CompanionSelectors.getData);
    const [dataToAdd, setDataToAdd] = useState(null as null | TCompanion)
    const dataAddHandler = (id: string) => {
        const temp = id.length ? data.find(v => v._id === id) || null : null
        setDataToAdd(temp)
        // console.log(`Setted data:`)
        // console.log(temp)
    }
    const dataDelHandler = (id: string) => {
        dispatch(CompanionThunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const newDefName = `New Com ${data.length + 1}`
    const initObj: TWOid<TCompanion> = {
        name: newDefName,
        type: 'Human',
        evoType: "Silver",
        levelMax: 1,
        lifeMax: 0,
        staminaMax: 0,
        armorMax: 0,
        evoQuests:[],
        location:'',
        comfort: 0,
        skills: [],
        weapon: "Axe",
        weaponMaxSkill: 1,
        icon: '',
        translate: {En: newDefName, Ru: '', Fr: ''},
        notes: [],
    }
    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                {GenDataAdd({
                    data: dataToAdd,
                    resetAddFormData,
                    initObj,
                    curThunks: CompanionThunks,
                    dataName: 'companion'
                })}
            </div>
            <div className={styles.dbField}>
                <Outlet/>

                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}