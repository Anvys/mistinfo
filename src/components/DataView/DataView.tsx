import React, {useState} from 'react';
import {DataViewTable} from "./DataViewTable/DataViewTable";
import {
    getAbilityStr, getDataObjStr,
    getMapKeys,
    getRecipePartStr,
    getStageRequireStr,
    sortDataMapKeys,
    sortStrKeys
} from "../../Unils/utilsFunctions";
import {
    TCombineData,
    TDrop,
    TDropTypes,
    TPrimKeys,
    TQuestItemPosition,
    TSubKeys,
    TTranslateLang
} from "../../Types/CommonTypes";
import {useSelector} from "react-redux";
import {AuthSelectors} from "../../redux/dataSelectors";
import {useAppDispatch} from "../../redux/store";
import {MapSlice} from "../../redux/reducers/mapReducer";
import {log} from "util";

// function DataViewTest<T>(props: React.PropsWithChildren<TProps<T>>) {
//
//     return <span>Some component logic</span>;
// }


type TProps<T> = {
    data: Array<T>
    dataEditHandler: (id: string) => void
    dataDelHandler: (id: string) => void
    isMod?: boolean
    lang?: TTranslateLang
    isAddTable?: boolean
    dataName?: string
};
export const DataView = <T extends TCombineData>(props: React.PropsWithChildren<TProps<T>>) => {
    const isMod = useSelector(AuthSelectors.isInit)
    const dispatch = useAppDispatch()
    const {data, dataEditHandler, dataDelHandler} = props;
    const isAddTable = props.isAddTable === undefined ? false : props.isMod
    // const isMod = props.isMod === undefined ? false : props.isMod
    const [dataOnEdit, setDataOnEdit] = useState<null | { [key: string]: any }>(null)
    if (!data || !data.length) return <>empty bd</>
    type k1 = TPrimKeys<T>
    type k2 = TSubKeys<T>

    const dataKeys = getMapKeys(data[0])
    dataKeys.get('primary')?.sort(sortStrKeys)
    if (isAddTable) {
        dataKeys.set('translate', dataKeys.get('translate')?.filter(v => v === props.lang) as Array<string>)
    }
    const sortedDataKeys = sortDataMapKeys(dataKeys)

    // console.log(data)
    const dataValues = data.map(dataVal => {
        let sortedRow: Array<any> = [dataVal['_id']];
        sortedDataKeys.forEach((sKey) => dataKeys.get(sKey)?.forEach((dKey) => {
            // console.log(`sKey=${sKey}`)
            switch (sKey) {
                case 'loot': {
                    const loot = dataVal[sKey as k1]// as Array<TDrop<TDropTypes>>
                    if (Array.isArray(loot)) {
                        sortedRow.push(loot.map((drop, i) => `${drop.type}:${drop.name}   x${drop.count}(${drop.chance}%)${i < loot.length - 1 ? '\n' : ''}`))
                    }
                    // sortedRow.push(`${drop.type}:${drop.name} x${drop.count} ~${drop.chance}%`)
                    break
                }
                case 'bound': {
                    const data = dataVal[sKey as k1]// as Array<TDrop<TDropTypes>>
                    if (Array.isArray(data)) {
                        sortedRow.push(data.length)
                    }
                    // sortedRow.push(`${drop.type}:${drop.name} x${drop.count} ~${drop.chance}%`)
                    break
                }
                case 'abilities': {
                    const abi = dataVal[sKey as k1]// as Array<TDrop<TDropTypes>>
                    if (Array.isArray(abi)) {
                        sortedRow.push(abi.map((v, i) => `${getAbilityStr(v)}${i < abi.length - 1 ? '\n' : ''}`))
                    }
                    // sortedRow.push(`${drop.type}:${drop.name} x${drop.count} ~${drop.chance}%`)
                    break
                }
                case 'parts': {
                    const data = dataVal[sKey as k1]// as Array<TDrop<TDropTypes>>
                    if (Array.isArray(data)) {
                        sortedRow.push(data.map((v, i) => `${getRecipePartStr(v)}${i < data.length - 1 ? '\n' : ''}`))
                    }
                    break
                }
                case 'evoQuests': {
                    const data = dataVal[sKey as k1]// as Array<TDrop<TDropTypes>>
                    if (Array.isArray(data)) {
                        sortedRow.push(data.map((v, i) => `${v}${i < data.length - 1 ? '\n' : ''}`))
                    }
                    break
                }
                case 'posQuestItem': {
                    const data = dataVal[sKey as k1] as unknown as TQuestItemPosition
                    dKey === 'type' && sortedRow.push(data.type)
                    dKey === 'Source' && sortedRow.push(getDataObjStr('posQuestItem', data))
                    break
                }
                case 'skills':
                    sortedRow.push(getDataObjStr('skills', dataVal[sKey as k1]))
                    break
                case 'stages': {
                    const stages = dataVal[sKey as k1]// as Array<TDrop<TDropTypes>>
                    // console.log(`stages`)
                    if (Array.isArray(stages)) {
                        sortedRow.push(stages.map((stage, i) => {
                            // console.log(`-${stage.expr}-:№${stage.num}:${stage.name}:${stage.proc}%:${getStageRequireStr(stage.type, stage.require)}${i < stages.length - 1 ? '\n' : ''}`)
                            return `-${stage.expr}-:№${stage.num}:${stage.name}:${stage.proc}%:${getStageRequireStr(stage.type, stage.require)}${i < stages.length - 1 ? '\n' : ''}`
                        }))
                    }
                    // sortedRow.push(`${drop.type}:${drop.name} x${drop.count} ~${drop.chance}%`)
                    break
                }
                case 'primary':

                    // console.log(dataVal[dKey as k1])
                    sortedRow.push(dataVal[dKey as k1])
                    break
                case 'translate': {
                    const onClick:React.MouseEventHandler<HTMLSpanElement> = (e) =>{
                        e.stopPropagation()
                        e.preventDefault()
                        console.log(dKey)
                        dispatch(MapSlice.actions.setActiveQuest(dataVal['name']))
                        dispatch(MapSlice.actions.setIsActiveQuestMap(true))
                    }
                    if (props.dataName && props.dataName === 'quest') {
                        const trVal = dKey === 'En' ? dataVal['name'] : dataVal[sKey as k1][dKey as k2]
                        if (dKey === 'En') {
                            sortedRow.push(<span
                                onClick={onClick}>{`${trVal}`}</span>)
                        }
                        else {
                            // sortedRow.push(<span
                            //     onClick={onClick}>{`${trVal}`}</span>)
                            sortedRow.push(trVal)
                        }
                    } else {
                        if (dKey === 'En') sortedRow.push(dataVal['name'])
                        else sortedRow.push(dataVal[sKey as k1][dKey as k2])
                    }
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
    // console.log(dataValues)
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
                dataEditHandler={dataEditHandler}
                dataDelHandler={dataDelHandler}
                isMod={isMod}
                lang={props.lang}
            />
        </>

    )
}