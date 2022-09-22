import React, {useState} from 'react';
import {DataViewTable, DataViewTable2} from "./DataViewTable/DataViewTable";
import {
    getAbilityStr,
    getDataObjStr,
    getMapKeys,
    getRecipePartStr,
    getStageRequireStr,
    sortDataMapKeys,
    sortStrKeys
} from "../../Unils/utilsFunctions";
import {TBonus, TCombineData, TPrimKeys, TQuestItemPosition, TSubKeys, TTranslateLang} from "../../Types/CommonTypes";
import {useSelector} from "react-redux";
import {AuthSelectors} from "../../redux/dataSelectors";
import {useAppDispatch} from "../../redux/store";
import {MapSlice} from "../../redux/reducers/mapReducer";

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
                case 'content': {
                    const data = dataVal[sKey as k1]// as Array<TDrop<TDropTypes>>
                    if (Array.isArray(data)) sortedRow.push(getDataObjStr(sKey, data))
                    break
                }
                case 'loot': {
                    const loot = dataVal[sKey as k1]// as Array<TDrop<TDropTypes>>
                    if (Array.isArray(loot)) {
                        sortedRow.push(loot.map((drop, i) => `${drop.type}:${drop.name}   x${drop.countMin}${drop.countMax <= drop.countMin ? '' : `-${drop.countMax}`}(${drop.chance}%)${i < loot.length - 1 ? '\n' : ''}`))
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
                    const onClick: React.MouseEventHandler<HTMLSpanElement> = (e) => {
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
                        } else {
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


const getDataWeight = (key: string) => {
    switch (key) {
        case 'icon':
            return 0
        case 'name':
            return 1
        case 'primary':
            return 50
        case 'obj':
            return 98
        case 'translate':
            return 99

        default:
            return 50
    }
}
//Sorting function for data entries => sorting columns for table
const dataEntriesSort: (a: [string, any], b: [string, any]) => number = (a, b) => {
    const wA = getDataWeight(typeof a[1] === 'object' ? 'obj' : a[0])
    const wB = getDataWeight(typeof b[1] === 'object' ? 'obj' : b[0])
    return wA - wB
}

const getDataViewTdStr = (key: string, data: any): [Array<string>, Array<string>] => {
    if (typeof data === 'object') {
        const dataEntries = Object.entries(data)
        switch (key) {
            case 'translate' :
            case 'pos':
            case 'attributes' :
                return [[...dataEntries.map(v => v[0])], [...dataEntries.map(v => v[1])] as Array<string>]
            case 'notes':
                return [[key], data.length === 0 ? [`-`] : [data.map((v: string) => `${v}\n`).join('')]]
            case 'skills':
                return [[key], [data.length === 0 ? `-`
                    : data.map((v: TBonus, i: number) =>
                        `${v.skill}: ${v.count}${i < data.length - 1 ? '\n' : ''}`)]]
            default:
                return [[key], ['error']]
        }
    } else {
        switch (key) {
            case 'quest':
                return [[key], [data.length ? data : '-']]
            default:
                return [[key], [data]]
        }

    }

}
export const getTableTdKey = (key: string): string => {
    switch (key) {
        case 'exploreReq':
            return 'Explore'
        case 'craftDifficulty':
            return 'Craft'
        case 'gatherDifficulty':
            return 'Gather'
        case 'goldCost':
            return 'Gold'
        case 'attributes':
            return 'Attributes'
        // case 'durability': return 'dura'
        default:
            return toUpperFirstLetterCase(key.length > 6 ? `${key.substring(0, 6)}.` : key)
    }
}
export const toUpperFirstLetterCase = (str: string): string => {
    return str.length > 0 ? str.split('').map((v, i) => i === 0 ? v.toUpperCase() : v).join('') : ''
}
export const ignoredFields = ['_id', '__v', 'translate']
// export const DataView2 = <T extends TCombineData>(props: React.PropsWithChildren<TProps<T>>) =>{

export type TDataViewObj = {
    keys1: Array<[string, number]>
    keys2: Array<[string, number]>
    values: Array<Array<string>>
}
export const getDataView = (data: Array<TCombineData>, lang: TTranslateLang) => {
    console.log(`------------dw2-----------`)
    // const {data} = props
    if (data.length === 0) return null
    const dataEntries = [...Object.entries(data[0]).sort(dataEntriesSort)]
    // console.log(Object.entries(data[0]))
    const _dataView: TDataViewObj = {
        keys1: [],
        keys2: [],
        values: [],
    }
    dataEntries.forEach(([key, value], index) => {
        if (ignoredFields.includes(key)) return
        // if object - add keys in 2 rows else add as simple
        if (typeof value === 'object') {
            _dataView.keys1.push([key, (Array.isArray(value) ? 1 : Object.keys(value).length)])
            const [valueKeys, valueData] = getDataViewTdStr(key, value)
            // console.log(`---key: ${key}`)
            // console.log(valueData)
            valueKeys.forEach((k2, i2) => {
                _dataView.keys2.push([k2, 1])
            })
        } else {
            _dataView.keys1.push([key, 1])
            _dataView.keys2.push([key, 1])
        }
    })
    data.forEach((val, index) => {
        let newValues: Array<string> = []
        Object.entries(val).sort(dataEntriesSort).forEach(([key, value]) => {
            if (ignoredFields.includes(key)) return
            const [valueKeys, valueData] = getDataViewTdStr(key, key === 'name'
                ? val.translate[lang] === '' ? val.translate.En : val.translate[lang]
                : value)
            newValues = [...newValues, ...valueData]
        })
        _dataView.values.push(newValues)
    })
    // console.log(data[0])
    // console.log(_dataView)
    return _dataView
}
