import React, {useEffect, useState} from 'react';
import styles from './Fields.module.css';
import ts from "./../../DataView/DataViewTable/DataViewTable.module.css";
import {FormikProps} from "formik";
import {TAbility, TRecipePart} from "../../../Types/CommonTypes";
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
export const RecipePartField: React.FC<TProps> = (props) => {
    const {formik, index, dataName} = props
    const [selectedRecipePart, setSelectedRecipePart] = useState<TRecipePart | undefined>(undefined)
    const [recipeParts, setRecipeParts] = useState<Array<TRecipePart>>(() => formik.values.parts)

    const [partName, setPartName] = useState('')
    const [partComp, setPartComp] = useState('')
    const [partCount, setPartCount] = useState(0)
    // const allAbility = useSelector(AbilitySelectors.getData)
    // const onCompSelect = (aName: string) => {
    //     // const findRes = allAbility.find(v => v.name === aName)
    //     // if (findRes === undefined) console.error('error in find recipeParts')
    //     else setPartComp(aName)
    // }
    const onPartAdd = () => {
        if (partName && partComp && partCount) {
            formik.setFieldValue('parts',
                [...formik.values.parts, {name: partName, component: partComp, count: partCount}])
        }
    }
    const onAbiDel = (id: string) =>{
        formik.setFieldValue('abilities', formik.values.abilities.filter((v: TAbility)=>v._id !== id))
    }
    useEffect(() => {
        setRecipeParts(formik.values.parts)
    }, [formik.values.parts])

    const tableKeys = ['name', 'component', 'count']
    return (
        <div className={`${styles.divRow} ${styles.border}`}>
            <div className={styles.fieldBoxCol}>
                <SimpleInputField value={partName} onChange={(name: string) => setPartName(name)} index={0} htmlId={'name'} labelText={'name'} required={true} disabled={false}/>
                <SimpleSelectField mapSelectValues={selectFieldsOptions.material?.concat(selectFieldsOptions.component || []) || ['Empty component & material db']} value={partComp}
                                   onSelChange={(comp: string) => setPartComp(comp)} labelText={'Component'}/>
                <SimpleInputField value={partCount} onChange={(count: string) => setPartCount(+count)} index={2} htmlId={'count'} labelText={'count'} required={true} disabled={false}/>
                <button type={'button'} className={styles.addButton} onClick={onPartAdd}>Add</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr className={ts.headRow}><td className={ts.th2} colSpan={3}>PARTS</td></tr>
                        <tr className={ts.headRow}>
                            {tableKeys.map((v,i)=><td className={ts.th2}>{v}</td>)}
                        </tr>
                    </thead>
                    <tbody>
                        {recipeParts.map((v,i)=>
                        <tr className={ts.dataRow}>
                            {tableKeys.map((val,i)=>
                            <td className={ts.th1}>{v[val as keyof typeof v]}</td>
                            )}
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/*<DataView data={recipeParts}*/}
            {/*          dataDelHandler={onAbiDel}*/}
            {/*          dataEditHandler={(id: string)=>console.log(`edit: ${id}`)}*/}
            {/*        isMod={true}*/}
            {/*lang={'En'}*/}
            {/*isAddTable={true}/>*/}
        </div>
    );
}