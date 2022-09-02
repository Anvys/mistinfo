import React, {useState} from 'react';
import styles from './StaminaElixir.module.css';
import {useDispatch, useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {
    getIsAddPosFieldActiveSelector,
    getIsStaminaElixirInitSelector,
    getStaminaElixirSelector
} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {DataView} from "../../DataView/DataView";
import {TStaminaElixir, TWOid} from "../../../Types/ResourceTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {MyMap} from "../../Map/MyMap";
import {StaminaElixirThunks} from "../../../redux/reducers/staminaElixirReducer";

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
        name: 'Vigor',
        icon: require('./../../../assets/icons/staminaElixir.png'),
        pos: {x: 0, y: 0},
        translate: {En: 'Vigor', Ru: 'Vigor', Fr: 'Vigor'},
        notes: [],
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
                        curThunks: StaminaElixirThunks,
                        dataName: 'staminaelixir'
                    })}
                </div>
                {/*<IconPicker onIconPickHandler={onIconPickHandler}/>*/}
                {isMapActive && <MyMap wid={-1} hei={400}/>}
            </div>
            <div className={styles.dbField}>
                <Outlet/>
                <DataView data={data} dataAddHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}