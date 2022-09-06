import React, {useState} from 'react';
import styles from './Fields.module.css';
import tableStyles from './../../DataView/DataViewTable/DataViewTable.module.css';

import {FormikProps} from "formik";

type TProps = {
    index: number,
    formik: FormikProps<any>
    dataName: string
};
export const NotesField: React.FC<TProps> = (props) => {
    const {formik, index, dataName} = props
    const [note, setNote] = useState('')
    const [notes, setNotes] = useState<Array<string>>(() => formik.values.notes)
    const onNoteAddHandler = () => {
        if(note.length>0){
            formik.setFieldValue('notes', [...formik.values.notes,note])
            setNotes(actual=>[...actual,note])
            setNote('')
        }
    }
    // console.log(formik.values.notes)
    // console.log(notes)
    const onDropDelHandler = (index: number) =>{
        formik.setFieldValue('notes', [...formik.values.notes.filter((v:any,i:number)=> i !==index)])
        setNotes(actual=>actual.filter((v,i)=> i !==index))

    }
    return (
        <div className={styles.divRow} key={index}>
            <div className={styles.fieldBoxCol} >
                <div className={styles.fieldBoxNoBorder}>
                    <label className={styles.label} htmlFor={'note'}>note:</label>
                    <input className={styles.inputText} type={'text'} name={'note'}
                           value={note}
                           onChange={e => setNote(e.target.value)}
                           autoComplete={'off'} placeholder={'note'}/>
                </div>
                <button type={'button'} onClick={onNoteAddHandler} className={styles.addButton}>Add note</button>

            </div>
            <div className={tableStyles.vidInFields}>
                {notes.length > 0 &&
                    <table className={tableStyles.table}>
                        <thead>
                            <tr className={tableStyles.headRow}>
                                <th className={tableStyles.th2}>NOTES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note,index) =>
                                <tr className={tableStyles.dataRow}>
                                    <td className={tableStyles.th1}>{note}</td>
                                    <td>
                                        <button className={styles.deleteButton} onClick={() => onDropDelHandler(index)}/>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                }
            </div>

        </div>

    );
}