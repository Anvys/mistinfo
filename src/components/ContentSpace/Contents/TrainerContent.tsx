import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {TrainerSelectors} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {TrainerThunks} from "../../../redux/reducers/trainerReducer";
import {TTrainer} from "../../../Types/MainEntities";
import {initCommonFields} from "../contentUtils";

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
    const initObj: TWOid<TTrainer> = {
        type: 'Academic',
        difficult: 0,
        time: 0,
        cooldown: 0,
        cost: {count: 0, name: "", type: ""},
        reward: {count: 0, name: "", type: ""},
        location: '',
        ...initCommonFields
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
                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}