import {
    TAbility,
    TCombineData,
    TMapPosition,
    TQuestStage, TRecipePart,
    TResponseBody,
    TStage,
    TStageRequire
} from "../Types/CommonTypes";
import {selectFieldsOptions, StatusCodes} from "../Types/Utils";
import {FormikProps} from "formik";
import {AddFields, TSelectFieldOptionsKeys} from "../components/DataAdd/AddFields";
import styles from "../components/DataAdd/DataAdd.module.css";
import {useSelector} from "react-redux";
import {getMarkerForAddPosSelector, getMaterialsSelector} from "../redux/dataSelectors";

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
    Object.entries(data).forEach((dataObj: any) => {
        const [key, value] = dataObj;
        if (key !== '_id' && key !== '__v' && key !== 'name'&& key !== 'notes'&& key !== 'drop') {
            const tValue = typeof value
            if (tValue !== 'object') dataKeys.get('primary')?.push(key)
            else {
                switch (key) {
                    case 'loot':
                        dataKeys.set(key, ['Drops'])//...value.map((v:object,i:number)=>`${i}`)
                        break;
                    case 'stages':
                        dataKeys.set(key, ['stages'])//...value.map((v:object,i:number)=>`${i}`)
                        break;
                    case 'abilities':
                        dataKeys.set(key, ['abilities'])//...value.map((v:object,i:number)=>`${i}`)
                        break;
                    default:
                        dataKeys.set(key, Object.keys(value as any))
                        break;
                }

            }
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
export const getWeight = (str: string): number => {
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
        case 'loot':
            return 101;
        case 'notes':
            return 111;
        case 'icon':
            return 99;
        case 'pos':
            return 98;
        case '':
            return 11;
        default:
            return 4;
    }
}
export const checkError = (data: TResponseBody<TCombineData>): boolean => {
    if (data.status !== StatusCodes.Ok) data.msg.forEach(v => console.log(v))

    return data.status === StatusCodes.Ok
}
export const getStageRequireStr = (type: string, req: TStageRequire) =>{
    switch (type) {
        case 'Adventure':
            return `${req.adventure}: ${req.count}`
        default: return `DefaultStageReqStr`
    }
}
export const getStagesStr = (stages: Array<TStage>):string =>{
    return stages.map((stage,i)=>
        `-${stage.expr}-:№${stage.num}:${stage.name}:${stage.proc}%:${getStageRequireStr(stage.type, stage.require)}${i < stages.length - 1 ? '\n' : ''}`).join('')
}
export const getStageStr = (stage: TStage | TQuestStage):string =>{
    return `-${stage.expr}-:№${stage.num}:${stage.name}:${stage.proc}%:${getStageRequireStr(stage.type, stage.require)}`
}
export const getAbilityStr = (abi: TAbility) => {
    return `${abi.name}: ${abi.level} lvl (${abi.type}) ${abi.cd>0?`[cd ${abi.cd} turn]`: `[no cd]`} ${abi.stamina>0?`cost ${abi.stamina}mp`:''} [${abi.effect}]`
}
export const getRecipePartStr = (rec: TRecipePart) => {
    return `[${rec.name}] ${rec.component}: ${rec.count}`
}
// export const getElements = (mapVal: object, prevKey: string, formik: FormikProps<any>, dataName: string) => {
//     return Object.entries(mapVal).map(([key, value], i) => {
//         // if (isSkipField(key)) return null
//         // else {
//         const elType = typeof value === 'number' ? 'number' : 'text'
//         const prevK = prevKey.length ? `${prevKey}.` : prevKey
//         const htmlId = `${prevK}${key}`
//         const selArr = selectFieldsOptions[`${dataName}.${key}` as TSelectFieldOptionsKeys];
//         if (selArr === undefined) {
//             return AddFields.input(elType, value as string | number, formik,
//                 htmlId, key, true, i)
//         } else {
//             return AddFields.select(selArr,value as string | number, formik,
//                 htmlId, key, i)
//         }
//
//         // }
//     });
// }
// export const getElement = (value: string | number, fullKey: string, formik: FormikProps<any>, dataName: string, index: number) => {
//     // if (isSkipField(key)) return null
//     const elType = typeof value === 'number' ? 'number' : 'text'
//     const htmlId = `${fullKey}`
//     const key = fullKey.split('.').pop()
//     if(dataName==='gatherpoint' && key==='En' ){
//         return AddFields.gathertypename(formik.values.type,formik, formik.handleChange,
//             htmlId, key, index, styles.fieldBox, styles.label, styles.inputText)
//     }
//     if(key==='icon' ){
//         if(dataName==='staminaelixir')return AddFields.icon(formik, index, true)
//         return AddFields.icon(formik, index)
//     }
//     // if(dataName==='gatherpoint' && key==='type' )return null
//     const selectPathToFind = key === 'type' ? `${dataName}.${fullKey}` : `${fullKey}`
//     // console.log(`${selectPathToFind}`)
//     const selArr = selectFieldsOptions[`${selectPathToFind}` as TSelectFieldOptionsKeys];
//     if (selArr === undefined) {
//         // if(dataName==='gatherpoint'){
//         //     const translate = useSelector(getMaterialsSelector).filter(v=>v.type===formik.values.type && v.name===formik.values.name)[0].translate
//         //     if(key==='En') return AddFields.input(elType, translate.En as string | number, formik.handleChange,
//         //         htmlId, key, true, index, styles.fieldBox, styles.label, styles.inputText, true)
//         //     if(key==='Ru') return AddFields.input(elType, translate.Ru as string | number, formik.handleChange,
//         //         htmlId, key, true, index, styles.fieldBox, styles.label, styles.inputText, true)
//         //     if(key==='Fr') return AddFields.input(elType, translate.Fr as string | number, formik.handleChange,
//         //         htmlId, key, true, index, styles.fieldBox, styles.label, styles.inputText, true)
//         // }
//
//         return AddFields.input(elType, value as string | number, formik,
//             htmlId, key, key!=='Ru' && key!=='Fr', index)
//     } else {
//         return AddFields.select(value as string | number, formik.handleChange,
//             htmlId, key, index, selArr)
//     }
// }
// export const getDeepElements = (mapVal: object, prevKey: string, formik: FormikProps<any>, dataName: string, cssGroup:string = ''): JSX.Element => {
//     return (
//         <>
//             {/*{prevKey}*/}
//             {Object.entries(mapVal)
//                 .sort((a, b) => getWeight(a[0]) - getWeight(b[0]))
//                 .map(([key, value], i) => {// && dataName !=='gatherpoint'
//                 if (((key === 'name') && !prevKey.length)|| key==='_id'
//                     || (dataName ==='gatherpoint' && (key==='Ru' || key==='Fr'))) { // @ts-ignore
//                     return null
//                 }
//                 const curKey = prevKey.length ? `${prevKey}.${key}` : key;
//                 if (typeof value === 'object' && key!=='pos')
//                     return getDeepElements(value, curKey, formik, dataName)
//                 else {
//                     if(key ==='pos'){
//                         // const marPos = useSelector(getMarkerForAddPosSelector)
//                         return AddFields.posField(value['x'],value['y'],curKey, i, formik)
//                     }else{
//                         return [getElement(value, curKey, formik, dataName, i)]
//
//                     }
//                 }
//             })}
//         </>
//     )
//
// }