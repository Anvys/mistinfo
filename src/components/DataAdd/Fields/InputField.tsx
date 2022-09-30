import React from 'react';
import styles from './Fields.module.css';
import {FormikProps} from "formik";

type TProps = {
    value: string | number | readonly string[] | undefined,
    formik: FormikProps<any>
    index: number
    htmlId: string
    labelText: string
    required: boolean
    disabled: boolean
};
export const InputField:React.FC<TProps> = (props) => {
    const {index, htmlId, labelText, formik, required, disabled, value} = props
    const valueType = typeof value;
    return (
        <div className={styles.fieldBox} key={index}>
            <label className={styles.label} htmlFor={htmlId}>{labelText}</label>
            <input className={valueType === 'string' ? styles.inputText : styles.inputNumber}
                   type={valueType === 'string' ? 'text': 'number'}
                   id={htmlId}
                   name={htmlId}
                   onChange={formik.handleChange}
                   required={required}
                   disabled={disabled}
                   autoComplete={'off'}

                   value={value}/>
        </div>
    );
}

type TSimpleInputFieldProps = {
    value: string | number | readonly string[] | undefined,
    onChange: (value: string)=>void
    index?: number
    htmlId?: string
    labelText: string
    required?: boolean
    disabled?: boolean
};
export const SimpleInputField:React.FC<TSimpleInputFieldProps> = (props) => {
    const {index, htmlId, labelText, required, disabled, value, onChange} = props
    const valueType = typeof value;
    return (
        <div className={styles.fieldBox} key={index||0}>
            <label className={styles.label} htmlFor={htmlId}>{labelText}</label>
            <input className={valueType === 'string' ? styles.inputText : styles.inputNumber}
                   type={valueType === 'string' ? 'text': 'number'}
                   id={htmlId||labelText}
                   name={htmlId||labelText}
                   onChange={e=>onChange(e.target.value)}
                   required={required || false}
                   disabled={disabled || false}
                   autoComplete={'off'}
                   value={value}/>
        </div>
    );
}