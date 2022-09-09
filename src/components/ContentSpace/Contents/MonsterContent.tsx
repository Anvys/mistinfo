import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {MonsterSelectors} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TMonster, TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {MonsterThunks} from "../../../redux/reducers/monsterReducer";

type TProps = {};
export const MonsterContent: React.FC<TProps> = (props) => {
    const isInit = useSelector(MonsterSelectors.isInit)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(MonsterThunks.getAll())
    const data = useSelector(MonsterSelectors.getData);
    const [dataToAdd, setDataToAdd] = useState(null as null | TMonster)
    const dataAddHandler = (id: string) => {
        const temp = id.length ? data.find(v => v._id === id) || null : null
        setDataToAdd(temp)
        // console.log(`Setted data:`)
        // console.log(temp)
    }
    const dataDelHandler = (id: string) => {
        dispatch(MonsterThunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const newDefName = `New Monster ${data.length + 1}`
    const initObj: TWOid<TMonster> = {
        name: newDefName,
        type: 'Monster',
        level: 1,
        life: 0,
        stamina: 0,
        attack: 0,
        armor: 0,
        abilities: [],
        loot: null,
        region: '',
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
                    curThunks: MonsterThunks,
                    dataName: 'monster'
                })}
            </div>
            <div className={styles.dbField}>
                <Outlet/>

                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}