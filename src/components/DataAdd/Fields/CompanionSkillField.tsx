import React, {useEffect, useState} from 'react';
import {FormikProps} from "formik";
import ts from "../../DataView/DataViewTable/DataViewTable.module.css";
import {TBonus} from "../../../Types/CommonTypes";
import {selectFieldsOptions, TAdventureType, TCraftingType, TWeaponType} from "../../../Types/Utils";
import {SimpleSelectField} from "./SelectField";
import {SimpleInputField} from "./InputField";
import styles from "./Fields.module.css";
// import styles from './CompanionBonusField.module.css';

type TProps = {
    index: number,
    formik: FormikProps<any>
    dataName: string
};
export type TCompanionBonusType = TAdventureType | TWeaponType | TCraftingType
export const CompanionSkillField: React.FC<TProps> = (props) => {
    const {formik, index, dataName} = props
    const [skills, setSkills] = useState<Array<TBonus>>(() => formik.values.skills)
    const [skill, setSkill] = useState<TCompanionBonusType | ''>(() => formik.values.skills[0] || '')
    const [count, setCount] = useState(() => formik.values.skills[0]?.count || 0)
    // const advSel = [...selectFieldsOptions['adventure']] as Array<string>
    // const weaSel = [...selectFieldsOptions['weapon.type']] as Array<string>
    // const craSel = [...selectFieldsOptions['crafting']] as Array<string>
    const selectSkills = [...selectFieldsOptions["adventure"], ...selectFieldsOptions["weapon"],
        ...selectFieldsOptions["crafting"], ...selectFieldsOptions["terrain"],...selectFieldsOptions["gatherpoint.type"]]
    // const selectSkills = [...advSel, ...weaSel, ...craSel].filter(v => skills.every(b => b.skill !== v))
    // console.log(selectSkills)
    const tableKeys = ['Skill', 'bonus']
    const onSkillDelete = (skill: string) => {
        setSkills(actual => actual.filter(v => v.skill !== skill))
    }
    const onAddAttribute = () => {
        if (skill !== '' && count>0) {
            // console.log(skills)
            setSkill('')
            setCount(0)
            setSkills(actual => [...actual, {skill: skill, count: count}])
        }
    }
    useEffect(() => {
        formik.setFieldValue('skills', skills)
    }, [skills])
    // console.log(skills)
    return (
        <div>Skills
            <SimpleSelectField mapSelectValues={selectSkills} value={skill}
                               onSelChange={v => setSkill(v as TCompanionBonusType)} labelText={'Skill'}/>
            <SimpleInputField value={count} onChange={v => setCount(+v)} index={1} htmlId={'count'} labelText={'count'}
                              required={false} disabled={false}/>
            <div>
                <button className={styles.addButton} type={'button'} onClick={onAddAttribute}>Add skill</button>
                {/*<button className={styles.clearButton} type={'button'} onClick={resetAttributes}>Clear skills</button>*/}
            </div>
            {skills.length > 0 &&
                <div className={ts.vidInFields} style={{minWidth: '200px'}}>
                    <table className={ts.table} style={{minWidth: '200px'}}>
                        <thead>
                            <tr className={ts.headRow}>
                                <td className={ts.th2} colSpan={3}>SKILLS</td>
                            </tr>
                            <tr className={ts.headRow}>
                                {tableKeys.map((v, i) => <td className={ts.th2}>{v}</td>)}
                            </tr>
                        </thead>
                        <tbody>
                            {skills.map((v, i) =>
                                <tr className={ts.dataRow}>
                                    <td className={ts.notEmptyTd}>{v.skill}</td>
                                    <td className={ts.notEmptyTd}>{v.count}</td>
                                    <td>
                                        <button type={'button'} className={ts.deleteButton}
                                                onClick={() => onSkillDelete(v.skill)}/>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>}
        </div>
    );
}