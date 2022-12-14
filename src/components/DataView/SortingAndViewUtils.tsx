import {
    TBonus,
    TBook,
    TDrop,
    TDropTypes,
    TEquip,
    TMapPosition,
    TQuestStage,
    TRecipePart,
    TRequireAdventure,
    TRequireBattle,
    TRequireEquip,
    TRequireKill,
    TRequireQuestItem,
    TRequireResource,
    TRewCost,
    TShopContent,
    TStage
} from "../../Types/CommonTypes";
import s from "./DataView.module.css";
import {getContentShopItemStrFull, getDetails, getTimeStr, toUpperFirstLetterCase} from "../../Unils/utilsFunctions";
import {TAbility, TLocation, TMonster, TQuestItemPosition, TRecipe} from "../../Types/MainEntities";

export const adminView = ['link','author']
export const ignoredFields = ['_id', '__v', 'translate', 'bound', 'moveTo', 'availableAfter', 'startAt', 'endAt', ]
const objectKeyToSort = ['notes', 'loot', 'Book', 'Reputation', 'Land','Count', 'reputationReward',]
export const keysToChangeView = ['cooldown']

export const inIgnoreView = (key: string, isAuth = false)=> (!isAuth && adminView.includes(key)) || ignoredFields.includes(key)

const getDataWeight = (key: string) => {
    switch (key) {
        case 'icon':
            return 0
        case 'name':
            return 1
        case 'Count':
            return 1.99
        case 'Reputation':
            return 2
        case 'Land':
            return 2
        case 'Reward':
            return 3
        case 'reputationReward':
            return 3
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
            return 200
        case 'link':
            return 201
        case 'author':
            return 202

        default:
            return 50 + key.length
    }
}

//Sorting function for data entries => sorting columns for table
export const dataEntriesSort: (a: [string, any], b: [string, any]) => number = (a, b) => {
    const wA = getDataWeight(typeof a[1] === 'object' && !objectKeyToSort.includes(a[0]) ? 'obj' : a[0])
    const wB = getDataWeight(typeof b[1] === 'object' && !objectKeyToSort.includes(b[0]) ? 'obj' : b[0])
    return wA - wB
}
//display data in table
export const getDataViewTdStr = (key: string, data: any, path: string = 'none'): [Array<string>, Array<string | JSX.Element>] => {
    if (data === null) return [[key], [`-`]]
    if (typeof data === 'object') {
        if (key === 'startAt') console.log(data)
        const dataEntries = Object.entries(data)
        switch (key) {
            case 'Book':
                const curBook = data as TBook
                // return [['type', 'count'], [curBook.skill, `+${curBook.count}`]]
                return [['Book'], [`${curBook.skill} +${curBook.count}`]]
            case 'cost':
            case 'reward':
                const curRewCost = data as TRewCost
                // return [['type', 'count'], [curBook.skill, `+${curBook.count}`]]
                return [['res', '#'], [`${curRewCost.name}`, `${curRewCost.count}`]]
            case 'pos':
                return [['Link to map'], [<a
                    href={`/map?x=${data.x}&y=${data.y}${path === '/region' ? `&from=region` : ``}`}>View in map</a>]]
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
                        return [['type', 'source'], [posQuestItem.type, LinkPosToMap(pqiPos)]]
                    case "location":
                        const pqiLoc = posQuestItem.position as TLocation
                        return [['type', 'source'], [posQuestItem.type, LinkLocationToMap(pqiLoc)]]
                    case "monster":
                        const pqiMon = posQuestItem.position as TMonster
                        return [['type', 'source'], [posQuestItem.type, LinkRegionToMap(pqiMon.region, pqiMon.name)]]
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
                contentStr = data.map((v: TShopContent) => getContentShopItemStrFull(v)).join('\n')
                return [[key], data.length === 0 ? [`-`] : [
                    getDetails(`${data.length} items`, contentStr)
                    // <details>
                    //     <summary>{`${data.length} items`}</summary>
                    //     <div className={s.shopContent}>{contentStr}</div>
                    // </details>
                ]]
            case 'loot':
                const curLoot = Array.isArray(data) ? data : data.loot
                // console.log(curLoot)
                return [[key], [curLoot.length === 0 ? `-`
                    : getDetails(data.name, curLoot.map((v: TDrop<TDropTypes>, i: number) =>
                        `[${v.type}] ${v.name} x${v.countMin === v.countMax ? v.countMin : `${v.countMin}-${v.countMax}`} ${v.chance === 100 ? `` : `(${v.chance}%)`}`).join('\n'))]]
            case 'skills':
                return [[key], [data.length === 0 ? `-`
                    : data.map((v: TBonus, i: number) =>
                        `${v.skill}: ${v.count}${i < data.length - 1 ? '\n' : ''}`)]]
            case 'abilities':
                const abilitiesStr = data.map((v: TAbility, i: number) =>
                    `[${v.level}] ${v.name} (${v.cd ? `cd ${v.cd} turn` : `no cd`})${i < data.length - 1 ? '\n' : ''}`)
                return [[key], data.length === 0 ? [`-`] : [
                    getDetails(`${data.length} abilities`, abilitiesStr)
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
            case 'Source':
                return [[key], [data]]
            case 'reputationReward':
                return [['c','rep'], [data.count, data.rep]]
            default:
                console.log(key)
                console.log(data)
                return [[key], ['error']]
        }
    } else {
        switch (key) {
            case 'quest':
                return [[key], [data.length ? data : '-']]
            case 'cooldown':
            case 'time':
                return [[key], [typeof data == 'string' ? data : getTimeStr(data)]]
            case 'location':
                return [['location'], [<>{`${data}`} <a
                    href={`/map?location=${data}`}>{`[view]`}</a></>]]
            // case 'link':
            //     return [[key], [!data?`<no ${key}>`:data]]
            default:
                return [[key], [data==='' || typeof data === undefined || data === null?`<no ${key}>`:data]]
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
        case 'cooldown':
            return 'CD'
        case 'Count':
            return 'C'
        case 'reputationReward':
            return 'Reward'
        case 'author':
            return 'Last edit'
        // case 'durability': return 'dura'
        default:
            return toUpperFirstLetterCase(key.length > cut ? `${key.substring(0, cut)}.` : key)
    }
}


export const getKeysCount = (key: string, value: any): number => {
    if (Array.isArray(value)) return 1
    if (value === null) return 1
    if (key === 'loot') return 1
    if (key === 'pos') return 1
    if (key === 'Book') return 1
    if (key === 'reputationReward') return 2
    if (key === 'reward' || key === 'cost') return 2
    return Object.keys(value).length
}

export const LinkPosToMap = (pos: TMapPosition, text: string='', path: string = 'none') =>{
    return <a href={`/map?x=${pos.x}&y=${pos.y}${path === '/region' ? `&from=region` : ``}`}>{`[view]`}</a>
}
export const LinkLocationToMap = (pos: TLocation | string, text: string = '', path: string = 'none') =>{
    const name = typeof pos === 'string' ? pos : pos.name
    return <>{`${text?`${text} `:``}`}<a href={`/map?location=${name}`}>{`[${name}]`}</a></>
}
export const LinkRegionToMap = (pos: TLocation | string, text: string = '', path: string = 'none') =>{
    const name = typeof pos === 'string' ? pos : pos.name
    return <>{`${text?`${text} `:``}`}<a href={`/map?region=${name}`}>{`[${name}]`}</a></>
}