import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {getIsQuestInitSelector, getQuestSelector} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TQuest, TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {QuestThunks} from "../../../redux/reducers/questReducer";

type TProps = {};
export const QuestContent: React.FC<TProps> = (props) => {
    const isInit = useSelector(getIsQuestInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(QuestThunks.getAll())
    const data = useSelector(getQuestSelector);
    const [dataToAdd, setDataToAdd] = useState(null as null | TQuest)
    const dataAddHandler = (id: string) => {
        const temp = id.length ? data.find(v => v._id === id) || null : null
        setDataToAdd(temp)
        console.log(`Setted data:`)
        console.log(temp)
    }
    const dataDelHandler = (id: string) => {
        dispatch(QuestThunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const initObj: TWOid<TQuest> = {
        name: `New Quest ${data.length + 1}`,
        type: 'Quest',
        availableAfter: [],
        stages: [],
        translate: {En: `New Quest ${data.length + 1}`, Ru: '', Fr: ''},
        notes: [],
    }
    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                {/*<RegionDataAdd data={dataToAdd} resetAddFormData={resetAddFormData}/>*/}
                {GenDataAdd({
                    data: dataToAdd,
                    resetAddFormData,
                    initObj,
                    curThunks: QuestThunks,
                    dataName: 'quest'
                })}
            </div>
            <div className={styles.dbField}>
                <Outlet/>

                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler} dataName={'quest'}/>
            </div>
        </div>
    );
}