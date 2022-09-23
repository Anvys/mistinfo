import React, {useEffect, useState} from 'react';
import styles from "./Fields.module.css";
import tableStyles from "./../../DataView/DataViewTable/DataViewTable.module.css";

import {
    NO_LOOT,
    TAdventure, TCombineData,
    TDrop,
    TDropTypes, TEquip,
    TExpr, TLoot, TQuestItem, TRecipePart,
    TRequireAdventure, TRequireQuestItem,
    TStage,
    TStageRequire
} from "../../../Types/CommonTypes";
import {selectFieldsOptions, TSelectFieldsKeys} from "../../../Types/Utils";
import {useSelector} from "react-redux";
import {
    getComponentsSelector,
    getLootByNameSelector,
    getMaterialsSelector,
    QuestItemSelectors,
    RecipeSelectors,
    TSelectors
} from "../../../redux/dataSelectors";
import {FormikProps} from "formik";
import {SimpleSelectField} from "./SelectField";
import {SimpleInputField} from "./InputField";

type TProps = {
    formik: FormikProps<any>
    onStageAdd: (req: TStage) => void
};
export const StageField: React.FC<TProps> = (props) => {
    const {formik} = props

    const [type, setType] = useState('Adventure')
    const [name, setName] = useState('Stage')
    const [expr, setExpr] = useState<TExpr>('or')
    const [num, setNum] = useState(1)
    const [proc, setProc] = useState(100)
    const [time, setTime] = useState(0)
    const [loot, setLoot] = useState('')
    const [req, setReq] = useState<TStageRequire>(() => ({type: 'Academic', count: 0}))
    // console.log(`find loot ${loot} /  ${loot.split('#')[1]} : ${useSelector(getLootByNameSelector(loot))}`)
    const findLoot = useSelector(getLootByNameSelector(loot))
    console.log(`stages: ${formik.values.eStages.length}`)
    //formik.values.stages.length>0?formik.values.stages : []
    const [stages, setStages] = useState<Array<TStage>>(() => formik.values.eStages)
    const stageKeys = ['num', 'expr', 'name', 'type', 'require', 'time', 'loot']

    const onTypeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        setType(e.target.value)
    }
    const onRequireAdd = (req: TStageRequire) => {
        setReq(req)
        console.log(req)
        // setType('')
        // props.onStageAdd(req)
    }
    const onStageAdd = () => {
        const newStage: TStage = {
            num,
            proc,
            name: name === 'Stage' ? `Stage ${num}` : name,
            expr,
            type,
            require: req,
            time,
            loot: findLoot || null
        }
        // console.log('Add new stage')
        // console.log(newStage)
        // formik.setFieldValue('stages', [...formik.values.stages, newStage])
        // setStages(actual=>[...actual, newStage])
        formik.setFieldValue('eStages', [...stages, newStage])
    }
    const onStageDelHandler = (index: number) => {
        formik.setFieldValue('eStages', formik.values.eStages.filter((v: any, i: number) => i !== index))
        // setStages(actual=>actual.filter((v,i)=>i!==index))
    }
    // useEffect(()=>{
    //     formik.setFieldValue('stages', stages)
    // },[stages])
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
                            <option value="" disabled hidden  key={0}>{`Select type`}</option>
                            {selectFieldsOptions['eStage.type'].map((v,i) => <option value={v} key={i+1}>{`${v}`}</option>)}
                        </select>
                    </div>

                </div>
                <p style={{fontSize: '16px', fontWeight: 'bold'}}>{`Cur req: ${req.type}: ${req.count}`}</p>


                {type === 'Adventure' && <StageAdventureForm onSubmit={onRequireAdd}/>}
                {type === 'Resource' && <div>TODO</div>}
                {type === 'Battle' && <div>TODO</div>}

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
                        {selectFieldsOptions['stage.expr'].map((v,i) => <option value={v} key={i+1}>{`${v}`}</option>)}
                    </select>
                </div>
                <div className={styles.fieldBoxNoBorder}>
                    <label className={styles.label} htmlFor={'loot'}>loot:</label>
                    <select className={styles.inputText} name={'loot'} value={loot}
                            onChange={e => setLoot(e.target.value)}
                            autoComplete={'off'} placeholder={'expr'}>
                        <option value="" disabled hidden key={0}>{NO_LOOT}</option>
                        {selectFieldsOptions['loot']?.map((v,i) => <option value={v}  key={i+1}>{`${v}`}</option>)}
                    </select>
                </div>
                <button className={styles.addButton} type={'button'} onClick={onStageAdd}>AddStage</button>
            </div>
            <div className={tableStyles.vidInFields}>
                <table className={tableStyles.table}>
                    <thead>
                        <tr className={tableStyles.headRow}>
                            <th colSpan={stageKeys.length}>Event STAGES</th>
                        </tr>
                        <tr>
                            {stageKeys.map((v,i) => <td key={i}>{v}</td>)}
                        </tr>
                    </thead>
                    <tbody>
                        {stages.map((st, i) =>
                            <tr key={st.num * 10 + i}>
                                {/*{Object.entries(st).map(([key, val]:[string, any])=>{*/}
                                {stageKeys.map((key, j) => {
                                    const val: any = st[key as keyof typeof st]
                                    switch (key) {
                                        case 'require':
                                            return <td key={j}>{Object.entries(val).map(([r1, r2], i, arr) => `${r2}${i < arr.length - 1 ? ': ' : ''}`)}</td>
                                        case 'loot':
                                            return <td key={j}>{val?.map((drop: TDrop<TDropTypes>, i: number) => `${drop.type}#${drop.name}#x${drop.countMin}-${drop.countMax}(${drop.chance}%)${i < val.length - 1 ? '\n' : ''}`)}</td>
                                        case '_id' :
                                            return null
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
    const [adventure, setAdventure] = useState<TAdventure>('Academic')
    const [count, setCount] = useState(0)
    const onSaveHandler = () => {
        props.onSubmit({type: adventure, count})
    }
    return (
        <div className={styles.divCol}>
            <p>Add adventure stage</p>
            <div className={styles.fieldBoxColNoBorder}>
                <SimpleSelectField mapSelectValues={[...selectFieldsOptions['adventure']]} value={adventure}
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
            <p>Add quest item stage</p>
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
        if (findRes !== undefined) props.onSubmit({type: {recipe: findRes, components: equipComp} as TEquip, count: count})
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
    useEffect(()=>{
        if(parts === null || parts.length===0) setEquipComp([])
        else setEquipComp(parts.map(v=>'?'))
    },[parts])
    return (
        <div className={styles.divCol}>
            <p>{`Add ${str} stage`}</p>
            <div className={styles.fieldBoxColNoBorder}>
                <SimpleSelectField mapSelectValues={selectFieldsOptions['recipe'] || ['not found']}
                                   value={requireData} onSelChange={onRecipeSelectHandler}
                                   labelText={`${str}`}/>
                {parts?.map((v: TRecipePart, i: number) => {
                    const selectStrings = materials
                        .filter(mat=>mat.type===v.component).map(v=>v.name)
                        .concat(components.filter(com=>com.type===v.component).map(v=>v.name))
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

