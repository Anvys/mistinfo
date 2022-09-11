import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {AbilitySelectors, QuestItemSelectors} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TQuestItem, TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {AbilityThunks} from "../../../redux/reducers/abilityReducer";
import {QuestItemThunks} from "../../../redux/reducers/questItemReducer";
import {PosQuestItemField} from "../../DataAdd/Fields/PosField";

type TProps = {};

export const QuestItemContent: React.FC<TProps> = (props) => {
    const selector = QuestItemSelectors
    const thunks = QuestItemThunks
    const str = 'questItem'
    const isInit = useSelector(selector.isInit)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(thunks.getAll())
    const data = useSelector(selector.getData);
    const [dataToAdd, setDataToAdd] = useState(null as null | TQuestItem)
    const dataAddHandler = (id: string) => {
        const temp = id.length ? data.find(v => v._id === id) || null : null
        setDataToAdd(temp)
    }
    const dataDelHandler = (id: string) => {
        dispatch(thunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const newDefName = `New ${str} ${data.length + 1}`
    const initObj: TWOid<TQuestItem> = {
        name: newDefName,
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
                    curThunks: thunks,
                    dataName: str
                })}

            </div>
            <div className={styles.dbField}>
                <Outlet/>
                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}