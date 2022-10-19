import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getIsLocationInitSelector, getRegionSelector} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {RegionThunks} from "../../../redux/reducers/regionReducer";
import {TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {MapSlice} from "../../../redux/reducers/mapReducer";
import {TRegion} from "../../../Types/MainEntities";
import {initCommonFields} from "../contentUtils";

type TProps = {};
export const RegionContent: React.FC<TProps> = (props) => {
    const isInit = useSelector(getIsLocationInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(RegionThunks.getAll())
    const data = useSelector(getRegionSelector);
    const [dataToAdd, setDataToAdd] = useState(null as null | TRegion)
    const dataEditHandler = (id: string) => {
        const findres = data.find(v => v._id === id) || null
        setDataToAdd(id.length ? findres : null)
        if (findres !== null) dispatch(MapSlice.actions.setBounds(findres.bound))

    }
    const dataDelHandler = (id: string) => {
        dispatch(RegionThunks.deleteOne(id))
    }
    const resetAddFormData = () => {
        dispatch(MapSlice.actions.setBounds([]))
        dispatch(MapSlice.actions.setIsAddPosFieldActive(false))
        dispatch(MapSlice.actions.setIsAddBoundsActive(false))
        setDataToAdd(null)
    }
    const initObj: TWOid<TRegion> = {
        terrain: 'Forest',
        terrainReq: 0,
        bound: [],
        pos: {x: 0, y: 0},
        ...initCommonFields
    }
    // const isMapActive = useSelector(getIsAddPosFieldActiveSelector)
    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                {GenDataAdd({
                    data: dataToAdd,
                    resetAddFormData,
                    initObj,
                    curThunks: RegionThunks,
                    dataName: 'region'
                })}
            </div>
            <div className={styles.dbField}>
                <DataView data={data} dataEditHandler={dataEditHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}