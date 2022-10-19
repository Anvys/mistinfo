import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getGatherPointSelector, getIsLocationInitSelector} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {LocationThunks} from "../../../redux/reducers/locationReducer";
import {NO_LOOT, TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {GatherPointThunks} from "../../../redux/reducers/gatherPointReducer";
import {TGatherPoint} from "../../../Types/MainEntities";
import {initCommonFields} from "../contentUtils";

type TProps = {};
export const GatherPointContent: React.FC<TProps> = (props) => {
    const isInit = useSelector(getIsLocationInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(LocationThunks.getAll())
    const data = useSelector(getGatherPointSelector);
    const [dataToAdd, setDataToAdd] = useState(null as null | TGatherPoint)
    const dataAddHandler = (id: string) => {
        setDataToAdd(id.length ? data.find(v => v._id === id) || null : null)
    }
    const dataDelHandler = (id: string) => {
        dispatch(GatherPointThunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const initObj: TWOid<TGatherPoint> = {
        icon: '',
        type: 'Mining',
        loot: NO_LOOT,
        // drop: [],
        count: 0,
        cooldown: 0,
        pos: {x: 0, y: 0},
        region: '',
        ...initCommonFields
    }
    return (
        <div className={styles.contentBox}>
            <div className={styles.addFormBox}>
                <div className={styles.addDiv}>
                    {/*<LocationDataAdd data={dataToAdd} resetAddFormData={resetAddFormData}/>*/}
                    {GenDataAdd({
                        data: dataToAdd,
                        resetAddFormData,
                        initObj,
                        curThunks: GatherPointThunks,
                        dataName: 'gatherpoint'
                    })}
                </div>
                {/*{isMapActive && <MyMap wid={-1} hei={400}/>}*/}
            </div>
            <div className={styles.dbField}>
                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    )
}