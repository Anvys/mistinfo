import React, {useState} from 'react';
import {TDrop, TDropTypes, TWOid} from "../../../Types/CommonTypes";
import {FormikErrors, useFormik, useFormikContext} from "formik";
import styles from './Fields.module.css';
import {useSelector} from "react-redux";
import {
    AbilitySelectors, ComponentSelectors,
    getComponentsSelector,
    getMaterialsSelector,
    MaterialSelectors
} from "../../../redux/dataSelectors";
import {selectFieldsOptions} from "../../../Types/Utils";
import {TLoot} from "../../../Types/MainEntities";

type TProps = {
    index: number
    onAddHandler: (drop: TDrop<TDropTypes>) => void
};
export const FieldDrop: React.FC<TProps> = (props) => {
    // const [dropArr, setDropArr] = useState<Array<TDrop<TDropTypes>>>([])
    const [type, setType] = useState<TDropTypes>('Metal')
    const [name, setName] = useState('')
    const [countMin, setCountMin] = useState(0)
    const [countMax, setCountMax] = useState(0)
    const [chance, setChance] = useState(100)
    const [nameArr, setNameArr] = useState<Array<string>>([])
    const materials = useSelector(MaterialSelectors.getData)
    const components = useSelector(ComponentSelectors.getData)
    const ability = useSelector(AbilitySelectors.getData)
    const abilityArr = ability.map(v=>v.name)
    // const formik = useFormikContext()
    const bookArr = [...selectFieldsOptions["adventure"], ...selectFieldsOptions["weapon"],
        ...selectFieldsOptions["crafting"], ...selectFieldsOptions["terrain"],...selectFieldsOptions["gatherpoint.type"]]
    const reputationArr = [...selectFieldsOptions["reputation.guild"], ...selectFieldsOptions["reputation.town"]]
    const lootTypes = ['Book','Reputation','Ability', ...selectFieldsOptions['material.type'], ...selectFieldsOptions['component.type']]
    const onTypeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        switch (e.target.value) {
            case 'Resource':
                setNameArr(materials.filter(v => v.type === e.target.value).map(v => v.name)
                    .concat(components.filter(v => v.type === e.target.value).map(v => v.name)))
                break
            case 'Reputation':
                setNameArr(reputationArr)
                break
            case 'Book':
                setNameArr(bookArr)
                break
            case 'Ability':
                setNameArr(abilityArr)
                break
        }
        // const findArr = materials.filter(v => v.type === e.target.value).map(v => v.name)
        //     .concat(components.filter(v => v.type === e.target.value).map(v => v.name))
        // setNameArr(findArr)
        setType(e.target.value as TDropTypes)
    }
    const onAddHandler = ()=>{
        props.onAddHandler({type,name,countMin, countMax,chance})

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
                            {lootTypes.map((v) =>
                                <option value={v}>{`${v}`}</option>
                            )}
                        </select>
                    </div>

                    <div className={styles.fieldBox}>
                        <label className={styles.label} htmlFor={'name'}>res:</label>
                        <select className={styles.inputText} name={'name'} value={name} onChange={(e)=>setName(e.target.value)}
                                 autoComplete={'off'} placeholder={'name'}>
                            <option value="" disabled selected hidden>{`Select name`}</option>
                            {type !=='Book' && type !== 'Reputation' && type !== 'Ability' && selectFieldsOptions.tier.map(v => <option value={`tier ${v}`}>{`All tier ${v} ${type}s`}</option>)}
                            {nameArr.map(v => <option value={v}>{`${v}`}</option>)}
                        </select>
                    </div>

                    <div className={styles.fieldBox}>
                        <label className={styles.label} htmlFor={'count'}>min count:</label>
                        <input className={styles.inputNumber} type={'number'} name={'mincount'} title={'min count'}
                               value={countMin}
                               onChange={e=>{
                                   const val = +e.target.value
                                   if(countMax< val)setCountMax(val)
                                   setCountMin(val)
                               }}
                               required autoComplete={'off'} placeholder={'count'}/>
                    </div>
                    <div className={styles.fieldBox}>
                        <label className={styles.label} htmlFor={'count'}>max count:</label>
                        <input className={styles.inputNumber} type={'number'} name={'maxcount'} title={'max count'}
                               value={countMax}
                               onChange={e=>setCountMax(+e.target.value)}
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