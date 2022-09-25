import React, {useState} from 'react';
import styles from './RegionContent.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {
    getIsAddPosFieldActiveSelector,
    getIsLocationInitSelector,
    getRegionSelector
} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {RegionThunks} from "../../../redux/reducers/regionReducer";
import {TRegion, TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {MyMap} from "../../Map/MyMap";
import {MapSlice} from "../../../redux/reducers/mapReducer";

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
        if(findres!==null) dispatch(MapSlice.actions.setBounds(findres.bound))

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
        name: '',
        terrain: 'Forest',
        terrainReq: 0,
        bound:[],
        pos: {x:0,y:0},
        translate: {En: '', Ru: '', Fr: ''},
        notes:[],
    }
    // const isMapActive = useSelector(getIsAddPosFieldActiveSelector)
    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                {/*<RegionDataAdd data={dataToAdd} resetAddFormData={resetAddFormData}/>*/}
                {GenDataAdd({
                    data: dataToAdd,
                    resetAddFormData,
                    initObj,
                    curThunks: RegionThunks,
                    dataName: 'region'
                })}
                {/*{isMapActive && <MyMap wid={-1} hei={400}/>}*/}
            </div>

            <div className={styles.dbField}>
                <Outlet/>
                <DataView data={data} dataEditHandler={dataEditHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}