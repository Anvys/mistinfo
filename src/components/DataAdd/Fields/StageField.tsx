import React, {useEffect, useState} from 'react';
import styles from "./Fields.module.css";
import tableStyles from "../../DataView/DataViewTable/DataViewTable.module.scss";

import {
    NO_LOOT,
    TAdventure, TCombineData,
    TDrop,
    TDropTypes, TEquip,
    TExpr, TRecipePart,
    TRequireAdventure, TRequireQuestItem, TSkills,
    TStage, TStageRequireType,
    TStageRequire
} from "../../../Types/CommonTypes";
import {selectFieldsOptions, TSelectFieldsKeys} from "../../../Types/Utils";
import {useSelector} from "react-redux";
import {
    ComponentSelectors,
    getComponentsSelector,
    getLootByNameSelector,
    getMaterialsSelector, LootSelectors, MaterialSelectors, MonsterSelectors,
    QuestItemSelectors,
    RecipeSelectors,
    TSelectors
} from "../../../redux/dataSelectors";
import {FormikProps} from "formik";
import {SimpleSelectField} from "./SelectField";
import {SimpleInputField} from "./InputField";
import {log} from "util";
import {getDataViewTdStr} from "../../DataView/SortingAndViewUtils";
import {TLoot, TMonster, TQuestItem} from "../../../Types/MainEntities";

type TProps = {
    formik: FormikProps<any>
    onStageAdd: (req: TStage) => void
};
export const StageField: React.FC<TProps> = (props) => {
    const {formik} = props

    const [type, setType] = useState<TStageRequireType>('Adventure')
    const [name, setName] = useState('Stage')
    const [expr, setExpr] = useState<TExpr>('or')
    const [num, setNum] = useState(1)
    const [proc, setProc] = useState(100)
    const [time, setTime] = useState(0)
    const [loot, setLoot] = useState('')
    const [req, setReq] = useState<TStageRequire | null>(() => ({type: 'Academic', count: 0}))
    // console.log(`find loot ${loot} /  ${loot.split('#')[1]} : ${useSelector(getLootByNameSelector(loot))}`)
    const loots = useSelector(LootSelectors.getData)
    // console.log(`stages: ${formik.values.eStages.length}`)
    //formik.values.stages.length>0?formik.values.stages : []
    const [stages, setStages] = useState<Array<TStage>>(() => formik.values.eStages)
    const stageKeys = ['num', 'expr', 'name', 'type', 'require', 'time', 'loot']

    const onTypeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        setReq(null)
        setType(e.target.value as TStageRequireType)
    }
    const onRequireAdd = (req: TStageRequire) => {
        setReq(req)
        console.log(req)
    }
    const onStageAdd = () => {
        if (req !== null) {
            const newStage: TStage = {
                num,
                proc,
                name: name === 'Stage' ? `Stage ${num}` : name,
                expr,
                type,
                require: req,
                time,
            }
            formik.setFieldValue('eStages', [...stages, newStage])
            setType('Adventure')
            setReq({type: 'Academic', count: 0})
        }
    }
    const onStageDelHandler = (index: number) => {
        formik.setFieldValue('eStages', formik.values.eStages.filter((v: any, i: number) => i !== index))
    }
    useEffect(() => {
        setStages(formik.values.eStages)
    }, [formik.values.eStages])

    return (
        <div className={styles.divRow}>
            <div className={styles.divCol} style={{width: '200px'}}>
                <div className={styles.divRow}>
                    <div className={styles.fieldBox}>
                        <label htmlFor={'type'}>reqtype:</label>
                        <select className={styles.inputText} name={'type'} value={type} onChange={onTypeChange}
                                autoComplete={'off'} placeholder={'type'}>
                            <option value="" disabled hidden key={0}>{`Select type`}</option>
                            {selectFieldsOptions['stage.type'].map((v, i) => <option value={v}
                                                                                     key={i + 1}>{`${v}`}</option>)}
                        </select>
                    </div>

                </div>
                {/* @ts-ignore*/}
                <p style={{fontSize: '16px', fontWeight: 'bold'}}>
                    {/*{`Cur req: ${type==='Resource'?req.type.name : req.type}: ${req.count}`}*/}
                    {getDataViewTdStr('require', {type: type, require: req})[1]}

                </p>
                <p>----------</p>


                {type === 'Adventure' && <StageAdventureForm onSubmit={onRequireAdd}/>}
                {type === 'Resource' && <StageRequireResourceForm type={type} onSubmit={onRequireAdd}/>}
                {type === 'Kill' && <StageRequireKillMonsterForm type={type} onSubmit={onRequireAdd}/>}
                {type === 'Equip' && <StageRequireEquipForm type={type} onSubmit={onRequireAdd}/>}
                {type === 'Battle' && <StageRequireBattleForm type={type} onSubmit={onRequireAdd}/>}

            </div>
            <div className={styles.fieldBoxCol}>
                <div className={styles.fieldBoxNoBorder}>
                    <label className={styles.label} htmlFor={'num'}>stage№:</label>
                    <input className={styles.inputText} type={'number'} name={'num'}
                           value={num}
                           onChange={e => setNum(+e.target.value)}
                           autoComplete={'off'} placeholder={'note'}/>
                </div>
                <div className={styles.fieldBoxNoBorder}>
                    <label className={styles.label} htmlFor={'proc'}>Perc:</label>
                    <input className={styles.inputText} type={'number'} name={'proc'}
                           value={proc}
                           onChange={e => setProc(+e.target.value)}
                           autoComplete={'off'} placeholder={'Percentage'}/>
                </div>
                <div className={styles.fieldBoxNoBorder}>
                    <label className={styles.label} htmlFor={'name'}>name:</label>
                    <input className={styles.inputText} type={'text'} name={'name'}
                           value={name}
                           onChange={e => setName(e.target.value)}
                           autoComplete={'off'} placeholder={'name'}/>
                </div>

                <div className={styles.fieldBoxNoBorder}>
                    <label className={styles.label} htmlFor={'time'}>time:</label>
                    <input className={styles.inputText} type={'number'} name={'time'}
                           value={time}
                           onChange={e => setTime(+e.target.value)}
                           autoComplete={'off'} placeholder={'note'}/>
                </div>

            </div>
            <div className={styles.fieldBoxCol}>
                <div className={styles.fieldBoxNoBorder}>
                    <label className={styles.label} htmlFor={'expr'}>expr:</label>
                    <select className={styles.inputText} name={'expr'} value={expr}
                            onChange={e => setExpr(e.target.value as TExpr)}
                            required autoComplete={'off'} placeholder={'expr'}>
                        <option value="" disabled hidden key={0}>{`Select expr`}</option>
                        {selectFieldsOptions['stage.expr'].map((v, i) => <option value={v}
                                                                                 key={i + 1}>{`${v}`}</option>)}
                    </select>
                </div>
                {/*<div className={styles.fieldBoxNoBorder}>*/}
                {/*    <label className={styles.label} htmlFor={'loot'}>loot:</label>*/}
                {/*    <select className={styles.inputText} name={'loot'} value={loot}*/}
                {/*            onChange={e => setLoot(e.target.value)}*/}
                {/*            autoComplete={'off'} placeholder={'expr'}>*/}
                {/*        <option value="" disabled hidden key={0}>{NO_LOOT}</option>*/}
                {/*        {selectFieldsOptions['loot']?.map((v, i) => <option value={v} key={i + 1}>{`${v}`}</option>)}*/}
                {/*    </select>*/}
                {/*</div>*/}
                <button className={styles.addButton} type={'button'} onClick={onStageAdd}>AddStage</button>
            </div>
            <div className={tableStyles.vidInFields}>
                <table className={tableStyles.table}>
                    <thead>
                        <tr className={tableStyles.headRow}>
                            <th colSpan={stageKeys.length}>Event STAGES</th>
                        </tr>
                        <tr>
                            {stageKeys.map((v, i) => <td key={i}>{v}</td>)}
                        </tr>
                    </thead>
                    <tbody>
                        {stages.map((st, i) =>
                            <tr key={st.num * 10 + i}>
                                {/*{Object.entries(st).map(([key, val]:[string, any])=>{*/}
                                {stageKeys.map((key, j) => {
                                    const val: any = st[key as keyof typeof st]
                                    switch (key) {
                                        case '_id' :
                                            return null
                                        case 'require':
                                            // console.log(val)
                                            const reqResult = getDataViewTdStr('require', st)
                                            return <td key={j}>{reqResult[1]}</td>
                                        // return <td key={j}>{Object.entries(val).map(([r1, r2], i, arr) => `${r2}${i < arr.length - 1 ? ': ' : ''}`)}</td>
                                        case 'loot':
                                            console.log(val)
                                            return <td
                                                key={j}>{val?.loot.map((drop: TDrop<TDropTypes>, i: number) => `${drop.type}#${drop.name}#x${drop.countMin}-${drop.countMax}(${drop.chance}%)${i < val.length - 1 ? '\n' : ''}`)}</td>

                                        default:
                                            return <td key={j}>{val as string}</td>
                                    }

                                })}
                                <td>
                                    <button type={'button'} className={styles.deleteButton}
                                            onClick={() => onStageDelHandler(i)}/>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>

    );
}
type TStageAdventureFormProps = {
    onSubmit: (require: TStageRequire) => void
};
export const StageAdventureForm: React.FC<TStageAdventureFormProps> = (props) => {
    const [adventure, setAdventure] = useState<TSkills>('Academic')
    const [count, setCount] = useState(0)
    const bookArr = [...selectFieldsOptions["adventure"], ...selectFieldsOptions["weapon"],
        ...selectFieldsOptions["crafting"], ...selectFieldsOptions["terrain"],...selectFieldsOptions["gatherpoint.type"]]
    const onSaveHandler = () => {
        props.onSubmit({type: adventure, count})
    }
    return (
        <div className={styles.divCol}>
            <div style={{fontSize: '14px', fontWeight: 'bold'}}>
                <p>Add adventure stage</p>
            </div>
            <div className={styles.fieldBoxColNoBorder}>
                <SimpleSelectField mapSelectValues={bookArr} value={adventure}
                                   onSelChange={(val) => setAdventure(val as TAdventure)} labelText={'skill'}/>
                <SimpleInputField value={count} onChange={(val) => setCount(+val)} index={1} htmlId={'count'}
                                  labelText={'count'} required={false} disabled={false}/>
                <button type={'button'} className={styles.addButton} onClick={onSaveHandler}>Save</button>
            </div>
        </div>
    )
}


type TStageRequireQuestItemFormProps = {
    type: string
    onSubmit: (require: TStageRequire) => void
};
export const StageRequireQuestItemForm: React.FC<TStageRequireQuestItemFormProps> = (props) => {
    const [requireData, setRequireData] = useState<string>('')
    const [count, setCount] = useState(0)
    const questItems = useSelector(QuestItemSelectors.getData)
    const onSaveHandler = () => {
        const findRes = questItems.find(v => v.name === requireData)
        if (findRes !== undefined) props.onSubmit({type: findRes, count: count})
    }
    return (
        <div className={styles.divCol}>
            <div style={{fontSize: '14px', fontWeight: 'bold'}}>
                <p>Add quest item stage</p>
            </div>
            <div className={styles.fieldBoxColNoBorder}>
                <SimpleSelectField mapSelectValues={selectFieldsOptions['questitem'] || ['not found']}
                                   value={requireData} onSelChange={(val) => setRequireData(val as TAdventure)}
                                   labelText={'quest item'}/>
                <SimpleInputField value={count} onChange={(val) => setCount(+val)} index={1} htmlId={'count'}
                                  labelText={'count'} required={false} disabled={false}/>
                <button type={'button'} className={styles.addButton} onClick={onSaveHandler}>Save</button>
            </div>
        </div>
    )
}
export const StageRequireResourceForm: React.FC<TStageRequireQuestItemFormProps> = (props) => {
    const [requireData, setRequireData] = useState<string>('')
    const [count, setCount] = useState(0)
    const materials = useSelector(MaterialSelectors.getData)
    const components = useSelector(ComponentSelectors.getData)
    const resources = [...materials, ...components]
    const onSaveHandler = () => {
        const findRes = resources.find(v => v.name === requireData)
        if (findRes !== undefined) props.onSubmit({type: findRes, count: count})
    }
    return (
        <div className={styles.divCol}>
            <div style={{fontSize: '14px', fontWeight: 'bold'}}>
                <p>Add resource stage</p>
            </div>
            <div className={styles.fieldBoxColNoBorder}>
                <SimpleSelectField mapSelectValues={[...resources.map(v => v.name)] || ['not found']}
                                   value={requireData} onSelChange={(val) => setRequireData(val as TAdventure)}
                                   labelText={'Res'}/>
                <SimpleInputField value={count} onChange={(val) => setCount(+val)} index={1} htmlId={'count'}
                                  labelText={'count'} required={false} disabled={false}/>
                <button type={'button'} className={styles.addButton} onClick={onSaveHandler}>Save</button>
            </div>
        </div>
    )
}
export const StageRequireKillMonsterForm: React.FC<TStageRequireQuestItemFormProps> = (props) => {
    const [requireData, setRequireData] = useState<string>('')
    const [count, setCount] = useState(0)
    const monsters = useSelector(MonsterSelectors.getData)
    const onSaveHandler = () => {
        const findRes = monsters.find(v => v.name === requireData)
        if (findRes !== undefined) props.onSubmit({type: findRes, count: count})
    }
    return (
        <div className={styles.divCol}>
            <div style={{fontSize: '14px', fontWeight: 'bold'}}>
                <p>Add kill monster stage</p>
            </div>
            <div className={styles.fieldBoxColNoBorder}>
                <SimpleSelectField mapSelectValues={[...monsters.map(v => v.name)] || ['not found']}
                                   value={requireData} onSelChange={(val) => setRequireData(val as TAdventure)}
                                   labelText={'Monster'}/>
                <SimpleInputField value={count} onChange={(val) => setCount(+val)} index={1} htmlId={'count'}
                                  labelText={'count'} required={false} disabled={false}/>
                <button type={'button'} className={styles.addButton} onClick={onSaveHandler}>Save</button>
            </div>
        </div>
    )
}
export const StageRequireBattleForm: React.FC<TStageRequireQuestItemFormProps> = (props) => {
    const [requireData, setRequireData] = useState<string>('')
    const [count, setCount] = useState(0)
    const [monsterArr, setMonsterArr] = useState<Array<TMonster>>([])
    const monsters = useSelector(MonsterSelectors.getData)
    const onMonsterAdd = () => {
        const findRes = monsters.find(v => v.name === requireData)
        if (findRes !== undefined) setMonsterArr(actual => [...actual, findRes])
    }
    const onSaveHandler = () => {
        console.log(monsterArr)
        if (monsterArr.length > 0) props.onSubmit({type: monsterArr, count: count})
    }
    return (
        <div className={styles.divCol}>
            <div style={{fontSize: '14px', fontWeight: 'bold'}}>
                <p>Add kill monster stage</p>
                <details>
                    <summary>Current monster party: {monsterArr.length}</summary>
                    <p style={{whiteSpace: 'pre'}}>{monsterArr.map(v => v.name).join('\n')}</p>
                </details>
            </div>

            <div className={styles.fieldBoxColNoBorder}>
                <SimpleSelectField mapSelectValues={[...monsters.map(v => v.name)] || ['not found']}
                                   value={requireData} onSelChange={(val) => setRequireData(val)}
                                   labelText={'Monster'}/>
                <SimpleInputField value={count} onChange={(val) => setCount(+val)} index={1} htmlId={'count'}
                                  labelText={'count'} required={false} disabled={false}/>
                <button type={'button'} className={styles.addButton} onClick={onMonsterAdd}>Add monster</button>
                <button type={'button'} className={styles.addButton} onClick={onSaveHandler}>Save</button>
            </div>
        </div>
    )
}
export const StageRequireEquipForm: React.FC<TStageRequireQuestItemFormProps> = (props) => {
    const str = 'Equip'
    const [requireData, setRequireData] = useState<string>('')
    const [count, setCount] = useState(0)
    const dataItems = useSelector(RecipeSelectors.getData)
    const materials = useSelector(getMaterialsSelector)
    const components = useSelector(getComponentsSelector)
    const [parts, setParts] = useState<Array<TRecipePart> | null>(null)
    const [equipComp, setEquipComp] = useState<Array<string>>([])

    const onSaveHandler = () => {
        const findRes = dataItems.find(v => v.name === requireData)
        if (findRes !== undefined) props.onSubmit({
            type: {recipe: findRes, components: equipComp} as TEquip,
            count: count
        })
        else console.log(`fail Save ${requireData}`)
    }
    const onRecipeSelectHandler = (value: string) => {
        const findRes = dataItems.find(v => v.name === value)
        if (findRes !== undefined) {
            setRequireData(value)
            setParts(findRes.parts)
        } else {
            console.log('Error in find recipe')
            console.log(value)
        }
    }
    useEffect(() => {
        if (parts === null || parts.length === 0) setEquipComp([])
        else setEquipComp(parts.map(v => '?'))
    }, [parts])
    return (
        <div className={styles.divCol}>
            <div style={{fontSize: '14px', fontWeight: 'bold'}}>
                <p>{`Add ${str} stage`}</p>
            </div>
            <div className={styles.fieldBoxColNoBorder}>
                <SimpleSelectField mapSelectValues={selectFieldsOptions['recipe'] || ['not found']}
                                   value={requireData} onSelChange={onRecipeSelectHandler}
                                   labelText={`${str}`}/>
                {parts?.map((v: TRecipePart, i: number) => {
                    const selectStrings = materials
                        .filter(mat => mat.type === v.component).map(v => v.name)
                        .concat(components.filter(com => com.type === v.component).map(v => v.name))
                    return <SimpleSelectField mapSelectValues={selectStrings || ['not found']}
                                              value={equipComp[i]}
                                              onSelChange={(val) => equipComp[i] = val}
                                              labelText={`${v.component}`}/>
                })}
                <SimpleInputField value={count} onChange={(val) => setCount(+val)} index={1} htmlId={'count'}
                                  labelText={'count'} required={false} disabled={false}/>
                <button type={'button'} className={styles.addButton} onClick={onSaveHandler}>Save</button>
            </div>
        </div>
    )
}

