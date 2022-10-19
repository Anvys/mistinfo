import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {QuestItemSelectors} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {QuestItemThunks} from "../../../redux/reducers/questItemReducer";
import {TQuestItem} from "../../../Types/MainEntities";
import {initCommonFields} from "../contentUtils";

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
    const initObj: TWOid<TQuestItem> = {
        icon: '',
        ...initCommonFields
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
                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}