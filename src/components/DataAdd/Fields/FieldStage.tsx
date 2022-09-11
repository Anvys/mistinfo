import React, {useState} from 'react';
import {TDrop, TDropTypes, TLoot, TStage, TWOid} from "../../../Types/CommonTypes";
import {FormikErrors, useFormik} from "formik";
import styles from './Fields.module.css';
import {useSelector} from "react-redux";
import {getComponentsSelector, getMaterialsSelector} from "../../../redux/dataSelectors";
import {selectFieldsOptions} from "../../../Types/Utils";

type TProps = {
    index: number
    onAddHandler: (stage: TStage) => void
};
export const FieldStage: React.FC<TProps> = (props) => {
    // const [dropArr, setDropArr] = useState<Array<TStage>>([])
    const [nameArr, setNameArr] = useState<Array<string>>([])
    // const materials = useSelector(getMaterialsSelector)
    // const components = useSelector(getComponentsSelector)
    const validates = (values: TStage) => {
        let errors: FormikErrors<TStage> = {};
        if (!values.name) {
            errors.name = 'Required';
        } else if (values.name.length < 1) {
            errors.name = 'Need more gold';
        }
        return errors;
    }
    const addDropFormik = useFormik({
        initialValues: {
            name: '',
            type: '',
            time: 20,
            require:{type: 'Academic', count:0},
            loot: null
        } as TStage,
        validate: validates,
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true);
            props.onAddHandler({...values})
            // setDropArr([...dropArr, {...values}])
            // await addLootFormik.setFieldValue('loot', dropArr)
            addDropFormik.handleReset(1)
            actions.setSubmitting(false);
        }
    })
    // const onTypeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    //     const findArr = materials.filter(v => v.type === e.target.value).map(v => v.name)
    //         .concat(components.filter(v => v.type === e.target.value).map(v => v.name))
    //     setNameArr(findArr)
    //     addDropFormik.handleChange(e);
    // }
    return (
        <div>
            <div key={props.index} className={styles.mainDropDiv}>
                <p>Drop piece for loot</p>
                <p>-------</p>
                <form className={styles.dropForm} onSubmit={addDropFormik.handleSubmit}>
                    {/*<div className={styles.dropFormRows}>*/}
                    {/*    <label htmlFor={'type'}>type:</label>*/}
                    {/*    <select name={'type'} value={addDropFormik.values.type} onChange={onTypeChange}*/}
                    {/*            required autoComplete={'off'} placeholder={'type'}>*/}
                    {/*        <option value="" disabled selected hidden>{`Select type`}</option>*/}
                    {/*        {selectFieldsOptions["component.type"].concat(selectFieldsOptions["material.type"]).map(v =>*/}
                    {/*            <option value={v}>{`${v}`}</option>*/}
                    {/*        )}*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    {/*<div className={styles.dropFormRows}>*/}
                    {/*    <label htmlFor={'name'}>res:</label>*/}
                    {/*    <select name={'name'} value={addDropFormik.values.name} onChange={addDropFormik.handleChange}*/}
                    {/*            required autoComplete={'off'} placeholder={'name'}>*/}
                    {/*        <option value="" disabled selected hidden>{`Select name`}</option>*/}
                    {/*        {selectFieldsOptions.tier.map(v => <option value={`tier ${v}`}>{`All tier ${v} ${addDropFormik.values.type}s`}</option>)}*/}
                    {/*        {nameArr.map(v => <option value={v}>{`${v}`}</option>)}*/}
                    {/*    </select>*/}
                    {/*    /!*<label htmlFor={'name'}>or T:</label>*!/*/}
                    {/*    /!*<select name={'name'} value={addDropFormik.values.name} onChange={addDropFormik.handleChange}*!/*/}
                    {/*    /!*        required autoComplete={'off'} placeholder={'name'}>*!/*/}
                    {/*    /!*    <option value="" disabled selected hidden>{`Tier`}</option>*!/*/}
                    {/*    /!*    {selectFieldsOptions.tier.map(v => <option value={v}>{`${v}`}</option>)}*!/*/}
                    {/*    /!*</select>*!/*/}
                    {/*</div>*/}
                    {/*<div className={styles.dropFormRows}>*/}
                    {/*    <label htmlFor={'count'}>count:</label>*/}
                    {/*    <input className={styles.inputNum} type={'number'} name={'count'} title={'count'}*/}
                    {/*           value={addDropFormik.values.count}*/}
                    {/*           onChange={addDropFormik.handleChange}*/}
                    {/*           required autoComplete={'off'} placeholder={'count'}/>*/}
                    {/*</div>*/}
                    {/*<div className={styles.dropFormRows}>*/}
                    {/*    <label htmlFor={'chance'}>chance:</label>*/}
                    {/*    <input className={styles.inputNum} type={'number'} name={'chance'}*/}
                    {/*           value={addDropFormik.values.chance}*/}
                    {/*           onChange={addDropFormik.handleChange}*/}
                    {/*           required autoComplete={'off'} placeholder={'chance'}/>*/}
                    {/*</div>*/}
                    {/*<button className={styles.addButton} type={"submit"}>ADD</button>*/}
                </form>
            </div>
        </div>
    );
}