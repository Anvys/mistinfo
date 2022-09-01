import React, {useState} from 'react';
import styles from './LocationContent.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {
    getIsAddPosFieldActiveSelector,
    getIsLocationInitSelector,
    getLocationSelector
} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {LocationThunks} from "../../../redux/reducers/locationReducer";
import {TLocation, TWOid} from "../../../Types/ResourceTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {MyMap} from "../../Map/MyMap";
import {IconPicker} from "../../IconPicker/IconPicker";

type TProps = {};
export const LocationContent: React.FC<TProps> = (props) => {
    const isInit = useSelector(getIsLocationInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(LocationThunks.getAll())
    const data = useSelector(getLocationSelector);
    const [dataToAdd, setDataToAdd] = useState(null as null | TLocation)
    const dataAddHandler = (id: string) => {
        setDataToAdd(id.length ? data.find(v => v._id === id) || null : null)
    }
    const dataDelHandler = (id: string) => {
        dispatch(LocationThunks.deleteOne(id))
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

    const isMapActive = useSelector(getIsAddPosFieldActiveSelector)

    return (
        <div className={styles.contentBox}>
            <div className={styles.addFormBox}>
                <div className={styles.addDiv}>
                    {/*<LocationDataAdd data={dataToAdd} resetAddFormData={resetAddFormData}/>*/}
                    {GenDataAdd({
                        data: dataToAdd,
                        resetAddFormData,
                        initObj,
                        curThunks: LocationThunks,
                        dataName: 'location'
                    })}
                </div>
                {/*<IconPicker onIconPickHandler={onIconPickHandler}/>*/}
                {isMapActive && <MyMap wid={-1} hei={400}/>}
            </div>
            <div className={styles.dbField}>
                <Outlet/>
                <DataView data={data} dataAddHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}