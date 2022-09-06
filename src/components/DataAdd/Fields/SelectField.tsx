import React, {useEffect, useState} from 'react';
import styles from './Fields.module.css';
import {FormikProps} from "formik";

type TProps = {
    mapSelectValues: Array<string> | Array<number>,
    value: string | number | readonly string[] | undefined,
    formik: FormikProps<any>
    index: number
    htmlId: string
    labelText: string
    required: boolean
    disabled: boolean
};
export const SelectField:React.FC<TProps> = (props) => {
    const {index, htmlId, labelText, formik, required, disabled, value,mapSelectValues} = props

    return (
        <div className={styles.fieldBox} key={index}>
            <label className={styles.label} htmlFor={htmlId}>{labelText}</label>
            <select defaultValue={mapSelectValues[0]}
                    className={styles.inputText}
                    name={htmlId}
                    onChange={formik.handleChange}
                    value={value}
                    required={required}>
                {labelText !== 'type' && <option value="" disabled selected>{`Select ${labelText}`}</option>}
                {mapSelectValues.map((v, i) => (<option key={i} selected={i === 0} value={v}>{v}</option>))}
            </select>
        </div>
    );
}

type TSelectSimpleField = {
    mapSelectValues: Array<string> | Array<number>,
    value: string | number | readonly string[] | undefined,
    onSelChange: (value: string)=>void
    labelText: string
};
export const SelectSimpleField:React.FC<TSelectSimpleField> = (props) => {
    const { value,mapSelectValues, onSelChange, labelText} = props
    const [val, setVal] = useState(value)
    useEffect(()=>{
        onSelChange(val as string)
    },[val])

    return (
        <div className={styles.fieldBox} key={0}>
            <label className={styles.label} htmlFor={`htmlId`}>{labelText}</label>
            <select defaultValue={mapSelectValues[0]}
                    className={styles.inputText}
                    name={`htmlId`}
                    onChange={e=>setVal(e.target.value)}
                    value={val}
                    required={true}>
                {labelText !== 'type' && <option value="" disabled selected>{`Select ${labelText}`}</option>}
                {mapSelectValues.map((v, i) => (<option key={i} selected={i === 0} value={v}>{v}</option>))}
            </select>
        </div>
    );
}