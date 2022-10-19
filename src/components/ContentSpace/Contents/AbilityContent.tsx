import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AbilitySelectors} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {AbilityThunks} from "../../../redux/reducers/abilityReducer";
import {TAbility} from "../../../Types/MainEntities";
import {initCommonFields} from "../contentUtils";

type TProps = {};
export const AbilityContent: React.FC<TProps> = (props) => {
    const isInit = useSelector(AbilitySelectors.isInit)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(AbilityThunks.getAll())
    const data = useSelector(AbilitySelectors.getData);
    const [dataToAdd, setDataToAdd] = useState(null as null | TAbility)
    const dataAddHandler = (id: string) => {
        const temp = id.length ? data.find(v => v._id === id) || null : null
        setDataToAdd(temp)
    }
    const dataDelHandler = (id: string) => {
        dispatch(AbilityThunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const newDefName = `New Ability ${data.length + 1}`
    const initObj: TWOid<TAbility> = {
        type: 'Passive',
        level: 1,
        stamina: 0,
        cd: 0,
        effect: '',
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
                    curThunks: AbilityThunks,
                    dataName: 'ability'
                })}
            </div>
            <div className={styles.dbField}>
                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}