import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {QuestItemSourceSelectors} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TQuestItemSource, TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {QuestItemSourceThunks} from "../../../redux/reducers/questItemSourceReducer";

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
    const newDefName = ``

    const initObj: TWOid<TQuestItemSource> = dataToAdd === null? {
        name: newDefName,
        posQuestItem:{type:"pos",position:{x:0,y:0}},
        translate: {En: newDefName, Ru: '', Fr: ''},
        notes: [],
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
                <Outlet/>
                <DataView data={data} dataEditHandler={dataEditHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}