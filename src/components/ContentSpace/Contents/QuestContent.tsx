import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getIsQuestInitSelector, getQuestSelector} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {QuestThunks} from "../../../redux/reducers/questReducer";
import {TQuest} from "../../../Types/MainEntities";
import {initCommonFields} from "../contentUtils";

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
    }
    const dataDelHandler = (id: string) => {
        dispatch(QuestThunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const initObj: TWOid<TQuest> = {
        type: 'Quest',
        availableAfter: [],
        startAt: 'auto',
        endAt: 'auto',
        qStages: [],
        loot: '--No loot--',
        ...initCommonFields
    }
    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                {GenDataAdd({
                    data: dataToAdd,
                    resetAddFormData,
                    initObj,
                    curThunks: QuestThunks,
                    dataName: 'quest'
                })}
            </div>
            <div className={styles.dbField}>
                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}
                          dataName={'quest'}/>
            </div>
        </div>
    );
}