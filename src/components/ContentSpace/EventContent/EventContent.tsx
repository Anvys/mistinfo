import React, {useState} from 'react';
import styles from './EventContent.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {getEventSelector, getIsEventInitSelector} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TEvent, TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {EventThunks} from "../../../redux/reducers/eventReducer";

type TProps = {};
export const EventContent: React.FC<TProps> = (props) => {
    const isInit = useSelector(getIsEventInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(EventThunks.getAll())
    const data = useSelector(getEventSelector);
    const [dataToAdd, setDataToAdd] = useState(null as null | TEvent)
    const dataAddHandler = (id: string) => {
        setDataToAdd(id.length ? data.find(v => v._id === id) || null : null)
    }
    const dataDelHandler = (id: string) => {
        dispatch(EventThunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const initObj: TWOid<TEvent> = {
        name: '',
        type: '',
        stages:[],
        pos: {x:0,y:0},
        translate: {En: '', Ru: '', Fr: ''},
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
                    curThunks: EventThunks,
                    dataName: 'event'
                })}
            </div>
            <div className={styles.dbField}>
                <Outlet/>
                <DataView data={data} dataAddHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}