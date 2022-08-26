import {TCombineData, TResponseBody} from "../Types/ResourceTypes";
import {StatusCodes} from "../Types/Utils";
import {FormikProps} from "formik";
import {AddFields, selectFieldsOptions, TSelectFieldOptionsKeys} from "../components/DataAdd/AddFields";
import styles from "../components/DataAdd/DataAdd.module.css";

export const getDeepKeys = (obj: object, keys: Array<string> = []): Array<string> => {
    //todo только для объектов, не для массивов
    let deepKeys: Array<string> = [];
    keys = keys.concat(Object.entries(obj).filter(([key, value]) => {
        const tValue = typeof value;
        if (tValue !== 'object' && !Array.isArray(value) && key !== '__v' && key !== '_id' && key !== 'En') {
            return true
        } else {
            if (tValue === 'object' || Array.isArray(value)) {
                deepKeys = getDeepKeys(value, deepKeys)
            }
            return false
        }
    }).map(([key, value]) => {
        switch (key) {
            case 'Fr':
                return 'nameFr'
            case 'Ru':
                return 'nameRu'
            default:
                return key
        }
    }))
    return deepKeys.length ? keys.concat(deepKeys) : keys
}
export const getMapKeys = (data: any) => {
    const dataKeys = new Map<string, Array<string>>([['primary', []]])
    Object.entries(data).forEach(([key, value]) => {
        if (key !== '_id' && key !== '__v' && key !== 'name') {
            const tValue = typeof value
            if (tValue !== 'object') dataKeys.get('primary')?.push(key)
            else dataKeys.set(key, Object.keys(value as any))
        }
    })
    return dataKeys
}
export const sortDataMapKeys = (dataKeys: Map<string, Array<string>>): Array<string> => {
    let result: Array<string> = []
    if (dataKeys.get('translate')) result.push('translate')
    if (dataKeys.get('primary')) result.push('primary')
    dataKeys.forEach((v, k) => {
        if (k !== 'translate' && k !== 'primary') result.push(k)
    })
    return result
}
export const sortStrKeys = (a: string, b: string) => {
    return getWeight(a) - getWeight(b)
}
const getWeight = (str: string): number => {
    switch (str) {
        case 'name':
            return 1;
        case 'nameFr':
            return 1.1;
        case 'nameRu':
            return 1.2;
        case 'type':
            return 2;
        case 'tier':
            return 3;
        case 'translate':
            return 0.9;
        case 'attributes':
            return 100;
        case '':
            return 11;
        default:
            return 99;
    }
}
export const checkError = (data: TResponseBody<TCombineData>): boolean => {
    if (data.status !== StatusCodes.Ok) data.msg.forEach(v => console.log(v))

    return data.status === StatusCodes.Ok
}

export const getElements = (mapVal: object, prevKey: string, formik: FormikProps<any>, dataName: string) => {
    return Object.entries(mapVal).map(([key, value], i) => {
        // if (isSkipField(key)) return null
        // else {
        const elType = typeof value === 'number' ? 'number' : 'text'
        const prevK = prevKey.length ? `${prevKey}.` : prevKey
        const htmlId = `${prevK}${key}`
        const selArr = selectFieldsOptions[`${dataName}.${key}` as TSelectFieldOptionsKeys];
        if (selArr === undefined) {
            return AddFields.input(elType, value as string | number, formik.handleChange,
                htmlId, key, true, i, styles.fieldBox, styles.label, styles.inputText)
        } else {
            return AddFields.select(value as string | number, formik.handleChange,
                htmlId, key, i, selArr, styles.fieldBox, styles.label, styles.inputText)
        }

        // }
    });
}
export const getElement = (value: string | number, fullKey: string, formik: FormikProps<any>, dataName: string, index: number) => {
    // if (isSkipField(key)) return null
    const elType = typeof value === 'number' ? 'number' : 'text'
    const htmlId = `${fullKey}`
    const key = fullKey.split('.').pop()
    const selectPathToFind = key === 'type' ? `${dataName}.${fullKey}` : `${fullKey}`
    // console.log(`${selectPathToFind}`)
    const selArr = selectFieldsOptions[`${selectPathToFind}` as TSelectFieldOptionsKeys];
    if (selArr === undefined) {
        return AddFields.input(elType, value as string | number, formik.handleChange,
            htmlId, key, true, index, styles.fieldBox, styles.label, styles.inputText)
    } else {
        return AddFields.select(value as string | number, formik.handleChange,
            htmlId, key, index, selArr, styles.fieldBox, styles.label, styles.inputText)
    }
}
export const getDeepElements = (mapVal: object, prevKey: string, formik: FormikProps<any>, dataName: string, cssGroup:string = ''): JSX.Element => {
    return (
        <>
            {/*{prevKey}*/}
            {Object.entries(mapVal).sort((a, b) => getWeight(a[0]) - getWeight(b[0])).map(([key, value], i) => {
                if ((key === 'name' && !prevKey.length)|| key==='_id') { // @ts-ignore
                    return null
                }
                const curKey = prevKey.length ? `${prevKey}.${key}` : key;
                if (typeof value === 'object') return getDeepElements(value, curKey, formik, dataName)
                else {
                    return [getElement(value, curKey, formik, dataName, i)]
                }
            })}
        </>
    )

}