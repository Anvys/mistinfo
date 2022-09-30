import React from 'react'
import styles from "./DataViewTable.module.css";
import {TDataViewObj} from "../DataView";
import fieldsStyles from "../../DataAdd/Fields/Fields.module.css";
import {iconUrlPicker} from "../../IconPicker/IconPicker";
import {getTableTdKey} from "../SortingAndViewUtils";
//import styles from './DataViewTableSimple.module.css'

type TProps = {
    dataView: TDataViewObj | null
}
export const DataViewTableSimple:React.FC<TProps> = (props) => {
    const {dataView} = props
    return (!dataView ? <>No data found</>
        :<>
            <div className={styles.vid}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {dataView.keys1.map(([key, num], i) => {
                                    const rowSpan = num > 1 ? 1 : dataView.keys2.some(([k2, num2]) => k2 === key) ? 2 : 1
                                    return <th className={styles.th1} rowSpan={rowSpan} colSpan={num} key={i} title={key}>
                                        {getTableTdKey(key, 4)}</th>
                                }
                            )}
                        </tr>
                        <tr>
                            {dataView.keys2.map(([key, num], i) => dataView.keys1.some(([k1, num1]) => k1 === key) ? null :
                                <th className={styles.th1} colSpan={num} key={i}
                                    title={key}>{getTableTdKey(key, 3)}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {dataView.values.map((val, index) =>
                            <tr className={styles.dataRow} key={index}>
                                {val.map((str, index2) => {
                                    if (index2 === 0 && dataView.keys1[0][0] === 'icon') {
                                        return (typeof str === 'string' ?
                                            <td key={index2}><img className={fieldsStyles.imgIcon} key={index2}
                                                                  src={iconUrlPicker(str.split('/')[0], str.split('/')[1])}/>
                                            </td> : null)
                                    }
                                    const stl = !(!str || str === '-') ? styles.notEmptyTd : styles.emptyTd
                                    return <td className={stl} key={index2}>
                                        {str}
                                    </td>
                                })}
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}