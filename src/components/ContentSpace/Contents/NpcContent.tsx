import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getIsNpcInitSelector, getNpcSelector} from "../../../redux/dataSelectors";
import {NpcThunks} from "../../../redux/reducers/npcReducer";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {initCommonFields} from "../contentUtils";
import {TNpc} from "../../../Types/MainEntities";

type TProps = {};
export const NpcContent: React.FC<TProps> = (props) => {
    const isInit = useSelector(getIsNpcInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(NpcThunks.getAll())
    const data = useSelector(getNpcSelector);
    const [dataToAdd, setDataToAdd] = useState(null as null | TNpc)
    const dataAddHandler = (id: string) => {
        setDataToAdd(id.length ? data.find(v => v._id === id) || null : null)
    }
    const dataDelHandler = (id: string) => {
        dispatch(NpcThunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const initObj: TWOid<TNpc> = {
        location: '',
        time: 'Always',
        ...initCommonFields
    }

    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                {GenDataAdd({
                    data: dataToAdd,
                    resetAddFormData,
                    initObj,
                    curThunks: NpcThunks,
                    dataName: 'npc'
                })}
            </div>
            <div className={styles.dbField}>
                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}