import React, {useState} from 'react';
import styles from './GatherPointContent.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {
    getGatherPointSelector,
    getIsAddPosFieldActiveSelector,
    getIsLocationInitSelector
} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {LocationThunks} from "../../../redux/reducers/locationReducer";
import {TGatherPoint, TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {MyMap} from "../../Map/MyMap";
import {GatherPointThunks} from "../../../redux/reducers/gatherPointReducer";
import {FieldDrop} from "../../DataAdd/Fields/FieldDrop";

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
        name: '',
        icon: '',

        type: 'Mining',
        loot:'',
        // drop: [],
        count: 0,
        cooldown: 0,
        pos: {x: 0, y: 0},
        region: '',
        translate: {En: '', Ru: '', Fr: ''},
        notes:[],
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
                        curThunks: GatherPointThunks,
                        dataName: 'gatherpoint'
                    })}
                </div>
                {isMapActive && <MyMap wid={-1} hei={400}/>}
            </div>

            <div className={styles.dbField}>
                <Outlet/>
                <DataView data={data} dataAddHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}