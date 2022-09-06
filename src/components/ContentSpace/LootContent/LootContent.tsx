import React, {useState} from 'react';
import styles from './LootContent.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {
    getIsLootInitSelector,
    getIsNpcInitSelector, getLootSelector,
    getMaterialsSelector,
    getNpcSelector
} from "../../../redux/dataSelectors";
import {NpcThunks} from "../../../redux/reducers/npcReducer";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TLoot, TNpc, TRegion, TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {FieldDrop} from "../../DataAdd/Fields/FieldDrop";
import {LootThunks} from "../../../redux/reducers/lootReducer";
import {LootDataAdd} from "../../DataAdd/LootDataAdd";
import {RegionThunks} from "../../../redux/reducers/regionReducer";

type TProps = {};
export const LootContent: React.FC<TProps> = (props) => {
    const isInit = useSelector(getIsLootInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(LootThunks.getAll())
    const data = useSelector(getLootSelector);
    const [dataToAdd, setDataToAdd] = useState(null as null | TLoot)

    const initObj = {
        name: '',
        loot: [],
        notes: [],
        translate: {En: '', Fr: '', Ru: ''},
    } as TWOid<TLoot>

    const dataAddHandler = (id: string) =>{
        setDataToAdd(id.length ? data.find(v=>v._id===id) || null : null)
    }
    const dataDelHandler = (id: string) => {
        dispatch(LootThunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                {
                    GenDataAdd({
                        data: dataToAdd,
                        resetAddFormData,
                        initObj,
                        curThunks: LootThunks,
                        dataName: 'loot'
                    })
                }
                {/*<LootDataAdd data={null} resetAddFormData={()=>null}/>*/}
            </div>
            <div className={styles.dbField}>
                <Outlet/>
                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>

            </div>
        </div>
    );
}