import React, {useState} from 'react';
import styles from './MaterialContent.module.css';
import {useDispatch, useSelector} from "react-redux";
import {
    AuthSelectors,
    getIsMaterialsInitSelector,
    getMaterialsSelector,
    MaterialSelectors
} from "../../../redux/dataSelectors";
import {TAppDispatch} from "../../../redux/store";
import {Outlet} from "react-router-dom";
import {DataView} from "../../DataView/DataView";
import {MaterialSlice, MaterialThunks} from "../../../redux/reducers/materialReducer";
import {TMaterial, TMaterialType, TWOid} from "../../../Types/CommonTypes";
import {GenDataAdd} from "../../DataAdd/GenDataAdd";
import {DataViewTable2} from "../../DataView/DataViewTable/DataViewTable";

type TProps = {
    type?:TMaterialType
};
export const MaterialContent:React.FC<TProps> = React.memo((props) => {
    const dispatch = useDispatch<TAppDispatch>()
    const data = useSelector(getMaterialsSelector);
    const [dataToAdd, setDataToAdd] = useState(()=>null as null | TMaterial)
    const dataAddHandler = (id: string) => {
        setDataToAdd(id.length ? data.find(v => v._id === id) || null : null)
    }
    const resetAddFormData = () => setDataToAdd(null)
    const dataDelHandler = (id: string) => {
        dispatch(MaterialThunks.deleteOne(id))
    }
    const initObj: TWOid<TMaterial> = {
        name: '',
        icon: '',
        type: 'Bone' as TMaterialType,
        durability: 0,
        craftDifficulty: 0,
        gatherDifficulty: 0,
        tier: 0,
        attributes: {
            Absorbity: 0,
            Density: 0,
            Flexibility: 0,
            Hardness: 0,
            Lightness: 0,
            Purity: 0,
            Radiance: 0,
            Rigidity: 0,
        },
        goldCost: 0,
        encumbrance: 0,
        translate: {En: '',Fr:'', Ru:''}
    }

    return (
        <div className={styles.contentBox}>
            <div className={styles.nav}>
                {/*<MaterialDataAdd data={dataToAdd} resetAddFormData={resetAddFormData}/>*/}
                {GenDataAdd({
                    data: dataToAdd,
                    resetAddFormData,
                    initObj,
                    curThunks: MaterialThunks,
                    dataName: 'material',
                })}
            </div>
            <div className={styles.dbField}>
                <Outlet/>
                {/*<DataViewTable2 dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler} data={data}/>*/}
                <DataView type={props.type} data={data} dataEditHandler={dataAddHandler} dataDelHandler={dataDelHandler} />
            </div>
        </div>
    );
})