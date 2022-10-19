import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {MonsterSelectors} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {MonsterThunks} from "../../../redux/reducers/monsterReducer";
import {TMonster} from "../../../Types/MainEntities";
import {initCommonFields} from "../contentUtils";

type TProps = {};
export const MonsterContent: React.FC<TProps> = (props) => {
    const isInit = useSelector(MonsterSelectors.isInit)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(MonsterThunks.getAll())
    const data = useSelector(MonsterSelectors.getData);
    const [dataToAdd, setDataToAdd] = useState(null as null | TMonster)
    const dataAddHandler = (id: string) => {
        const temp = id.length ? data.find(v => v._id === id) || null : null
        setDataToAdd(temp)
    }
    const dataDelHandler = (id: string) => {
        dispatch(MonsterThunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const newDefName = `New Monster ${data.length + 1}`
    const initObj: TWOid<TMonster> = {
        type: 'Monster',
        level: 1,
        life: 0,
        stamina: 0,
        attack: 0,
        armor: 0,
        abilities: [],
        loot: '--No loot--',
        region: '',
        icon: '',
        ...initCommonFields
    }
    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                {GenDataAdd({
                    data: dataToAdd,
                    resetAddFormData,
                    initObj,
                    curThunks: MonsterThunks,
                    dataName: 'monster'
                })}
            </div>
            <div className={styles.dbField}>
                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}