import React, {useEffect, useState} from 'react';
import styles from './Fields.module.css';
import {FormikProps} from "formik";
import {TAbility} from "../../../Types/CommonTypes";
import {InputField, SimpleInputField} from "./InputField";
import {SimpleSelectField} from "./SelectField";
import {selectFieldsOptions} from "../../../Types/Utils";
import {useSelector} from "react-redux";
import {AbilitySelectors} from "../../../redux/dataSelectors";
import {DataView} from "../../DataView/DataView";

type TProps = {
    index: number,
    formik: FormikProps<any>
    dataName: string
};
export const AbilityFiled: React.FC<TProps> = (props) => {
    const {formik, index, dataName} = props
    const [selectedAbi, setSelectedAbi] = useState<TAbility | undefined>(undefined)
    const [abilities, setAbilities] = useState<Array<TAbility>>(() => formik.values.abilities)
    const allAbility = useSelector(AbilitySelectors.getData)
    const onAbiSelect = (aName: string) => {
        if(aName){
            const findRes = allAbility.find(v => v.name === aName)
            if (findRes === undefined) console.error('error in find abilities')
            else setSelectedAbi(findRes)
        }
    }
    const onAbiAdd = () => {
        if (selectedAbi !== undefined) {
            formik.setFieldValue('abilities', [...formik.values.abilities, selectedAbi])
        }
    }
    const onAbiDel = (id: string) =>{
        formik.setFieldValue('abilities', formik.values.abilities.filter((v: TAbility)=>v._id !== id))
    }
    useEffect(() => {
        setAbilities(formik.values.abilities)
    }, [formik.values.abilities])
    return (
        <div className={`${styles.divRow} ${styles.border}`}>
            <div className={styles.fieldBoxCol}>
                <SimpleSelectField mapSelectValues={selectFieldsOptions.ability || ['Empty Abilities db']} value={''}
                                   onSelChange={onAbiSelect} labelText={'Ability'} required={false}/>
                <button type={'button'} className={styles.addButton} onClick={onAbiAdd}>Add</button>
            </div>
            <DataView data={abilities}
                      dataDelHandler={onAbiDel}
                      dataEditHandler={(id: string)=>console.log(`edit: ${id}`)}
                    isMod={true}
            lang={'En'}
            isAddTable={true}/>
        </div>
    );
}