import React, {useEffect, useState} from 'react';
import {FormikProps} from "formik";
import ts from "../../DataView/DataViewTable/DataViewTable.module.css";
import {
    TGuild,
    TPrimKeys,
    TReputation,
    TShopContent,
    TShopContentItem,
} from "../../../Types/CommonTypes";
import {selectFieldsOptions, TShopContentType} from "../../../Types/Utils";
import {SimpleSelectField} from "./SelectField";
import {SimpleInputField} from "./InputField";
import styles from "./Fields.module.css";
import {EquipField} from "./EquipField";
import {useSelector} from "react-redux";
import {AbilitySelectors, RecipeSelectors} from "../../../redux/dataSelectors";
import {getDataObjStr} from "../../../Unils/utilsFunctions";
import {BookField} from "./BookField";

export type TShopItemReputation = TReputation | TGuild | 'no reputation required'
type TProps = {
    index: number,
    formik: FormikProps<any>
    dataName: string
};
export const ShopContentField: React.FC<TProps> = (props) => {
    const {formik, index, dataName} = props
    const [content, setContent] = useState<Array<TShopContent>>(() => formik.values.content)

    const recipes = useSelector(RecipeSelectors.getData)
    const abilities = useSelector(AbilitySelectors.getData)

    //new content item state
    const [isAddActive, setIsAddActive] = useState(false)
    const [type, setType] = useState<TShopContentType>('Empty')
    const [item, setItem] = useState<TShopContentItem>(undefined)
    const [price, setPrice] = useState(0)
    const [reputationName, setReputationName] = useState<TShopItemReputation>('no reputation required')
    const [reputationCount, setReputationCount] = useState(0)
    const [count, setCount] = useState(0)

    const [selectName, setSelectName] = useState('')

    // ContentItem handlers
    const onAddContentItemHandler = () => setIsAddActive(true)
    const onSaveContentItemHandler = () => {
        if (!!item && type !== 'Empty') {
            const newContentItem: TShopContent = {
                item: item,
                type: type,
                price: price,
                count: count,
                reputationRequire: {reputation: reputationName, count: reputationCount}
            }
            setContent(actual => [...actual, newContentItem])
            setIsAddActive(false)
        } else {
            console.log(`Type must be not empty, item must be not undefined`)
        }
    }
    const onDelContentItemHandler = (index: number) => setContent(actual => actual.filter((v, i) => i !== index))

    // select array
    const itemTypes = [...selectFieldsOptions['shopContentItemTypes']] as Array<string>
    const recipeNames = [...selectFieldsOptions['recipe'] || ['Error']] as Array<string>
    const abilityNames = [...selectFieldsOptions['ability'] || ['Error']] as Array<string>
    const reputations = ['no reputation required', ...selectFieldsOptions['reputation.guild'], ...selectFieldsOptions['reputation.town']] as Array<string>


    //table keys
    const tableKeys = ['type', 'item', 'price', 'count', 'reputation']


    useEffect(() => {
        if (selectName.length > 0) {
            switch (type) {
                case "Ability":
                    const abi = abilities.find(v => v.name === selectName)
                    setItem(abi)
                    break
                case "Recipe":
                    const rec = recipes.find(v => v.name === selectName)
                    setItem(rec)
                    break
                default:
                    console.log(`default in shop effect type: ${type} / ${selectName}`)
                    break
            }
        }

    }, [selectName])
    useEffect(() => {
        if (type === 'Equip') setSelectName('')
        else setItem(undefined)
    }, [type])
    useEffect(() => {
        formik.setFieldValue('content', content)
    }, [content])
    // console.log(content)
    return (
        <div>Shop Content
            <button type={'button'} className={styles.addButton} onClick={onAddContentItemHandler}>Add item</button>
            {isAddActive && <div>
                <SimpleSelectField mapSelectValues={itemTypes} value={type}
                                   onSelChange={v => setType(v as TShopContentType)} labelText={'type'}/>
                {type === 'Empty' && `Choose type of item...`}
                {type === 'Ability' && <SimpleSelectField mapSelectValues={abilityNames} value={selectName}
                                                          onSelChange={v => setSelectName(v)} labelText={'Ability'}/>}
                {type === 'Recipe' && <SimpleSelectField mapSelectValues={recipeNames} value={selectName}
                                                         onSelChange={v => setSelectName(v)} labelText={'Recipes'}/>}
                {type === 'Equip' && <EquipField onEquipAdd={equip => setItem(equip)}/>}
                {type === 'Book' && <BookField onBookAdd={book => setItem(book)}/>}

                <SimpleInputField value={count} onChange={v => setCount(+v)} index={1} htmlId={'count'}
                                  labelText={'count'}
                                  required={true} disabled={false}/>
                <SimpleInputField value={price} onChange={v => setPrice(+v)} index={2} htmlId={'price'}
                                  labelText={'price'}
                                  required={true} disabled={false}/>

                <SimpleSelectField mapSelectValues={reputations} value={reputationName}
                                   onSelChange={v => setReputationName(v as TShopItemReputation)} labelText={'type'}/>
                {reputationName !== 'no reputation required' &&
                    <SimpleInputField value={reputationCount} onChange={v => setReputationCount(+v)} index={3}
                                      htmlId={'rep'} labelText={'rep'}
                                      required={true} disabled={false}/>}

                <button className={styles.addButton} type={'button'} onClick={onSaveContentItemHandler}>Save</button>
            </div>}

            {content.length > 0 &&
                <div className={ts.vidInFields} style={{minWidth: '200px'}}>
                    <table className={ts.table} style={{minWidth: '200px'}}>
                        <thead>
                            <tr className={ts.headRow}>
                                <td className={ts.th2} colSpan={3}>SKILLS</td>
                            </tr>
                            <tr className={ts.headRow}>
                                {tableKeys.map((v, i) => <td className={ts.th2}>{v}</td>)}
                            </tr>
                        </thead>
                        <tbody>
                            {content.map((v, i) =>
                                <tr key={i} className={ts.dataRow}>
                                    {tableKeys.map(str => <td className={ts.notEmptyTd}>
                                        {str === 'reputation' && getDataObjStr('reputation', v.reputationRequire)}
                                        {str === 'item' ? getDataObjStr(v.type.toLowerCase(), v[str as TPrimKeys<TShopContent>]) : v[str as TPrimKeys<TShopContent>] as string}
                                    </td>)}
                                    <td>
                                        <button type={'button'} className={ts.deleteButton}
                                                onClick={() => onDelContentItemHandler(i)}/>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>}
        </div>
    );
}