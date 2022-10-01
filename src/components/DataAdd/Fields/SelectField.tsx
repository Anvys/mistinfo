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
            <select //defaultValue={undefined}
                    className={styles.inputText + ' '+  styles.selectWithDef}
                    name={htmlId}
                    onChange={formik.handleChange}
                    value={value}
                    required={required}>
                {labelText !== 'type' && <option className={styles.optionDefault} value="" disabled key={0}>{`Select ${labelText}`}</option>}
                {mapSelectValues?.length>0 && mapSelectValues.map((v, i) => (<option key={i+1} value={v}>{v}</option>))}
            </select>
        </div>
    );
}

type TSelectSimpleField = {
    mapSelectValues: Array<string> | Array<number>,
    value: string | number | readonly string[] | undefined,
    onSelChange: (value: string)=>void
    labelText: string
    required?: boolean
};
export const SimpleSelectField:React.FC<TSelectSimpleField> = (props) => {
    const { value,mapSelectValues, onSelChange, labelText, } = props
    const required = props.required === undefined? false: props.required
    const [val, setVal] = useState(value || '')
    console.log(labelText, val)
    useEffect(()=>{
        onSelChange(val as string)
    },[val])
    useEffect(()=>{
        if(value !== val) setVal(value as string)
    },[value])
    return (
        <div className={styles.fieldBox} key={0}>
            <label className={styles.label} htmlFor={`htmlId`}>{labelText}</label>
            <select
                // defaultValue={''}
                    className={styles.inputText + ' '+  styles.selectWithDef}
                    name={`htmlId`}
                    onChange={e=>setVal(e.target.value)}
                    value={val}
                    required={required|| false}>
                {labelText !== 'type' && <option className={styles.optionDefault} value='' disabled key={0}>{`Select ${labelText}`}</option>}
                {mapSelectValues.map((v, i) => (<option key={i+1} value={v}>{v}</option>))}
            </select>
        </div>
    );
}
type TSimpleBooleanField = {
    // mapSelectValues: Array<string> | Array<number>,
    value: boolean,
    onSelChange: (value: boolean)=>void
    labelText: string
    required?: boolean
};
export const SimpleBooleanField:React.FC<TSimpleBooleanField> = (props) => {
    const { value, onSelChange, labelText, } = props
    const required = props.required === undefined? false: props.required
    const [val, setVal] = useState(()=>value)
    console.log(`labelText=${labelText}`)
    useEffect(()=>{
        onSelChange(val)
    },[val])
    useEffect(()=>{
        if(value !== val) setVal(value)
    },[value])
    return (
        <div className={styles.fieldBox} key={0}>
            <label className={styles.label} htmlFor={`htmlId`}>{labelText}</label>
            <input type={'checkbox'} checked={val} onChange={e=>setVal(e.target.checked)} required={required}/>
        </div>
    );
}