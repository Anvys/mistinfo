import React from 'react';
import {DataViewTable2} from "./DataViewTable/DataViewTable";
import s from './DataView.module.css'
import {
    TAbility,
    TBonus, TBook,
    TCombineData,
    TDrop,
    TDropTypes,
    TEquip,
    TLocation,
    TMapPosition,
    TMonster,
    TQuestItemPosition,
    TQuestStage,
    TRecipe,
    TRecipePart,
    TRequireAdventure,
    TRequireBattle,
    TRequireEquip,
    TRequireKill,
    TRequireQuestItem,
    TRequireResource,
    TShopContent,
    TStage,
    TStageRequire,
    TTranslateLang
} from "../../Types/CommonTypes";

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

const getDataWeight = (key: string) => {
    switch (key) {
        case 'icon':
            return 0
        case 'name':
            return 1
        case 'startAt':
            return 48
        case 'endAt':
            return 49
        case 'primary':
            return 50
        case 'obj':
            return 98 + key.length
        case 'translate':
            return 99
        case 'notes':
            return 100

        default:
            return 50 + key.length
    }
}
const objectKeyToSort = ['notes','loot']
//Sorting function for data entries => sorting columns for table
const dataEntriesSort: (a: [string, any], b: [string, any]) => number = (a, b) => {
    const wA = getDataWeight(typeof a[1] === 'object' && !objectKeyToSort.includes(a[0]) ? 'obj' : a[0])
    const wB = getDataWeight(typeof b[1] === 'object' && !objectKeyToSort.includes(b[0]) ? 'obj' : b[0])
    return wA - wB
}

export const supFuncGetStr = {
    getRequireStage: (req: TStageRequire) => {
        switch (req.type) {
            case '':
                return ''
        }
    },
}
//display data in table
export const getDataViewTdStr = (key: string, data: any, path: string = 'none'): [Array<string>, Array<string | JSX.Element>] => {
    if(data===null)return [[key], [`-`]]
    if (typeof data === 'object') {
        if(key==='startAt') console.log(data)
        const dataEntries = Object.entries(data)
        switch (key) {
            case 'pos':
                return [['Link to map'], [<a href={`/map?x=${data.x}&y=${data.y}${path==='/region'?`&from=region`:``}`}>View in map</a>]]
            case 'translate' :

            case 'attributes' :
                return [[...dataEntries.map(v => v[0])], [...dataEntries.map(v => v[1])] as Array<string>]
            case 'notes':
                return [[key], data.length === 0 ? [`-`] : [data.map((v: string) => `${v}\n`).join('')]]
            case 'availableAfter':
                return [[key], data.length === 0 ? [`-`] : [data.map((v: string) => `${v}\n`).join('')]]
            case 'qStages':
                let qStagesStr = data.map((v: TQuestStage) =>
                    `${v.num}.${v.name}\n`).join('')
                return [[key], data.length === 0 ? [`-`] : [
                    <details>
                        <summary>{`${data.length} stages`}</summary>
                        {qStagesStr}
                    </details>
                ]]
            case 'posQuestItem':
                const posQuestItem = data as TQuestItemPosition
                switch (posQuestItem.type) {
                    case "pos":
                        const pqiPos = posQuestItem.position as TMapPosition
                        return [['type', 'source'], [posQuestItem.type, `${pqiPos.x}:${pqiPos.y}`]]
                    case "location":
                        const pqiLoc = posQuestItem.position as TLocation
                        return [['type', 'source'], [posQuestItem.type,`loc ${pqiLoc.name}(${pqiLoc.pos.x}:${pqiLoc.pos.y})`]]
                    case "monster":
                        const pqiMon = posQuestItem.position as TMonster
                        return [['type', 'source'], [posQuestItem.type,`mon ${pqiMon.name} (${pqiMon.region})`]]
                    default:
                        return [[key], [`def posQuestItem`]]
                }
            case 'eStages':
                const eStages = [...data] as Array<TStage>
                if (eStages.length > 1) eStages.sort((a, b) => a.num - b.num)
                const stagesCount = eStages.length > 1 ? eStages.reduce((p, c) => c.num > p ? c.num : p, 0) : 1
                const str = eStages.length === 0 ? `-` : eStages.map((v: TStage, i, arr) => `${i > 0 && arr[i - 1].num === v.num ? '' : `Stage ${v.num}:\n`} ${v.require.type} ${v.require.count} (${v.proc}%) ${v.time}min`).join('\n')
                return [[key], [
                    <details>
                        <summary>{`${stagesCount} stages`}</summary>
                        {str}
                    </details>]]

            case 'evoQuests':
                return [[key], data.length === 0 ? [`-`] : [data.map((v: string) =>
                    `${v}`).join('\n')]]
            case 'content':
                let contentStr = ''
                contentStr = data.map((v: TShopContent) => {
                    switch (v.type) {
                        case "Empty":
                            return `Empty`
                        case "Ability":
                            const abi = v.item as TAbility
                            return `${v.type}: [${abi.level}]${abi.name} ${v.price} gold ${v.reputationRequire === null || v.reputationRequire.count === 0 ? `` : `(${v.reputationRequire.reputation} ${v.reputationRequire.count})`} (${v.count === 0 ? `∞` : `x${v.count}`})`
                            break
                        case "Equip":
                            const eq = v.item as TEquip
                            return `${v.type}: [${v.count === 0 ? `∞` : `x${v.count}`}] ${eq.recipe.name} [${eq.recipe.parts.map((part, i) => `${eq.components[i]} x${part.count}`).join(' / ')}] ${v.price} gold ${v.reputationRequire === null || v.reputationRequire.count === 0 ? `` : `(${v.reputationRequire.reputation} ${v.reputationRequire.count})`}`
                            break
                        case "Book":
                            const book = v.item as TBook
                            return `${v.type}: [${v.count === 0 ? `∞` : `x${v.count}`}] ${book.skill} +${book.count}  ${v.price} gold ${v.reputationRequire === null || v.reputationRequire.count === 0 ? `` : `(${v.reputationRequire.reputation} ${v.reputationRequire.count})`}`
                            break
                        case "Recipe":
                            const rec = v.item as TRecipe
                            return `${v.type}: ${rec.name} ${v.price} gold ${v.reputationRequire === null || v.reputationRequire.count === 0 ? `` : `(${v.reputationRequire.reputation} ${v.reputationRequire.count})`} `
                            break
                    }
                }).join('\n')
                return [[key], data.length === 0 ? [`-`] : [
                    <details>
                        <summary>{`${data.length} items`}</summary>
                        <div className={s.shopContent}>{contentStr}</div>
                    </details>
                ]]
            case 'loot':
                const curLoot = Array.isArray(data) ? data : data.loot
                // console.log(curLoot)
                return [[key], [curLoot.length === 0 ? `-`
                    : curLoot.map((v: TDrop<TDropTypes>, i: number) =>
                        `[${v.type}] ${v.name} x${v.countMin === v.countMax ? v.countMin : `${v.countMin}-${v.countMax}`} ${v.chance === 100 ? `` : `(${v.chance}%)`}`).join('\n')]]
            case 'skills':
                return [[key], [data.length === 0 ? `-`
                    : data.map((v: TBonus, i: number) =>
                        `${v.skill}: ${v.count}${i < data.length - 1 ? '\n' : ''}`)]]
            case 'abilities':
                const abilitiesStr = data.map((v: TAbility, i: number) =>
                    `[${v.level}] ${v.name} (${v.cd ? `cd ${v.cd} turn` : `no cd`})${i < data.length - 1 ? '\n' : ''}`)
                return [[key], data.length === 0 ? [`-`] : [
                    <details>
                        <summary>{`${data.length} abilities`}</summary>
                        {abilitiesStr}
                    </details>
                ]]
            case 'parts':
                const local = data as Array<TRecipePart>
                return [[key], [data.length === 0 ? `-` : `${local.map(part => `${part.count} ${part.component}`).join(' / ')}`]]
            case 'require':
                const reqStage = data as TStage
                if (reqStage.require === null || (Array.isArray(reqStage.require.type) && reqStage.require.type.length === 0)) return [[key], [`Empty`]]
                switch (reqStage.type) {
                    case 'Adventure':
                        const reqAdv = reqStage.require as TRequireAdventure
                        return [[key], [`${reqAdv.type} ${reqAdv.count}`]]
                    case 'Resource':
                        const reqRes = reqStage.require as TRequireResource
                        return [[key], [`${reqRes.type.name} ${reqRes.count}`]]
                    case 'QuestItem':
                        const reqQuestItem = reqStage.require as TRequireQuestItem
                        return [[key], [`${reqQuestItem.type.name} ${reqQuestItem.count}`]]
                    case 'Kill':
                        const reqKill = reqStage.require as TRequireKill
                        return [[key], [`${reqKill.type.name} ${reqKill.count}`]]
                    case 'Battle':
                        const reqBattle = reqStage.require as TRequireBattle
                        return [[key], [reqBattle.type.length === 0 || typeof reqBattle.type !== 'object' ? `-` :
                            <details>
                                <summary>{`${reqBattle.type.length} monsters`}</summary>
                                {reqBattle.type.map(v => `${v.name} Lv.${v.level} (Life:${v.life})`).join('\n')}
                            </details>
                        ]]
                    case 'Equip':
                        const reqEquip = reqStage.require as TRequireEquip
                        return [[key], [`${reqEquip.type.recipe.name} [${reqEquip.type.recipe.parts.map((part, i) => `${reqEquip.type.components[i]} x${part.count}`).join(' / ')}]`]]
                    default:
                        return [[key], [`error stage req`]]
                }
            default:
                console.log(key)
                console.log(data)
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
//display keys in head row
export const getTableTdKey = (key: string, cut: number = 6): string => {
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
        case 'availableAfter':
            return 'prev'
        case 'stages':
            return 'Error Stages'
        case 'eStages':
            return 'Stages'
        case 'qStages':
            return 'Stages'
        case 'abilities':
            return 'Abilities'
        case 'region':
            return 'Region'
        case 'evoQuests':
            return 'Quests'
        case 'content':
            return 'Stock'
        case 'resultType':
            return 'Slot'
        case 'baseReq':
            return 'Base Difficult'
        case 'terrain':
            return 'Terrain'
        case 'terrainReq':
            return 'Difficult'
        case 'posQuestItem':
            return 'Pos'
        // case 'durability': return 'dura'
        default:
            return toUpperFirstLetterCase(key.length > cut ? `${key.substring(0, cut)}.` : key)
    }
}

export const toUpperFirstLetterCase = (str: string): string => {
    return str.length > 0 ? str.split('').map((v, i) => i === 0 ? v.toUpperCase() : v).join('') : ''
}
export const ignoredFields = ['_id', '__v', 'translate', 'bound', 'moveTo', 'availableAfter', 'startAt', 'endAt']
// export const DataView2 = <T extends TCombineData>(props: React.PropsWithChildren<TProps<T>>) =>{

export type TDataViewObj = {
    keys1: Array<[string, number]>
    keys2: Array<[string, number]>
    values: Array<Array<string | JSX.Element>>
}
const getKeysCount = (key:string, value:any):number =>{
    if(Array.isArray(value)) return 1
    if(value === null) return 1
    if(key==='loot') return 1
    if(key==='pos') return 1
    return Object.keys(value).length
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
