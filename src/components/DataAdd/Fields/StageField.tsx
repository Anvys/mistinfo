import React, {useState} from 'react';
import styles from "./Fields.module.css";
import {selectFieldsOptions} from "../AddFields";
import {useFormik} from "formik";
import {TRequireAdventure, TStageRequire} from "../../../Types/CommonTypes";
// import styles from './StageField.module.css';

type TProps = {
    onStageAdd: (req: TStageRequire)=>void
};
export const StageField: React.FC<TProps> = (props) => {
    const [type, setType] = useState('')
    const onTypeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        setType(e.target.value)
    }
    const onRequireAdd = (req: TStageRequire) => {
        console.log(req)
        setType('')
        props.onStageAdd(req)
    }
    return (
        <div className={styles.mainDropDiv}>
            <div className={styles.dropFormRows}>
                <label htmlFor={'type'}>type:</label>
                <select name={'type'} value={type} onChange={onTypeChange}
                        required autoComplete={'off'} placeholder={'type'}>
                    <option value="" disabled selected hidden>{`Select type`}</option>
                    {selectFieldsOptions['stage.type'].map(v => <option value={v}>{`${v}`}</option>)}
                </select>
            </div>

            {type === 'Adventure' && <StageAdventureForm onSubmit={onRequireAdd}/>}

        </div>
    );
}
type TStageAdventureFormProps = {
    onSubmit: (require: TRequireAdventure) => void
};
export const StageAdventureForm: React.FC<TStageAdventureFormProps> = (props) => {
    const formik = useFormik({
        initialValues: {
            adventure: 'Academic',
            count: 0,
        } as TRequireAdventure,
        onSubmit: async (values, actions) => {
            props.onSubmit({...values})
            formik.handleReset(0)
        }
    })
    return (
        <div className={styles.mainDropDiv}>
            <p>Adventure stage</p>
            <form className={styles.dropForm} onSubmit={formik.handleSubmit}>
                <div className={styles.dropFormRows}>
                    <label htmlFor={'adventure'}>skill:</label>
                    <select name={'adventure'} value={formik.values.adventure} onChange={formik.handleChange}
                            required autoComplete={'off'} placeholder={'adventure'}>
                        <option value="" disabled selected hidden>{`Select adventure`}</option>
                        {selectFieldsOptions['adventure'].map(v => <option value={v}>{`${v}`}</option>)}
                    </select>
                </div>
                <div className={styles.dropFormRows}>
                    <label htmlFor={'count'}>count:</label>
                    <input className={styles.inputNum} type={'number'} name={'count'} value={formik.values.count}
                           onChange={formik.handleChange}
                           required autoComplete={'off'} placeholder={'count'}>
                    </input>
                </div>
                <button className={styles.addButton}>Save</button>
            </form>
        </div>
    )
}