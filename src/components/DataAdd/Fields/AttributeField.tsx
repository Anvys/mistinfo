import React, {useState} from 'react';
import styles from './Fields.module.css';
import tableStyles from './../../DataView/DataViewTable/DataViewTable.module.css'
import {FormikProps, useFormik} from "formik";
import {AddFields, TSelectFieldOptionsKeys} from "../AddFields";
import {selectFieldsOptions} from "../../../Types/Utils";

type TProps = {
    index: number,
    formik: FormikProps<any>
    dataName: string
};
export const AttributeField: React.FC<TProps> = React.memo((props) => {

    const {formik, index, dataName} = props
    const [attributes, setAttributes] = useState<Array<string>>([])
    const [attribute, setAttribute] = useState('')
    // console.log(`Attribute / ${attributes.length}`)
    const selArr = selectFieldsOptions[`${dataName}.attributes` as TSelectFieldOptionsKeys] as Array<string>
    // if(formik.values.type === 'Substance'){
    //     console.log('sub')
    // }
    const newAttrArr: Array<string> = []
    selArr.forEach((v: string) => { //const checkFilledAttributes = () =>{     }
        if (formik.values.attributes[v]!== undefined && formik.values.attributes[v] !== 0 ) { //&& !attributes.includes(v)
            // console.log(v)
            newAttrArr.push(v)
        }
    })

    if(newAttrArr.length>0 && !newAttrArr.every(v=>attributes.includes(v))) {
        console.log(`-S--`)
        console.log(newAttrArr)
        console.log(attributes)
        console.log(`-E--`)
        // setAttributes(actual=>[...actual, ...newAttrArr])
        setAttributes(newAttrArr)
    }
    const availableAttributes = selArr.filter((v: string) => !attributes.includes(v))
    // console.log(`Attr: ${attribute}, attrs: ${attributes.length}`)
    // console.log(attributes)
    const onAttributeSelect: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        // console.log('--1--')
        setAttribute(e.target.value)

    }
    const onAttributeAdd = (count: number) => {
        // console.log('--2--')
        // console.log(`Added: ${attribute} [${count}]`)
        formik.setFieldValue(`attributes.${attribute}`, count)
        setAttributes([...attributes, attribute])
        setAttribute('')
    }
    const resetAttributes = () => {
        // console.log('--3--')
        attributes.forEach(v => formik.setFieldValue(`attributes.${v}`, 0))
        setAttributes([])
        setAttribute('')
    }
    return (
        <div  className={styles.divRow + ' ' + styles.border} key={index}>
            <div className={styles.fieldBoxCol}>
                <button className={styles.clearButton} type={'button'} onClick={resetAttributes}>Clear All Attributes</button>
                <div className={styles.fieldBoxNoBorder} key={index}>
                    <label className={styles.label} htmlFor={'SelectAttributes'}>{'Attribute to add'}</label>
                    <select defaultValue={''}
                            className={styles.inputText}
                            name={'SelectAttributes'}
                            onChange={onAttributeSelect}
                            value={attribute}
                            required={false}>
                        {<option value="" disabled selected>{`Select attribute`}</option>}
                        {availableAttributes.map((v, i) => (<option key={i} selected={i === 0} value={v}>{v}</option>))}
                    </select>
                </div>
                {attribute !== '' && <AttributeAddForm name={attribute} onAttributeAdd={onAttributeAdd}/>}
            </div>
            <div>
                <table className={tableStyles.table}>
                    <thead>
                        <tr className={tableStyles.headRow}>
                            <th className={tableStyles.th1}>Attribute</th>
                            <th className={tableStyles.th1}>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attributes.length > 0
                            ? attributes.map((v,i) =>
                                <tr className={tableStyles.dataRow} key={i}>
                                    <td className={tableStyles.notEmptyTd}>{v}</td>
                                    <td className={tableStyles.notEmptyTd}>{formik.values.attributes[v]}</td>
                                </tr>)
                            : <tr className={tableStyles.dataRow}><td className={tableStyles.emptyTd} colSpan={2}>{'No one attribute'}</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
})

type TAttributeAddForm = {
    name: string
    onAttributeAdd: (count: number) => void
}
export const AttributeAddForm: React.FC<TAttributeAddForm> = (props) => {
    const [count, setCount] = useState<number | undefined>(undefined)
    const onAddAttribute = () =>{
        console.log('submit attribute')
        props.onAttributeAdd(count || 0)
    }
    const htmlId = `attributes.${props.name}`
    const onValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>{
        setCount(+e.target.value)
    }
    return (
        <div className={styles.divCol}>
            <div className={styles.fieldBox} key={0}>
                <label className={styles.label} htmlFor={htmlId}>{props.name}</label>
                <input className={styles.inputNumber}
                       type={'number'}
                       id={htmlId}
                       name={htmlId}
                       onChange={onValueChange}
                       required={false}
                       disabled={false}
                       autoComplete={'off'}
                       value={count}/>
            </div>
            <button className={styles.addButton} onClick={onAddAttribute}>Add attribute</button>
        </div>
    )
}