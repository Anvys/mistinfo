import React, {useEffect, useState} from 'react';
import styles from './Fields.module.css';
import {useSelector} from "react-redux";
import {LootSelectors} from "../../../redux/dataSelectors";
import {selectFieldsOptions} from "../../../Types/Utils";
import {NO_LOOT, TLoot} from "../../../Types/CommonTypes";
import {FormikProps} from "formik";
// import styles from './LootAddField.module.css';

type TProps = {
    index: number,
    formik: FormikProps<any>
    dataName: string
    // onAdd:(loot:TLoot | typeof NO_LOOT)=>void
};
export const LootAddField:React.FC<TProps> = (props) => {
    const {formik} = props
    const [loot, setLoot] = useState<string | typeof NO_LOOT>(()=>formik.values.loot.name)
    const loots = useSelector(LootSelectors.getData)
    const onLootChangeHandler:React.ChangeEventHandler<HTMLSelectElement> = (e) =>{
        const eName = e.target.value
        const findRes = loots.find(v=>v.name === eName) || NO_LOOT
        formik.setFieldValue('loot', findRes)
        console.log(findRes)
    }
    useEffect(()=>{
        setLoot(formik.values.loot.name)
    }, [formik.values.loot])
    return (
        <div className={styles.fieldBoxNoBorder}>
        <label className={styles.label} htmlFor={'loot'}>loot:</label>
        <select className={styles.inputText} name={'loot'} value={loot}
                onChange={onLootChangeHandler}
                autoComplete={'off'} placeholder={'loot'}>
            <option value="" disabled hidden key={0}>{NO_LOOT}</option>
            {selectFieldsOptions['loot']?.map((v, i) => <option value={v} key={i + 1}>{`${v}`}</option>)}
        </select>
    </div>
    );
}