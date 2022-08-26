import React, {useState} from 'react';
import styles from './NpcContent.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {getIsNpcInitSelector, getNpcSelector} from "../../../redux/dataSelectors";
import {NpcThunks} from "../../../redux/reducers/npcReducer";
import {NpcDataAdd} from "../../DataAdd/NpcDataAdd";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {LocationDataAdd} from "../../DataAdd/LocationDataAdd";
import {TMaterial, TNpc, TWOid} from "../../../Types/ResourceTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {ComponentThunks} from "../../../redux/reducers/componentReducer";

type TProps = {};
export const NpcContent:React.FC<TProps> = (props) => {
    const isInit = useSelector(getIsNpcInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if(!isInit)dispatch(NpcThunks.getAll())
    const data = useSelector(getNpcSelector);
    const [dataToAdd, setDataToAdd] = useState(null as null | TNpc)
    const dataAddHandler = (id: string) =>{
        setDataToAdd(id.length ? data.find(v=>v._id===id) || null : null)
    }
    const resetAddFormData = () => setDataToAdd(null)
    const initObj:TWOid<TNpc> = {
        name: '',
        location: '',
        time: '',
        translate: {En: '', Ru: '', Fr: ''},
    }

    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                {/*<LocationDataAdd data={null}/>*/}
                {/*<NpcDataAdd data={dataToAdd} resetAddFormData={resetAddFormData}/>*/}
                {GenDataAdd({
                    data: dataToAdd,
                    resetAddFormData,
                    initObj,
                    curThunks: NpcThunks,
                    dataName: 'npc'
                })}
            </div>
            <div className={styles.dbField}>
                <Outlet/>
                <DataView data={data} dataAddHandler={dataAddHandler}/>
            </div>
        </div>
    );
}