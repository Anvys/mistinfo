import React, {useState} from 'react';
import {TDrop, TDropTypes, TLoot, TWOid} from "../../../Types/CommonTypes";
import {FormikErrors, useFormik, useFormikContext} from "formik";
import styles from './Fields.module.css';
import {selectFieldsOptions} from "../AddFields";
import {useSelector} from "react-redux";
import {getComponentsSelector, getMaterialsSelector} from "../../../redux/dataSelectors";

type TProps = {
    index: number
    onAddHandler: (drop: TDrop<TDropTypes>) => void
};
export const FieldDrop: React.FC<TProps> = (props) => {
    // const [dropArr, setDropArr] = useState<Array<TDrop<TDropTypes>>>([])
    const [type, setType] = useState<TDropTypes>('Metal')
    const [name, setName] = useState('')
    const [count, setCount] = useState(0)
    const [chance, setChance] = useState(100)
    const [nameArr, setNameArr] = useState<Array<string>>([])
    const materials = useSelector(getMaterialsSelector)
    const components = useSelector(getComponentsSelector)

    // const formik = useFormikContext()

    const onTypeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const findArr = materials.filter(v => v.type === e.target.value).map(v => v.name)
            .concat(components.filter(v => v.type === e.target.value).map(v => v.name))
        setNameArr(findArr)
        setType(e.target.value as TDropTypes)
    }
    const onAddHandler = ()=>{
        props.onAddHandler({type,name,count,chance})

    }
    return (
            <div key={props.index} className={styles.mainDropDiv}>
                <p>Add drop for loot</p>
                <p>-------</p>
                <div className={styles.fieldBoxColNoBorder}>
                    <div className={styles.fieldBox}>
                        <label className={styles.label} htmlFor={'type'}>type:</label>
                        <select className={styles.inputText} name={'type'} value={type} onChange={onTypeChange}
                                required autoComplete={'off'} placeholder={'type'}>
                            <option value="" disabled selected hidden>{`Select type`}</option>
                            {selectFieldsOptions["component.type"].concat(selectFieldsOptions["material.type"]).map((v) =>
                                <option value={v}>{`${v}`}</option>
                            )}
                        </select>
                    </div>

                    <div className={styles.fieldBox}>
                        <label className={styles.label} htmlFor={'name'}>res:</label>
                        <select className={styles.inputText} name={'name'} value={name} onChange={(e)=>setName(e.target.value)}
                                required autoComplete={'off'} placeholder={'name'}>
                            <option value="" disabled selected hidden>{`Select name`}</option>
                            {selectFieldsOptions.tier.map(v => <option value={`tier ${v}`}>{`All tier ${v} ${type}s`}</option>)}
                            {nameArr.map(v => <option value={v}>{`${v}`}</option>)}
                        </select>
                    </div>

                    <div className={styles.fieldBox}>
                        <label className={styles.label} htmlFor={'count'}>count:</label>
                        <input className={styles.inputNumber} type={'number'} name={'count'} title={'count'}
                               value={count}
                               onChange={e=>setCount(+e.target.value)}
                               required autoComplete={'off'} placeholder={'count'}/>
                    </div>

                    <div className={styles.fieldBox}>
                        <label className={styles.label} htmlFor={'chance'}>chance:</label>
                        <input className={styles.inputNumber} type={'number'} name={'chance'}
                               value={chance}
                               onChange={e=>setChance(+e.target.value)}
                               required autoComplete={'off'} placeholder={'chance'}/>
                    </div>
                    <button className={styles.addButton} type={"button"} onClick={onAddHandler}>ADD</button>
                </div>
            </div>
    );
}