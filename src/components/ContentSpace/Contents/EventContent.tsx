import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getEventSelector, getIsEventInitSelector} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {EventThunks} from "../../../redux/reducers/eventReducer";
import {TEvent} from "../../../Types/MainEntities";
import {initCommonFields} from "../contentUtils";

type TProps = {};
export const EventContent: React.FC<TProps> = (props) => {
    const isInit = useSelector(getIsEventInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(EventThunks.getAll())
    const data = useSelector(getEventSelector);
    const [dataToAdd, setDataToAdd] = useState(null as null | TEvent)
    const dataAddHandler = (id: string) => {
        const temp = id.length ? data.find(v => v._id === id) || null : null
        setDataToAdd(temp)
    }
    const dataDelHandler = (id: string) => {
        dispatch(EventThunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const initObj: TWOid<TEvent> = {
        region: '',
        type: 'BlueFlag',
        icon: 'event_Flags/eventregionrandom',
        eStages: [],
        loot: '--No loot--',
        pos: {x: 0, y: 0},
        ...initCommonFields
    }
    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                {/*<RegionDataAdd data={dataToAdd} resetAddFormData={resetAddFormData}/>*/}
                {GenDataAdd({
                    data: dataToAdd,
                    resetAddFormData,
                    initObj,
                    curThunks: EventThunks,
                    dataName: 'event'
                })}
            </div>
            <div className={styles.dbField}>
                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}