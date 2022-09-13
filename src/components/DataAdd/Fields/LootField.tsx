import React, {useEffect, useState} from 'react';
import styles from './Fields.module.css';
import tableStyles from './../../DataView/DataViewTable/DataViewTable.module.css';

import {FieldDrop} from "./FieldDrop";
import {TDrop, TDropTypes} from "../../../Types/CommonTypes";
import {FormikProps} from "formik";

type TProps = {
    index: number,
    formik: FormikProps<any>
    dataName: string
};
export const LootField: React.FC<TProps> = (props) => {
    const {formik, index, dataName} = props
    const [loot, setLoot] = useState<Array<TDrop<TDropTypes>>>(() => formik.values.loot)

    const dropKeys = ['name', 'type', 'min', 'max','%']

    const onDropAddHandler = (drop: TDrop<TDropTypes>) => {
        formik.setFieldValue('loot', [...formik.values.loot, drop])
        // setLoot(actual => [...actual, drop])
    }
    const onDropDelHandler = (index: number) => {
        formik.setFieldValue('loot', formik.values.loot.filter((d:any, i: number) => i !== index))
        // setLoot(actual => actual.filter((d, i) => i !== index))
    }
    useEffect(()=>{
        setLoot(formik.values.loot)
    },[formik.values.loot])
    return (
        <div className={styles.divRow + ' ' + styles.border} key={index}>
            <FieldDrop index={0} onAddHandler={onDropAddHandler}/>
            <div className={tableStyles.vid}>
                <table className={tableStyles.table}>
                    <thead>
                        <tr className={tableStyles.headRow}><th colSpan={4}>LOOT</th></tr>
                        <tr className={tableStyles.headRow}>
                            {dropKeys.map((v, i) => <th className={tableStyles.th2}>{v}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {loot.length > 0 && loot.map((dropValue, index) =>
                                <tr className={tableStyles.dataRow} key={index}>
                                    {Object.entries(dropValue).map(([k,v], i) =>
                                        k==='_id'? null:<td className={i === 0 ? tableStyles.nameTd : tableStyles.notEmptyTd}>{v}</td>)}
                                    <td>
                                        <button type={'button'} className={styles.deleteButton} onClick={() => onDropDelHandler(index)}/>
                                    </td>
                                </tr>)
                            || <tr>
                                <td className={tableStyles.notEmptyTd} colSpan={4}>...add first drop</td>
                            </tr>}
                    </tbody>
                </table>
                {/*<button className={styles.addButton} type={'submit'}>SAVE</button>*/}
                {/*<button className={styles.addButton} type={'reset'} onClick={onClearHandler}>CLEAR</button>*/}
            </div>
        </div>
    );
}