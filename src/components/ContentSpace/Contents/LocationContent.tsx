import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getIsLocationInitSelector, getLocationSelector} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {LocationThunks} from "../../../redux/reducers/locationReducer";
import {TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {TLocation} from "../../../Types/MainEntities";
import {initCommonFields} from "../contentUtils";

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
        exploreReq: 0,
        quest: '',
        pos: {x: 0, y: 0},
        icon: '',
        region: '',
        moveTo: '',
        ...initCommonFields
    }

    // const isMapActive = useSelector(getIsAddPosFieldActiveSelector)

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
                {/*{isMapActive && <MyMap wid={-1} hei={400}/>}*/}
            </div>
            <div className={styles.dbField}>
                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}