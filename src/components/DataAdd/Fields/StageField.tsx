import React, {useEffect, useState} from 'react';
import styles from "./Fields.module.css";
import tableStyles from "./../../DataView/DataViewTable/DataViewTable.module.css";

import {
    TAdventure,
    TDrop,
    TDropTypes,
    TExpr, TLoot,
    TRequireAdventure,
    TStage,
    TStageRequire
} from "../../../Types/CommonTypes";
import {selectFieldsOptions} from "../../../Types/Utils";
import {useSelector} from "react-redux";
import {getLootByNameSelector} from "../../../redux/dataSelectors";
import {FormikProps} from "formik";

type TProps = {
    formik: FormikProps<any>
    onStageAdd: (req: TStage)=>void
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
    const [req, setReq] = useState<TStageRequire>(()=>({adventure:'Academic', count:0}))
    // console.log(`find loot ${loot} /  ${loot.split('#')[1]} : ${useSelector(getLootByNameSelector(loot))}`)
    const findLoot = useSelector(getLootByNameSelector(loot))
    console.log(`stages: ${formik.values.stages.length}`)
    //formik.values.stages.length>0?formik.values.stages : []
    const [stages, setStages] = useState<Array<TStage>>(()=>formik.values.stages)
    const stageKeys = ['num','expr','name', 'type', 'require', 'time', 'loot']

    const onTypeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        setType(e.target.value)
    }
    const onRequireAdd = (req: TStageRequire) => {
        setReq(req)
        console.log(req)
        // setType('')
        // props.onStageAdd(req)
    }
    const onStageAdd = () =>{
        const newStage = {num,name: name==='Stage' ? `Stage ${num}` : name,expr,type,require: req, time, loot: findLoot || null} as TStage
        // console.log('Add new stage')
        // console.log(newStage)
        // formik.setFieldValue('stages', [...formik.values.stages, newStage])
        // setStages(actual=>[...actual, newStage])
        formik.setFieldValue('stages', [...stages, newStage])
    }
    const onStageDelHandler = (index: number) =>{
        formik.setFieldValue('stages', formik.values.stages.filter((v:any,i:number)=>i!==index))
        // setStages(actual=>actual.filter((v,i)=>i!==index))
    }
    // useEffect(()=>{
    //     formik.setFieldValue('stages', stages)
    // },[stages])
    useEffect(()=>{
        setStages(formik.values.stages)
    },[formik.values.stages])
    return (
        <div className={styles.divRow}>
            <div className={styles.divCol} style={{width: '200px'}}>
                <div className={styles.divRow}>
                    <div className={styles.fieldBox}>
                        <label htmlFor={'type'}>reqtype:</label>
                        <select className={styles.inputText} name={'type'} value={type} onChange={onTypeChange}
                                autoComplete={'off'} placeholder={'type'}>
                            <option value="" disabled selected hidden>{`Select type`}</option>
                            {selectFieldsOptions['stage.type'].map(v => <option value={v}>{`${v}`}</option>)}
                        </select>
                    </div>

                </div>
                <p style={{fontSize: '16px', fontWeight: 'bold'}}>{`Cur req: ${req.adventure}: ${req.count}`}</p>


                {type === 'Adventure' && <StageAdventureForm onSubmit={onRequireAdd}/>}

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
                    <select className={styles.inputText} name={'expr'} value={expr} onChange={e=>setExpr(e.target.value as TExpr)}
                            required autoComplete={'off'} placeholder={'expr'}>
                        <option value="" disabled selected hidden>{`Select expr`}</option>
                        {selectFieldsOptions['stage.expr'].map(v => <option value={v}>{`${v}`}</option>)}
                    </select>
                </div>
                <div className={styles.fieldBoxNoBorder}>
                    <label className={styles.label} htmlFor={'loot'}>loot:</label>
                    <select className={styles.inputText} name={'loot'} value={loot} onChange={e=>setLoot(e.target.value)}
                            autoComplete={'off'} placeholder={'expr'}>
                        <option value="" disabled selected hidden>{`no loot`}</option>
                        {selectFieldsOptions['loot']?.map(v => <option value={v}>{`${v}`}</option>)}
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
                            {stageKeys.map(v => <td>{v}</td>)}
                        </tr>
                    </thead>
                    <tbody>
                        {stages.map((st,i)=>
                        <tr key={st.num*10+i}>
                            {/*{Object.entries(st).map(([key, val]:[string, any])=>{*/}
                            {stageKeys.map((key,i)=>{
                                const val:any = st[key as keyof typeof st]
                                switch (key) {
                                    case 'require': return <td>{Object.entries(val).map(([r1,r2], i,arr)=>`${r2}${i<arr.length-1?': ':''}`)}</td>
                                    case 'loot': return <td>{val?.map((drop: TDrop<TDropTypes>, i: number) => `${drop.type}#${drop.name}#x${drop.count}(${drop.chance}%)${i < val.length-1 ? '\n':''}`)}</td>
                                    case '_id' : return null
                                    default: return <td>{val as string}</td>
                                }

                            })}
                            <td><button type={'button'} className={styles.deleteButton} onClick={() => onStageDelHandler(i)}/></td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>

    );
}
type TStageAdventureFormProps = {
    onSubmit: (require: TRequireAdventure) => void
};
export const StageAdventureForm: React.FC<TStageAdventureFormProps> = (props) => {
    const [adventure, setAdventure] = useState<TAdventure>('Academic')
    const [count, setCount] = useState(0)
    // const formik = useFormik({
    //     initialValues: {
    //         adventure: 'Academic',
    //         count: 0,
    //     } as TRequireAdventure,
    //     onSubmit: async (values, actions) => {
    //         props.onSubmit({...values})
    //         formik.handleReset(0)
    //     }
    // })
    const onSaveHandler = () =>{
        props.onSubmit({adventure, count})
    }
    return (
        <div className={styles.divCol}>
            <p>Add adventure stage</p>
            <div className={styles.fieldBoxColNoBorder}>
                <div className={styles.fieldBox}>
                    <label className={styles.label}  htmlFor={'adventure'}>skill:</label>
                    <select className={styles.inputText} name={'adventure'} value={adventure} onChange={(e)=>setAdventure(e.target.value as TAdventure)}
                            required autoComplete={'off'} placeholder={'adventure'}>
                        <option value="" disabled selected hidden>{`Select adventure`}</option>
                        {selectFieldsOptions['adventure'].map(v => <option value={v}>{`${v}`}</option>)}
                    </select>
                </div>
                <div className={styles.fieldBox}>
                    <label className={styles.label} htmlFor={'count'}>count:</label>
                    <input className={styles.inputNumber} type={'number'} name={'count'} value={count}
                           onChange={(e)=>setCount(+e.target.value)}
                           required autoComplete={'off'} placeholder={'count'}>
                    </input>
                </div>
                <button type={'button'} className={styles.addButton} onClick={onSaveHandler}>Save</button>
            </div>
        </div>
    )
}