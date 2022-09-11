import React, {useEffect, useState} from 'react';
import styles from './Fields.module.css';
import ts from "./../../DataView/DataViewTable/DataViewTable.module.css";
import {FormikProps} from "formik";
import {TAbility, TQuest} from "../../../Types/CommonTypes";
import {InputField, SimpleInputField} from "./InputField";
import {SimpleSelectField} from "./SelectField";
import {selectFieldsOptions} from "../../../Types/Utils";
import {useSelector} from "react-redux";
import {AbilitySelectors, getQuestSelector} from "../../../redux/dataSelectors";
import {DataView} from "../../DataView/DataView";

type TProps = {
    index: number,
    formik: FormikProps<any>
    dataName: string
};
export const EvoQuestField: React.FC<TProps> = (props) => {
    const {formik, index, dataName} = props
    const [selectedQuest, setSelectedQuest] = useState<string | undefined>(undefined)
    const [quests, setQuests] = useState<Array<string>>(() => formik.values.evoQuests)
    const allQuests = useSelector(getQuestSelector)
    // const [partName, setPartName] = useState('')
    // const [partComp, setPartComp] = useState('')
    // const [partCount, setPartCount] = useState(0)

    // const onCompSelect = (aName: string) => {
    //     // const findRes = allAbility.find(v => v.name === aName)
    //     // if (findRes === undefined) console.error('error in find quests')
    //     else setPartComp(aName)
    // }
    const onQuestAdd = () => {
        // console.log(selectedQuest)
        if (selectedQuest !== undefined && selectedQuest.length>0 && !quests.includes(selectedQuest)) {
            formik.setFieldValue('evoQuests', [...formik.values.evoQuests, selectedQuest])
        }
    }
    const onAbiDel = (name: string) =>{
        formik.setFieldValue('evoQuests', formik.values.evoQuests.filter((v: string)=>v !== name))
    }
    useEffect(() => {
        setQuests(formik.values.evoQuests)
    }, [formik.values.evoQuests])

    const tableKeys = ['name']
    return (
        <div className={`${styles.divRow} ${styles.border}`}>
            <div className={styles.fieldBoxColNoBorder}>
                {/*<SimpleInputField value={partName} onChange={(name: string) => setPartName(name)} index={0} htmlId={'name'} labelText={'name'} required={true} disabled={false}/>*/}
                <SimpleSelectField mapSelectValues={selectFieldsOptions.quest || ['Empty quests db']} value={undefined}
                                   onSelChange={(quest: string) => setSelectedQuest(quest)} labelText={'Quest'}/>
                {/*<SimpleInputField value={partCount} onChange={(count: string) => setPartCount(+count)} index={2} htmlId={'count'} labelText={'count'} required={true} disabled={false}/>*/}
                <button type={'button'} className={styles.addButton} onClick={onQuestAdd}>Add</button>
            </div>
            <div className={ts.vidInFields} style={{minWidth: '200px'}}>
                <table className={ts.table} style={{minWidth: '200px'}}>
                    <thead>
                        <tr className={ts.headRow}><td className={ts.th2} colSpan={3}>QUESTS</td></tr>
                        {/*<tr className={ts.headRow}>*/}
                        {/*    {tableKeys.map((v,i)=><td className={ts.th2}>{v}</td>)}*/}
                        {/*</tr>*/}
                    </thead>
                    <tbody>
                        {quests.map((v,i)=>
                        <tr className={ts.dataRow}>
                            {/*{tableKeys.map((val,i)=>*/}
                            <td className={ts.notEmptyTd}>{v}</td>
                            <td><button type={'button'} className={ts.deleteButton} onClick={()=>onAbiDel(v)}/></td>
                            {/*)}*/}
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/*<DataView data={quests}*/}
            {/*          dataDelHandler={onAbiDel}*/}
            {/*          dataEditHandler={(id: string)=>console.log(`edit: ${id}`)}*/}
            {/*        isMod={true}*/}
            {/*lang={'En'}*/}
            {/*isAddTable={true}/>*/}
        </div>
    );
}