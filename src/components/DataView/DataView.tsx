import React, {useState} from 'react';
import styles from './DataView.module.css';
import {DataViewTable} from "./DataViewTable/DataViewTable";
import {getMapKeys, sortDataMapKeys, sortStrKeys} from "../../Unils/utilsFunctions";
import {DataAdd} from "../DataAdd/DataAdd";
import {TCombineData, TComponents, TMaterials} from "../../Types/ResourceTypes";

// function DataViewTest<T>(props: React.PropsWithChildren<TProps<T>>) {
//
//     return <span>Some component logic</span>;
// }

type KeysOfUnion<T> = T extends T ? keyof T : never;
type TPrimKeys<T> = keyof T
type TSubKeys<T> =  KeysOfUnion<T[keyof T]>



type TProps<T> = { data: Array<T> };
export const DataView = <T extends TCombineData>(props: React.PropsWithChildren<TProps<T>>) => {
    const {data} = props;
    type k1 = TPrimKeys<T>
    type k2 = TSubKeys<T>

    const dataKeys = getMapKeys(data[0])
    dataKeys.get('primary')?.sort(sortStrKeys)
    const sortedDataKeys = sortDataMapKeys(dataKeys)
    const dataValues = data.map(dataVal => {
        let sortedRow: Array<any> = [dataVal['_id']];
        sortedDataKeys.forEach((sKey) => dataKeys.get(sKey)?.forEach((dKey) => {
            sortedRow.push(sKey === 'primary' ? dataVal[dKey as k1] : (sKey === 'translate' && dKey === 'En') ? dataVal['name'] : dataVal[sKey as k1][dKey as k2])
        }))
        return sortedRow
    })
    console.log(dataValues)
    const [dataOnEdit, setDataOnEdit] = useState<null | {[key: string]: any }>(null)
    const edithandler = (id: string) =>{
        console.log(`handle ${id}`)
        const result = data.find(v=>v._id === id);
        console.log(result)
        if(result) setDataOnEdit(result)
    }
    return (
        <>
            <DataAdd dataKeys={dataKeys} sortedDataKeys={sortedDataKeys} data={dataOnEdit}/>
            <DataViewTable dataKeys={dataKeys} sortedDataKeys={sortedDataKeys} dataValues={dataValues} edithandler={edithandler}/>
        </>

    )
}