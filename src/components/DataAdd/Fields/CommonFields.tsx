import React from 'react';
import {getWeight} from "../../../Unils/utilsFunctions";
import {AddFields, selectFieldsOptions, TSelectFieldOptionsKeys} from "../AddFields";
import {FormikProps} from "formik";
import {AttributeField} from "./AttributeField";
import {LootField} from "./LootField";
// import styles from './CommonFields.module.css';


export const fieldsIgnoreList = ['name', '_id',]
export const fieldsNotRequiredList = ['Ru', 'Fr']
export const fieldsDisabled = ['staminaelixir.translate.En','staminaelixir.translate.Ru','staminaelixir.translate.Fr']
export const commonFields = (
    formik: FormikProps<any>,
    key:string,
    values: object,
    dataName: string): JSX.Element => {
    const entries = Object.entries(values).sort((a, b) => getWeight(a[0]) - getWeight(b[0]))
    return (
        <>
            {entries.map(([eKey, value], i) => {
                const curKey = key.length ? `${key}.${eKey}` : eKey
                const selectPathToFind = eKey === 'type' ? `${dataName}.${eKey}` : `${eKey}`
                const selArr = selectFieldsOptions[`${selectPathToFind}` as TSelectFieldOptionsKeys];
                const isSelectAvailable = selArr?.length && selArr?.length > 0
                switch (true) {
                    case fieldsIgnoreList.includes(eKey):
                        return null
                    case eKey==='pos':
                        return AddFields.posField(value['x'], value['y'], curKey, i, formik)
                    case eKey==='icon':
                        return AddFields.icon(formik, i+100, dataName === 'staminaelixir')
                    case eKey==='attributes':
                        return <AttributeField formik={formik} index={i} dataName={dataName}/>
                    case eKey==='loot' && dataName==='loot':
                        return <LootField formik={formik} index={i} dataName={dataName}/>
                    case isSelectAvailable:
                        return AddFields.select(selArr as string[] | number[],value, formik,curKey,eKey,i+50,true )

                    case typeof value ==='number':
                        return AddFields.input('number',value, formik,curKey,eKey,i,!fieldsNotRequiredList.includes(eKey),fieldsDisabled.includes(`${dataName}.${curKey}`))

                    case typeof value ==='string':
                        return AddFields.input('text',value, formik,curKey,eKey,i,!fieldsNotRequiredList.includes(eKey),fieldsDisabled.includes(`${dataName}.${curKey}`))
                    case typeof value==='object' :
                        return commonFields(formik,curKey, value,dataName)

                    default:
                        console.error(`Default in commonFields// ekey: ${eKey},${curKey},${value},${typeof value}`)
                }
            })}
        </>
    )
}


type TProps = {};
export const CommonFields: React.FC<TProps> = (props) => {
    return (
        <div>

        </div>
    );
}