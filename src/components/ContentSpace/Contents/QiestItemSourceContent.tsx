import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {QuestItemSourceSelectors} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {QuestItemSourceThunks} from "../../../redux/reducers/questItemSourceReducer";
import {TQuestItemSource} from "../../../Types/MainEntities";
import {initCommonFields} from "../contentUtils";

type TProps = {};

export const QuestItemSourceContent: React.FC<TProps> = (props) => {
    const selector = QuestItemSourceSelectors
    const thunks = QuestItemSourceThunks
    const str = 'questItemSource'
    const isInit = useSelector(selector.isInit)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(thunks.getAll())
    const data = useSelector(selector.getData);
    const [dataToAdd, setDataToAdd] = useState(null as null | TQuestItemSource)
    const dataEditHandler = (id: string) => {
        const temp = id.length ? data.find(v => v._id === id) || null : null
        setDataToAdd({...temp} as TQuestItemSource)
    }
    const dataDelHandler = (id: string) => {
        dispatch(thunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const initObj: TWOid<TQuestItemSource> = dataToAdd === null ? {
        posQuestItem: {type: "pos", position: {x: 0, y: 0}},
        ...initCommonFields
    } : {...dataToAdd}
    console.log(initObj)
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
                <DataView data={data} dataEditHandler={dataEditHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}