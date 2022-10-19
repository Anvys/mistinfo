import React, {useState} from 'react';
import styles from './../ContentSpace.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getIsStaminaElixirInitSelector, getStaminaElixirSelector} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {StaminaElixirThunks} from "../../../redux/reducers/staminaElixirReducer";
import {TStaminaElixir} from "../../../Types/MainEntities";
import {initCommonFields} from "../contentUtils";

type TProps = {};
export const StaminaElixirContent: React.FC<TProps> = (props) => {
    const isInit = useSelector(getIsStaminaElixirInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(StaminaElixirThunks.getAll())
    const data = useSelector(getStaminaElixirSelector);
    const [dataToAdd, setDataToAdd] = useState(null as null | TStaminaElixir)
    const dataAddHandler = (id: string) => {
        setDataToAdd(id.length ? data.find(v => v._id === id) || null : null)
    }
    const dataDelHandler = (id: string) => {
        dispatch(StaminaElixirThunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const initObj: TWOid<TStaminaElixir> = {
        icon: 'staminaElixir/icon',
        pos: {x: 0, y: 0},
        ...initCommonFields
    }
    return (
        <div className={styles.contentBox}>
            <div className={styles.addFormBox}>
                <div className={styles.addDiv}>
                    {GenDataAdd({
                        data: dataToAdd,
                        resetAddFormData,
                        initObj,
                        curThunks: StaminaElixirThunks,
                        dataName: 'staminaelixir'
                    })}
                </div>
            </div>
            <div className={styles.dbField}>
                <DataView data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}