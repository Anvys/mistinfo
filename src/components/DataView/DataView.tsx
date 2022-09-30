import React from 'react';
import {DataViewTable2} from "./DataViewTable/DataViewTable";
import {TCombineData, TTranslateLang} from "../../Types/CommonTypes";
import {dataEntriesSort, getDataViewTdStr, getKeysCount, ignoredFields, keysToChangeView} from "./SortingAndViewUtils";

type TProps<T> = {
    data: Array<T>
    dataEditHandler: (id: string) => void
    dataDelHandler: (id: string) => void
    isMod?: boolean
    lang?: TTranslateLang
    isAddTable?: boolean
    dataName?: string
    type?: string
};
export const DataView = <T extends TCombineData>(props: React.PropsWithChildren<TProps<T>>) => {
    return <DataViewTable2 data={!!props.type ? props.data.filter((v: any) => v.type === props.type) : props.data}
                           dataEditHandler={props.dataEditHandler}
                           dataDelHandler={props.dataDelHandler}/>
}

// export const DataView2 = <T extends TCombineData>(props: React.PropsWithChildren<TProps<T>>) =>{

export type TDataViewObj = {
    keys1: Array<[string, number]>
    keys2: Array<[string, number]>
    values: Array<Array<string | JSX.Element>>
}
export const getDataView = (data: Array<TCombineData>, lang: TTranslateLang, path: string) => {
    // console.log(`------------dw2-----------`)
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
            _dataView.keys1.push([key, getKeysCount(key, value)])
            const [valueKeys, valueData] = getDataViewTdStr(key, value, path)
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
        let newValues: Array<string | JSX.Element> = []
        Object.entries(val).sort(dataEntriesSort).forEach(([key, value]) => {
            if (ignoredFields.includes(key)) return
            const [valueKeys, valueData] = getDataViewTdStr(key, key === 'name'
                ? val.translate[lang] === '' ? val.translate.En : val.translate[lang]
                : value, path)
            newValues = [...newValues, ...valueData]
        })
        _dataView.values.push(newValues)
    })
    // console.log(data[0])
    // console.log(_dataView)
    return _dataView
}
export const getDataViewAny = (data: Array<any>, lang: TTranslateLang, path: string = 'none') => {
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
            _dataView.keys1.push([key, getKeysCount(key, value)])
            const [valueKeys, valueData] = getDataViewTdStr(key, value, path)
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
        let newValues: Array<string | JSX.Element> = []
        Object.entries(val).sort(dataEntriesSort).forEach(([key, value]) => {
            if (ignoredFields.includes(key)) return
            const [valueKeys, valueData] = getDataViewTdStr(key, key === 'name'
                ? val.translate[lang] === '' ? val.translate.En : val.translate[lang]
                : value, path)
            newValues = [...newValues, ...valueData]
        })
        _dataView.values.push(newValues)
    })
    // console.log(data[0])
    // console.log(_dataView)
    return _dataView
}
