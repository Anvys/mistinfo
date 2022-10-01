import {
    TAbility, TBonus, TBook,
    TCombineData, TEquip,
    TMapPosition, TQuestItemPosType,
    TQuestStage, TRecipe, TRecipePart, TRequireEquip,
    TResponseBody, TShopContent,
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
        if (key !== '_id' && key !== '__v' && key !== 'name' && key !== 'notes' && key !== 'drop') {
            const tValue = typeof value
            if (tValue !== 'object') dataKeys.get('primary')?.push(key)
            else {
                switch (key) {
                    case 'content':
                        dataKeys.set(key, ['content'])//...value.map((v:object,i:number)=>`${i}`)
                        break;
                    case 'skills':
                        dataKeys.set(key, ['bonus'])//...value.map((v:object,i:number)=>`${i}`)
                        break;
                    case 'posQuestItem':
                        dataKeys.set(key, ['type', 'Source'])//...value.map((v:object,i:number)=>`${i}`)
                        break;
                    case 'bound':
                        dataKeys.set(key, ['Bound'])//...value.map((v:object,i:number)=>`${i}`)
                        break;
                    case 'loot':
                        dataKeys.set(key, ['Drops'])//...value.map((v:object,i:number)=>`${i}`)
                        break;
                    case 'stages':
                        dataKeys.set(key, ['stages'])//...value.map((v:object,i:number)=>`${i}`)
                        break;
                    case 'abilities':
                        dataKeys.set(key, ['abilities'])//...value.map((v:object,i:number)=>`${i}`)
                        break;
                    case 'evoQuests':
                        dataKeys.set(key, ['quests'])//...value.map((v:object,i:number)=>`${i}`)
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
export const getStageRequireStr = (type: string, req: TStageRequire) => {
    // console.log(req)
    switch (type) {
        case 'Adventure':
            return `${req.type}: ${req.count}`
        case 'Equip':
            const eq = req as TRequireEquip
            if (!eq.type.recipe) return `empty`
            return `${eq.count}x ${eq.type.recipe.name}: \n${eq.type.recipe.parts.map((v, i) => `--${v.name}: ${eq.type.components[i]} x${v.count}${i < eq.type.recipe.parts.length - 1 ? '\n' : ''}`).join('')}`
        default:
            return `DefaultStageReqStr`
    }
}
export const getStagesStr = (stages: Array<TStage>): string => {
    const totalStages = stages.reduce((p,c)=>{return c.num>p?c.num:p},0)
    return stages.map((stage, i) =>
        // `-${stage.expr}-:№${stage.num}:${stage.name}:${stage.proc}%:${getStageRequireStr(stage.type, stage.require)}${i < stages.length - 1 ? '\n' : ''}`).join('')
        `${totalStages>1?`№${stage.num} `:''}[${stage.name.length> 12 ? stage.name.substring(0,12)+'..':stage.name}]  ${getStageRequireStr(stage.type, stage.require)}(${stage.proc}%)${i < stages.length - 1 ? '\n' : ''}`).join('')
}
export const getStageStr = (stage: TStage | TQuestStage): string => {
    // return `-${stage.expr}-:№${stage.num}:${stage.name}:${stage.proc}%:${getStageRequireStr(stage.type, stage.require)}`
    return `№${stage.num}: ${getStageRequireStr(stage.type, stage.require)}(${stage.proc}%)`
}
export const getAbilityStr = (abi: TAbility) => {
    return `${abi.name}: ${abi.level} lvl (${abi.type}) ${abi.cd > 0 ? `[cd ${abi.cd} turn]` : `[no cd]`} ${abi.stamina > 0 ? `cost ${abi.stamina}mp` : ''} [${abi.effect}]`
}
export const getRecipePartStr = (rec: TRecipePart) => {
    return `[${rec.name}] ${rec.component}: ${rec.count}`
}
export const getDataObjStr = (field: string, data: any) => {
    switch (field) {
        case 'posQuestItem':
            switch (data.type as TQuestItemPosType) {
                case 'pos':
                    return `x:${data.position.x}|y:${data.position.y}`
                case 'location':
                    return `[${data.position.name}]`
                case 'monster':
                    // console.log(data)
                    return `[${data.position.name}]`
                default:
                    return `default posQuestItem DataObjStr`
            }
        case 'skills':
            return data.length === 0 ? `-` : data.map((v: TBonus, i: number) => `${v.skill}: ${v.count}${i < data.length - 1 ? '\n' : ''}`)
        case 'content':
            return data.length === 0 ? `-`
                : `Shop with ${data.length} items`
        case 'equip':
            const eq = data as TEquip
            return `${eq.recipe.name}: \n${eq.recipe.parts.map((v, i) => `--${v.name}: ${eq.components[i]} x${v.count}${i < eq.recipe.parts.length - 1 ? '\n' : ''}`).join('')}`
        case 'ability':
            return `${data.name} ${data.level}`
        case 'recipe':
            return `rec ${data.name}`
        case 'reputation':
            return `${data.reputation}: ${data.count}`
        case 'book':
            return `${data.skill} +${data.count}`
        default:
            return `defaultDataObjStr in getDataObjStr func`
    }
}
export const getTimeStr = (min: number) =>{
    if(min < 60) return `${min}m`
    else {
        const h = Math.floor(min/60)
        const m = min%60
        if(h<25) return `${h}h:${m}m`
        else{
            const d = Math.floor(h/24)
            const lastHours = h%24
            return `${d}d:${lastHours}h:${m}m`
        }
    }
}
type TGetSearchParamsReturn = {
    pos: [number, number] | undefined,
    from: string | undefined,
    location: string | undefined,
}
export const getSearchParams = (str:string):TGetSearchParamsReturn | undefined =>{
    if(str.length){
        const result: TGetSearchParamsReturn = {
            pos:undefined ,
            from: undefined,
            location:undefined,
        }
        const e = Object.fromEntries(str.substring(1).split('&').map(v=>v.split('=')))
        if(!!e.x && !!e.y && !isNaN(+e.x) && !isNaN(+e.y)) result.pos =  [+e.x, +e.y]
        if(!!e.from && e.from.length>0)  result.from =  decodeURI(e.from)
        if(!!e.location && e.location.length>0) result.location = decodeURI(e.location)
        return result
    }else return undefined

}
export const getDetails = (summary: string, body:string)=>{
    return <details>
        <summary>{summary}</summary>
        {body}
    </details>
}
export const getContentShopItemStrFull = (v: TShopContent, full: boolean = true) => {
    const reqStr = `${v.price} gold ${v.reputationRequire === null || v.reputationRequire.count === 0 ? `` : `(${v.reputationRequire.reputation} ${v.reputationRequire.count})`}`
    switch (v.type) {
        case "Empty":
            return `Empty`
        case "Ability":
            const abi = v.item as TAbility
            return `${v.type}: [${abi.level}]${abi.name} ${full?reqStr:''} (${v.count === 0 ? `∞` : `x${v.count}`})`
        case "Equip":
            const eq = v.item as TEquip
            return `${v.type}: [${v.count === 0 ? `∞` : `x${v.count}`}] ${eq.recipe.name} [${eq.recipe.parts.map((part, i) => `${eq.components[i]} x${part.count}`).join(' / ')}] ${full?reqStr:''}`
        case "Book":
            const book = v.item as TBook
            return `${v.type}: [${v.count === 0 ? `∞` : `x${v.count}`}] ${book.skill} +${book.count} ${full?reqStr:''}`
        case "Recipe":
            const rec = v.item as TRecipe
            return `${v.type}: ${rec.name} ${full?reqStr:''}`
    }
}
export const getContentShopItemStrLite = (v: TShopContent) =>getContentShopItemStrFull(v, false)
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