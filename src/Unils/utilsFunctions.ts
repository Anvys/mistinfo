import {TCombineData, TResponseBody} from "../Types/ResourceTypes";
import {StatusCodes} from "../Types/Utils";

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
        default:
            return 99;
    }
}
export const checkError = (data: TResponseBody<TCombineData>): boolean => {
    if (data.status !== StatusCodes.Ok) data.msg.forEach(v => console.log(v))

    return data.status === StatusCodes.Ok
}