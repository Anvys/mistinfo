import React, {useState} from 'react';
import styles from './ComponentContent.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getComponentsSelector, getIsComponentsInitSelector} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {ComponentThunks} from "../../../redux/reducers/componentReducer";
import {DataView} from "../../DataView/DataView";
import {TComponent, TComponentType, TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";

type TProps = {};
export const ComponentContent: React.FC<TProps> = (props) => {

    const isInit = useSelector(getIsComponentsInitSelector)
    const dispatch = useDispatch<TAppDispatch>()
    if (!isInit) dispatch(ComponentThunks.getAll())
    const data = useSelector(getComponentsSelector);
    const [dataToAdd, setDataToAdd] = useState(null as null | TComponent)
    const dataAddHandler = (id: string) => {
        setDataToAdd(id.length ? data.find(v => v._id === id) || null : null)
    }
    const dataDelHandler = (id: string) => {
        dispatch(ComponentThunks.deleteOne(id))
    }
    const resetAddFormData = () => setDataToAdd(null)
    const initObj: TWOid<TComponent> = {
        name: '',
        icon: '',
        type: 'Plant' as TComponentType,
        durability: 0,
        craftDifficulty: 0,
        gatherDifficulty: 0,
        tier: 0,
        attributes: {
            Activator: 0,
            Binder: 0,
            Deteriorator: 0,
            Energizer: 0,
            Focuser: 0,
            Fortifier: 0,
            Putrefier: 0,
            Stimulator: 0,
            Toner: 0,
            Tranquilizer: 0,
            Elioam: 0,
            Frimam: 0,
            Hydram: 0,
            Lectram: 0,
            Lithram: 0,
            Magnam: 0,
            Psycham: 0,
            Pyram: 0,
            Stratam: 0,
        },
        goldCost: 0,
        encumbrance: 0,
        translate: {En: '', Fr: '', Ru: ''},
    }

    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                {/*<ComponentDataAdd data={dataToAdd} resetAddFormData={resetAddFormData}/>*/}
                {GenDataAdd({
                    data: dataToAdd,
                    resetAddFormData,
                    initObj,
                    curThunks: ComponentThunks,
                    dataName: 'component'
                })}
            </div>
            <div className={styles.dbField}>
                <DataView data={data} dataAddHandler={dataAddHandler} dataDelHandler={dataDelHandler}/>
            </div>
        </div>
    );
}