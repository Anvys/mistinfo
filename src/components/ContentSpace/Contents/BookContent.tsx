import React, {useState} from 'react'
import {useSelector} from "react-redux";
import {EventSelectors, QuestSelectors, ShopSelectors} from "../../../redux/dataSelectors";
import {TBook, TLoot, TSkills} from "../../../Types/CommonTypes";
import {getDataView, getDataViewAny} from "../../DataView/DataView";
import {DataViewTableSimple} from "../../DataView/DataViewTable/DataViewTableSimple";
import styles from "../../DataView/DataViewTable/DataViewTable.module.css";
import {SimpleInputField} from "../../DataAdd/Fields/InputField";
import {getDataViewTdStr} from "../../DataView/SortingAndViewUtils";
//import styles from './BookContent.module.css'

export type TViewBook = {
    Book: TBook,
    Source: string,
    Require: string
}
type TProps = {}
export const BookContent: React.FC<TProps> = (props) => {
    const shops = useSelector(ShopSelectors.getData)
    const events = useSelector(EventSelectors.getData)
    const quests = useSelector(QuestSelectors.getData)
    const [search, setSearch] = useState('')
    const shopBooks = shops
        .filter(shop => shop.content.some(c => c.type === 'Book'))
        .map(shop => ({...shop, content: [...shop.content.filter(c => c.type === 'Book')]}))
        .reduce((summaryArray, curShop, i, arr) => {
                return [...summaryArray, ...curShop.content.map(c => {
                    const curItem = c.item as TBook
                    return {
                        Book: {
                            skill: curItem.skill,
                            count: curItem.count
                        },
                        Source: `Shop [${curShop.npc}]`,
                        Require: `${c.price}Gold ${c.reputationRequire && c.reputationRequire.count > 0
                            ? `${c.reputationRequire.reputation} [${c.reputationRequire.count}]` : ``}`

                    }
                })
                ]
            }
            , [] as Array<TViewBook>)
    const eventBooks = events
        .filter(event => typeof event.loot !== 'string' && event.loot.loot.some(loot => loot.type === 'Book'))
        .map(event => {
            const curLoot = event.loot as TLoot
            return {...event, loot: {...curLoot, loot: curLoot.loot.filter(d => d.type === 'Book')}}
        })
        .reduce((summaryArray, curEvent, i, arr) => {
                const loot = curEvent.loot as TLoot
                return [...summaryArray, ...loot.loot.map(drop => {
                    // const curItem = c.item as TBook
                    return {
                        Book: {
                            skill: `${drop.name}` as TSkills,
                            count: drop.countMin,
                        },
                        Source: `Event [${curEvent.name}]`,
                        Require: `${curEvent.eStages.map(s => `Stage-${s.num}:${getDataViewTdStr('require', s)[1].join('\n')}`).join('\n')}`,
                    }
                })
                ]
            }
            , [] as Array<TViewBook>)
    const questBooks = quests
        .filter(quest => typeof quest.loot !== 'string' && quest.loot.loot.some(loot => loot.type === 'Book'))
        .map(quest => {
            const curLoot = quest.loot as TLoot
            return {...quest, loot: {...curLoot, loot: curLoot.loot.filter(d => d.type === 'Book')}}
        })
        .reduce((summaryArray, curQuest, i, arr) => {
                const loot = curQuest.loot as TLoot
                return [...summaryArray, ...loot.loot.map(drop => {
                    // const curItem = c.item as TBook
                    return {
                        Book: {
                            skill: `${drop.name}` as TSkills,
                            count: drop.countMin,
                        },
                        Source: `Quest [${curQuest.name}]`,
                        Require: `${curQuest.qStages.map(s => `Stage-${s.num}:${getDataViewTdStr('require', s)[1].join('\n')}`).join('\n')}`,
                    }
                })
                ]
            }
            , [] as Array<TViewBook>)
    const books = [...shopBooks, ...eventBooks, ...questBooks].filter(v=>search.length>0?v.Book.skill.toLocaleLowerCase().includes(search.toLowerCase()) :true)
    const bookView = getDataViewAny(books, 'En')
    return (
        <>
            <div className={styles.searchDiv}>
                <SimpleInputField value={search} onChange={str=>setSearch(str)} index={0} htmlId={'search'}
                                  labelText={'Search:'} required={false} disabled={false}/>
            </div>
            <DataViewTableSimple dataView={bookView}/>
        </>
    )

}
