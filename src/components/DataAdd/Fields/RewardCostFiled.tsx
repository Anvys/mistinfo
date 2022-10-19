import React, {useEffect, useState} from 'react';
import styles from './Fields.module.css';
import {FormikProps} from "formik";
import {InputField, SimpleInputField} from "./InputField";
import {SimpleSelectField} from "./SelectField";
import {selectFieldsOptions} from "../../../Types/Utils";
import {useSelector} from "react-redux";
import {AbilitySelectors, CompanionSelectors, MaterialSelectors} from "../../../redux/dataSelectors";
import {DataView} from "../../DataView/DataView";
import {TAbility} from "../../../Types/MainEntities";

type TProps = {
    index: number,
    formik: FormikProps<any>
    dataName: string
    field: string
};
export const RewardCostFiled: React.FC<TProps> = (props) => {
    const {formik, index, dataName, field} = props
    // console.log('inReward', field, formik.values, formik.values[field])
    const [name, setName] = useState(() => formik.values[field].name)
    const [type, setType] = useState(() => formik.values[field].type)
    const [count, setCount] = useState(() => formik.values[field].count)
    const resources = [...useSelector(MaterialSelectors.getData), ...useSelector(CompanionSelectors.getData)]

    const selectTypeArr = ['', 'currency', ...selectFieldsOptions["material.type"], ...selectFieldsOptions["component.type"]]
    const selectNameArr = getSelectNameArr(type)

    function getSelectNameArr(type: typeof selectTypeArr[number]) {
        switch (type) {
            case '':
                return []
            case 'currency':
                return [...selectFieldsOptions.currency]
            default:
                return resources.filter(v => v.type === type).map(v => v.name)
        }
    }

    const onRewardAdd = () => {
        const newObj = {type, name, count}
        formik.setFieldValue(field, newObj)
    }
    useEffect(() => {
        setType(formik.values[field].type)
        setName(formik.values[field].name)
        setCount(formik.values[field].count)
    }, [formik.values[field]])
    return (
        <div className={`${styles.divRow} ${styles.border}`} key={index}>
            <div className={styles.fieldBoxCol}>
                {`${field} [${formik.values[field].name===''?'Empty':'Added!'}]`}
                <SimpleSelectField mapSelectValues={selectTypeArr} value={type}
                                   onSelChange={val => setType(val)} labelText={'type'}/>
                {type!=='' && <><SimpleSelectField mapSelectValues={selectNameArr} value={name}
                                   onSelChange={val => setName(val)} labelText={'name'}/>
                <SimpleInputField value={count} onChange={val => setCount(+val)} labelText={'count'}/>
                <button type={'button'} className={styles.addButton} onClick={onRewardAdd}>Add</button>
                </>}
            </div>
        </div>
    );
}