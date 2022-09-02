import React, {useState} from 'react';
import {DataViewTable} from "./DataViewTable/DataViewTable";
import {getMapKeys, sortDataMapKeys, sortStrKeys} from "../../Unils/utilsFunctions";
import {TCombineData, TDrop, TDropTypes, TPrimKeys, TSubKeys} from "../../Types/CommonTypes";

// function DataViewTest<T>(props: React.PropsWithChildren<TProps<T>>) {
//
//     return <span>Some component logic</span>;
// }


type TProps<T> = {
    data: Array<T>
    dataAddHandler: (id: string) => void
    dataDelHandler: (id: string) => void
};
export const DataView = <T extends TCombineData>(props: React.PropsWithChildren<TProps<T>>) => {
    const {data, dataAddHandler, dataDelHandler} = props;
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
            switch (sKey) {
                case 'loot': {
                    const loot = dataVal[sKey as k1]// as Array<TDrop<TDropTypes>>
                    if (Array.isArray(loot)) {
                        sortedRow.push(loot.map((drop, i) => `${drop.type}:${drop.name}   x${drop.count}(${drop.chance}%)${i < loot.length-1 ? '\n':''}`))
                    }
                    // sortedRow.push(`${drop.type}:${drop.name} x${drop.count} ~${drop.chance}%`)
                    break
                }
                case 'primary':
                    sortedRow.push(dataVal[sKey as k1])
                    break
                case 'translate': {
                    if (dKey === 'En') sortedRow.push(dataVal['name'])
                    else sortedRow.push(dataVal[sKey as k1][dKey as k2])
                    break
                }
                default:
                    sortedRow.push(dataVal[sKey as k1][dKey as k2])

            }
            // sortedRow.push(
            //     sKey === 'loot'
            //         ? dataVal[sKey as k1][dKey as k2]
            //         : sKey === 'primary'
            //             ? dataVal[dKey as k1]
            //             : (sKey === 'translate' && dKey === 'En')
            //                 ? dataVal['name']
            //                 : dataVal[sKey as k1][dKey as k2])
        }))
        return sortedRow
    })
    // console.log(data)
    // console.log(dataKeys)
    // console.log(sortedDataKeys)
    // console.log(dataValues)

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
                dataDelHandler={dataDelHandler}
            />
        </>

    )
}