import React, {useState} from 'react';
import {useFormik} from "formik";
import {TDrop, TDropTypes, TLoot, TWOid} from "../../Types/ResourceTypes";
import {useDispatch} from "react-redux";
import {TAppDispatch} from "../../redux/store";
import {LocationThunks} from "../../redux/reducers/locationReducer";
import {AddDataForm} from "./AddDataForm";
import {LootThunks} from "../../redux/reducers/lootReducer";
import styles from "./Fields/Fields.module.css";
import {FieldDrop} from "./Fields/FieldDrop";
import {DataViewTable} from "../DataView/DataViewTable/DataViewTable";
// import styles from './NpcDataAdd.module.css';

const DATA_NAME = 'loot';
const isSkipField = (key: string): boolean => {
    return key === 'translate' || key === 'attribute' || key === 'name'
}
type TProps = {
    data: TLoot | null
    resetAddFormData: () => void
};
export const LootDataAdd: React.FC<TProps> = (props) => {
    const {data} = props
    const [dropArr, setDropArr] = useState<Array<TDrop<TDropTypes>>>([])
    const dispatch = useDispatch<TAppDispatch>();

    const dropKeys = dropArr[0] ? Object.keys(dropArr[0]) : ['type', 'name', 'count', 'chance']
    const initVal = data !== null ? data : {
        name: '',
        loot: [],
        notes: [],
        translate: {En: '', Fr: '', Ru: ''},
    } as TWOid<TLoot>
    const addLootFormik = useFormik({
        initialValues: initVal,
        enableReinitialize: true,
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true);
            const newLoot = {...addLootFormik.values, loot: dropArr, translate:{...addLootFormik.values.translate, En: addLootFormik.values.name}}
            if (dropArr.length === 0) console.log('Add some drop to loot')
            else {
                dispatch(LootThunks.addOne(newLoot))
                console.log(newLoot)
                addLootFormik.handleReset(1)
            }
            actions.setSubmitting(false);
        },
    })
    const onClearHandler = (e:any) =>{
        setDropArr([]);
        addLootFormik.handleReset(0);
    }
    const onDropAddHandler = (drop: TDrop<TDropTypes>) => {
        setDropArr([...dropArr, drop])
    }
    const onDropDelHandler = (index: number) => {
        setDropArr(dropArr.filter((v,i)=>i!==index))
    }
    const onDropEditHandler = (index: number) => {

        // setDropArr(dropArr.filter((v,i)=>i!==index))
    }
    return (
        <div className={styles.mainLootDiv}>
            <div className={styles.lootDropBlock}>
                {data === null ? 'New Loot' : `Update ${data.name}/${data._id}`}
                <FieldDrop index={0} onAddHandler={onDropAddHandler}/>
            </div>
            <div>
                <form onSubmit={addLootFormik.handleSubmit}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th colSpan={dropKeys.length - 1}>
                                    {/*<span></span>*/}
                                    {`Loot [ `}
                                    <input className={styles.inputStr} type={'text'} name={'name'}
                                           value={addLootFormik.values.name}
                                           onChange={addLootFormik.handleChange} required autoComplete={'off'}
                                           placeholder={'type loot name here'}/>
                                    {` ] contain:`}
                                    {/*{`Loot [${addDropFormik.values.name}] contain:`}*/}
                                </th>
                            </tr>
                            <tr className={styles.tableRow}>
                                {dropKeys.map((v, i) => <th className={styles.tableCell}>{v}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {dropArr.length > 0 && dropArr.map((dropValue, index) =>
                                    <tr className={styles.tableRow} key={index}>
                                        {Object.values(dropValue).map((v, i) =>
                                            <td className={styles.tableCell}>{v}</td>)}
                                        <td><button className={styles.deleteButton} onClick={()=>onDropDelHandler(index)}/></td>
                                    </tr>)
                                || <tr>
                                    <td colSpan={4}>...add first drop</td>
                                </tr>}
                        </tbody>
                    </table>
                    <button className={styles.addButton} type={'submit'}>SAVE</button>
                    <button className={styles.addButton} type={'reset'} onClick={onClearHandler}>CLEAR</button>
                </form>

            </div>
            {/*<DataViewTable*/}
            {/*    dataKeys={new Map<string, Array<string>>(dropKeys)}*/}
            {/*    sortedDataKeys={dropKeys}*/}
            {/*    dataValues={dataValues}*/}
            {/*    dataAddHandler={dataAddHandler}*/}
            {/*    dataDelHandler={dataDelHandler}*/}
            {/*/>*/}

        </div>
    );
}

