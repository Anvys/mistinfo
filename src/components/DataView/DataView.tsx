import React from 'react';
import styles from './DataView.module.css';
import {getMapKeys, sortDataMapKeys, sortStrKeys} from "../Material/MaterialView/MaterialView";
import {DataViewTable} from "./DataViewTable/DataViewTable";

type TProps = { data: Array<{ [key: string]: any }> };
export const DataView:React.FC<TProps> = ({data}) => {
    // type TDataKeys = Extract<keyof T, string>
    // const dataKeys: Array<string> = getDeepKeys(data).sort(sortStrKeys)
    const dataKeys = getMapKeys(data[0])
    dataKeys.get('primary')?.sort(sortStrKeys)
    const sortedDataKeys = sortDataMapKeys(dataKeys)
    const dataValues = data.map(dataVal => {
        let sortedRow: Array<any> = [dataVal['_id']];
        sortedDataKeys.forEach(sKey => dataKeys.get(sKey)?.forEach((dKey) => {
            sortedRow.push(sKey === 'primary' ? dataVal[dKey] : (sKey === 'translate' && dKey === 'En') ? dataVal['name'] : dataVal[sKey][dKey])
        }))
        return sortedRow
    })
    console.log(dataValues)
    return (
        <DataViewTable dataKeys={dataKeys} sortedDataKeys={sortedDataKeys} dataValues={dataValues}/>
    )
}