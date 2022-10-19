import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {
    getIsAddPosFieldActiveSelector,
    getIsMapObjectInitSelector,
    getMapObjectSelector
} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {MyMap} from "../../Map/MyMap";
import {MapObjectThunks} from "../../../redux/reducers/mapObjectReducer";
import {TMapObject} from "../../../Types/MainEntities";
import {initCommonFields} from "../contentUtils";

type TProps = {};
export const MapObjectContent: React.FC<TProps> = (props) => {
    const isInit = useSelector(getIsMapObjectInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(MapObjectThunks.getAll())
    const data = useSelector(getMapObjectSelector);
    const [dataToAdd, setDataToAdd] = useState(null as null | TMapObject)
    const dataAddHandler = (id: string) => {
        setDataToAdd(id.length ? data.find(v => v._id === id) || null : null)
    }
    const dataDelHandler = (id: string) => {
        dispatch(MapObjectThunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const initObj: TWOid<TMapObject> = {
        icon: '',
        pos: {x: 0, y: 0},
        ...initCommonFields
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
                        curThunks: MapObjectThunks,
                        dataName: 'mapobject'
                    })}
                </div>
                {/*<IconPicker onIconPickHandler={onIconPickHandler}/>*/}
                {isMapActive && <MyMap wid={-1} hei={400}/>}
            </div>
            <div className={styles.dbField}>
                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}