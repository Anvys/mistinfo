import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {AbilitySelectors, TrainerSelectors} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TTrainer, TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {AbilityThunks} from "../../../redux/reducers/abilityReducer";
import {TrainerThunks} from "../../../redux/reducers/trainerReducer";

type TProps = {};
export const TrainerContent: React.FC<TProps> = (props) => {
    const isInit = useSelector(TrainerSelectors.isInit)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(TrainerThunks.getAll())
    const data = useSelector(TrainerSelectors.getData);
    const [dataToAdd, setDataToAdd] = useState(null as null | TTrainer)
    const dataAddHandler = (id: string) => {
        const temp = id.length ? data.find(v => v._id === id) || null : null
        setDataToAdd(temp)
    }
    const dataDelHandler = (id: string) => {
        dispatch(TrainerThunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const newDefName = `New Trainer ${data.length + 1}`
    const initObj: TWOid<TTrainer> = {
        name: newDefName,
        type: 'Academic',
        difficult: 0,
        time: 0,
        cooldown: 0,
        cost: {count: 0, name: "", type: ""},
        reward: {count: 0, name: "", type: ""},
        location: '',

        translate: {En: newDefName, Ru: '', Fr: ''},
        notes: []
    }
    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                {GenDataAdd({
                    data: dataToAdd,
                    resetAddFormData,
                    initObj,
                    curThunks: TrainerThunks,
                    dataName: 'trainer'
                })}
            </div>
            <div className={styles.dbField}>
                <Outlet/>

                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}