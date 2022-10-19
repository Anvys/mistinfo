import React, {useState} from 'react'
import {useSelector} from "react-redux";
import {
    EventSelectors,
    LocationSelectors,
    NpcSelectors,
    QuestSelectors, RegionSelectors,
    ShopSelectors
} from "../../../redux/dataSelectors";
import {TBook, TSkills} from "../../../Types/CommonTypes";
import {getDataView, getDataViewAny} from "../../DataView/DataView";
import {DataViewTableSimple} from "../../DataView/DataViewTable/DataViewTableSimple";
import styles from "../../DataView/DataViewTable/DataViewTable.module.scss";
import {SimpleInputField} from "../../DataAdd/Fields/InputField";
import {getDataViewTdStr} from "../../DataView/SortingAndViewUtils";
import {getContentShopItemStrFull, getContentShopItemStrLite} from "../../../Unils/utilsFunctions";
import {TLoot} from "../../../Types/MainEntities";
//import styles from './BookContent.module.css'

export type TViewReputationShop = {
    Reputation: string,
    Count: string,
    Item: string,
    Source: string | JSX.Element,
    Require: string
}
export type TViewReputationEvent = {
    Land: string,
    Count: string,
    // Item: string,
    reputationReward: {
        rep: string
        count: number
    }
    Source: string | JSX.Element,
    Require: string
}
export type TViewReputationQuest = {
    Start: string,
    prev: string,
    // Item: string,
    reputationReward: {
        rep: string
        count: number
    }
    Source: string | JSX.Element,
    Require: string
}
type TProps = {}
export const ReputationContent: React.FC<TProps> = (props) => {
    const shops = useSelector(ShopSelectors.getData)
    const events = useSelector(EventSelectors.getData)
    const quests = useSelector(QuestSelectors.getData)
    const location = useSelector(LocationSelectors.getData)
    const region = useSelector(RegionSelectors.getData)
    const npc = useSelector(NpcSelectors.getData)
    const [search, setSearch] = useState('')
    const shopData = shops
        .filter(shop => shop.content.some(c => c.reputationRequire && c.reputationRequire.count > 0))
        .map(shop => ({
            ...shop,
            content: [...shop.content.filter(c => c.reputationRequire && c.reputationRequire.count > 0)]
        }))
        .reduce((summaryArray, curShop, i, arr) => {
                return [...summaryArray, ...curShop.content.map(c => {
                    // const curItem = c.item as TBook
                    const contItem = getContentShopItemStrLite(c)
                    const curNpc = npc.find(v => v.name === curShop.npc) || {name: 'notFound', location: 'notFOund'}
                    // console.log(curNpc.name, curNpc)
                    const npcLoc = location.find(v => v.name === curNpc.location)
                    return {
                        Reputation: `${c.reputationRequire?.reputation}`,
                        Count: `${c.reputationRequire?.count}`,
                        Item: contItem,
                        Source: <>{`Shop [${curShop.npc}]`} {npcLoc !== undefined ? <a
                            href={`/map?location=${npcLoc.name}`}>{`[view]`}</a> : <>Not found</>}</>,
                        Require: `${c.price}Gold ${c.reputationRequire && c.reputationRequire.count > 0
                            ? `${c.reputationRequire.reputation} [${c.reputationRequire.count}]` : ``}`

                    }
                })
                ]
            }
            , [] as Array<TViewReputationShop>)
    const eventData = events
        .filter(event => typeof event.loot !== 'string' && event.loot.loot.some(loot => loot.type === 'Reputation'))
        .map(event => {
            const curLoot = event.loot as TLoot
            return {...event, loot: {...curLoot, loot: curLoot.loot.filter(d => d.type === 'Reputation')}}
        })
        .reduce((summaryArray, curEvent, i, arr) => {
                const loot = curEvent.loot as TLoot
                return [...summaryArray, ...loot.loot.map(drop => {
                    // const curItem = c.item as TBook
                    const curReg = region.find(v => v.name === curEvent.region)
                    return {
                        Land: curReg && curReg?.terrainReq > 0 ? `${curReg?.terrain || '?'}` : `-`,
                        Count: curReg && curReg?.terrainReq > 0 ? `${curReg?.terrainReq || '?'}` : `-`,
                        // Item: `${drop.name} +${drop.countMin}`,
                        reputationReward: {
                            rep: drop.name,
                            count: drop.countMin
                        },
                        Source: <>{`Event [${curEvent.name}]`} {curReg !== undefined ? <a
                            href={`/map?x=${curReg.pos.x}&y=${curReg.pos.y}&from=region`}//href={`/map?region=${curReg.name}`}
                        >{`[view]`}</a> : <>Not found</>}</>,
                        Require: `${curEvent.eStages.map(s => `Stage-${s.num}:${getDataViewTdStr('require', s)[1].join('\n')}`).join('\n')}`,
                    }
                })
                ]
            }
            , [] as Array<TViewReputationEvent>)
    const questData = quests
        .filter(quest => typeof quest.loot !== 'string' && quest.loot.loot.some(loot => loot.type === 'Reputation'))
        .map(quest => {
            const curLoot = quest.loot as TLoot
            return {...quest, loot: {...curLoot, loot: curLoot.loot.filter(d => d.type === 'Reputation')}}
        })
        .reduce((summaryArray, curQuest, i, arr) => {
                const loot = curQuest.loot as TLoot
                return [...summaryArray, ...loot.loot.map(drop => {
                    // const curItem = c.item as TBook
                    const curNpc = npc.find(v => v.name === curQuest.startAt) || {name: 'notFound', location: 'notFOund'}
                    // console.log(curNpc.name, curNpc)
                    const npcLoc = location.find(v => v.name === curNpc.location)
                    return {
                        Start: curQuest.startAt,
                        prev: curQuest.availableAfter.join(', '),
                        reputationReward: {
                            rep: drop.name,
                            count: drop.countMin
                        },
                        // Item: `${drop.name} +${drop.countMin}`,
                        Source: <>{`Quest [${curQuest.name}]`} {npcLoc !== undefined ? <a
                            href={`/map?location=${npcLoc.name}`}>{`[view]`}</a> : <>Not found</>}</>,
                        Require: `${curQuest.qStages.map(s => `Stage-${s.num}:${getDataViewTdStr('require', s)[1].join('\n')}`).join('\n')}`,
                    }
                })
                ]
            }
            , [] as Array<TViewReputationQuest>)
    const filteredShops = [...shopData,]//.filter(v=>search.length>0?v.Book.skill.toLocaleLowerCase().includes(search.toLowerCase()) :true)
    const filteredEvents = [...eventData,]//.filter(v=>search.length>0?v.Book.skill.toLocaleLowerCase().includes(search.toLowerCase()) :true)
    const filteredQuests = [...questData,]//.filter(v=>search.length>0?v.Book.skill.toLocaleLowerCase().includes(search.toLowerCase()) :true)
    const ShopView = getDataViewAny(filteredShops, 'En')
    const EventView = getDataViewAny(filteredEvents, 'En')
    const QuestView = getDataViewAny(filteredQuests, 'En')
    return (
        <>
            <div className={styles.searchDiv}>
                <SimpleInputField value={search} onChange={str => setSearch(str)} index={0} htmlId={'search'}
                                  labelText={'Search:'} required={false} disabled={false}/>
            </div>
            <DataViewTableSimple dataView={ShopView} danaName={`reputation shops`}/>
            <DataViewTableSimple dataView={EventView} danaName={`reputation events`}/>
            <DataViewTableSimple dataView={QuestView} danaName={`reputation quests`}/>
        </>
    )

}
