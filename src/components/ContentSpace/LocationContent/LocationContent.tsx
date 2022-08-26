import React, {useState} from 'react';
import styles from './LocationContent.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {getIsLocationInitSelector, getLocationSelector} from "../../../redux/dataSelectors";
import {NpcDataAdd} from "../../DataAdd/NpcDataAdd";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {LocationThunks} from "../../../redux/reducers/locationReducer";
import {LocationDataAdd} from "../../DataAdd/LocationDataAdd";
import {TLocation, TNpc, TWOid} from "../../../Types/ResourceTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {NpcThunks} from "../../../redux/reducers/npcReducer";

type TProps = {};
export const LocationContent:React.FC<TProps> = (props) => {
    const isInit = useSelector(getIsLocationInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if(!isInit)dispatch(LocationThunks.getAll())
    const data = useSelector(getLocationSelector);
    const [dataToAdd, setDataToAdd] = useState(null as null | TLocation)
    const dataAddHandler = (id: string) =>{
        setDataToAdd(id.length ? data.find(v=>v._id===id) || null : null)
    }
    const resetAddFormData = () => setDataToAdd(null)
    const initObj: TWOid<TLocation> = {
        name: '',
        exploreReq: 0,
        pos: {x: 0, y: 0},
        icon: '',
        region: '',
        translate: {En: '', Ru: '', Fr: ''},
    }
    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                {/*<LocationDataAdd data={dataToAdd} resetAddFormData={resetAddFormData}/>*/}
                {GenDataAdd({
                    data: dataToAdd,
                    resetAddFormData,
                    initObj,
                    curThunks: LocationThunks,
                    dataName: 'location'
                })}
            </div>
            <div className={styles.dbField}>
                <Outlet/>
                <DataView data={data} dataAddHandler={dataAddHandler}/>
            </div>
        </div>
    );
}