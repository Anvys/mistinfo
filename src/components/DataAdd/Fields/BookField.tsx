import React, {useState} from 'react';
import {TBook, TSkills} from "../../../Types/CommonTypes";
import styles from "./Fields.module.css";
import {SimpleSelectField} from "./SelectField";
import {selectFieldsOptions} from "../../../Types/Utils";
import {SimpleInputField} from "./InputField";
// import styles from './EquipField.module.css';

type TProps = {
    onBookAdd: (book: TBook)=>void
};
export const BookField:React.FC<TProps> = (props) => {
    const str = 'Book'
    const [skill, setSkill] = useState<TSkills | ''>('')
    const [count, setCount] = useState<number>(1)
    const [isSaved, setIsSaved] = useState(false)

    const selectBookSkills = [...selectFieldsOptions["adventure"], ...selectFieldsOptions["weapon"],
        ...selectFieldsOptions["crafting"], ...selectFieldsOptions["terrain"],...selectFieldsOptions["gatherpoint.type"]]
    const onSaveHandler = () => {
        if(skill!==''){
            setIsSaved(true)
            props.onBookAdd({skill: skill, count: count})
        }
        else console.log(`fail Save ${skill} +${count}`)
    }
    return (
        <div className={styles.divCol}>
            <div className={styles.fieldBoxColNoBorder}>
                <SimpleSelectField mapSelectValues={selectBookSkills || ['not found']}
                                   value={count} onSelChange={skill=>setSkill(skill as TSkills | '')}
                                   labelText={`${str}`}/>
                <SimpleInputField value={count} onChange={v=>setCount(+v)} index={1} htmlId={'count'} labelText={'count'} required={false} disabled={false}/>
                <div className={styles.divRow}>
                    <button type={'button'} className={styles.addButton} onClick={onSaveHandler}>Save Book</button>
                    <p style={{backgroundColor:isSaved?``:'red'}}>{`${!isSaved?`Not saved`:`Saved`}`}</p>
                </div>
            </div>
        </div>
    )
}