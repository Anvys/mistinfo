import React, {useState} from 'react';
import styles from './DataView.module.css';
import {DataViewTable} from "./DataViewTable/DataViewTable";
import {getMapKeys, sortDataMapKeys, sortStrKeys} from "../../Unils/utilsFunctions";
import {DataAdd} from "../DataAdd/DataAdd";
import {TCombineData, TComponent, TMaterial, TPrimKeys, TSubKeys} from "../../Types/ResourceTypes";

// function DataViewTest<T>(props: React.PropsWithChildren<TProps<T>>) {
//
//     return <span>Some component logic</span>;
// }


type TProps<T> = {
    data: Array<T>
    dataAddHandler: (id: string) => void
};
export const DataView = <T extends TCombineData>(props: React.PropsWithChildren<TProps<T>>) => {
    const {data, dataAddHandler} = props;
    const [dataOnEdit, setDataOnEdit] = useState<null | { [key: string]: any }>(null)
    if (!data || !data.length) return <>empty bd</>
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

    const editHandler = (id: string) => {
        console.log(`handle ${id}`)
        const result = data.find(v => v._id === id);
        console.log(result)
        if (result) setDataOnEdit(result)
    }
    return (
        <>
            {/*<DataAdd dataKeys={dataKeys} sortedDataKeys={sortedDataKeys} data={dataOnEdit}/>*/}
            <DataViewTable
                dataKeys={dataKeys}
                sortedDataKeys={sortedDataKeys}
                dataValues={dataValues}
                dataAddHandler={dataAddHandler}
            />
        </>

    )
}