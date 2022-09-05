import React, {useState} from 'react';
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

    const dropKeys = ['name', 'type', 'count', '%']

    const onDropAddHandler = (drop: TDrop<TDropTypes>) => {
        setLoot(actual => [...actual, drop])
    }
    const onDropDelHandler = (index: number) => {
        setLoot(actual => actual.filter((d, i) => i !== index))
    }
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
                                    {Object.values(dropValue).map((v, i) =>
                                        <td className={i === 0 ? tableStyles.nameTd : tableStyles.notEmptyTd}>{v}</td>)}
                                    <td>
                                        <button className={styles.deleteButton} onClick={() => onDropDelHandler(index)}/>
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