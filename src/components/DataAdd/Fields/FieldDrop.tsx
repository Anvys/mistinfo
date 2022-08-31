import React, {useState} from 'react';
import {TDrop, TDropTypes} from "../../../Types/ResourceTypes";
import {FormikErrors, useFormik} from "formik";
import styles from './Fields.module.css';
import {selectFieldsOptions} from "../AddFields";
import {useSelector} from "react-redux";
import {getComponentsSelector, getMaterialsSelector} from "../../../redux/dataSelectors";

type TProps = {
    index: number
};
export const FieldDrop: React.FC<TProps> = (props) => {
    const [drop, setDrop] = useState<Array<TDrop<TDropTypes>>>([])
    const [nameArr, setNameArr] = useState<Array<string>>([])
    const materials = useSelector(getMaterialsSelector)
    const components = useSelector(getComponentsSelector)
    const dropKeys = drop[0] ? Object.keys(drop[0]) : ['type', 'name', 'count', 'chance']
    const validates = (values: TDrop<TDropTypes>) => {
        let errors: FormikErrors<TDrop<TDropTypes>> = {};
        if (!values.name) {
            errors.name = 'Required';
        } else if (values.name.length < 1) {
            errors.name = 'Need more gold';
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
            type: 'Fiber',
            name: '',
            count: 0,
            chance: 100,
        } as TDrop<TDropTypes>,
        validate: validates,
        onSubmit: async (values, actions) => {
            actions.setSubmitting(true);
            setDrop([...drop, {...values}])
            formik.handleReset(1)
            actions.setSubmitting(false);
        }
    })
    const onTypeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const findArr = materials.filter(v => v.type === e.target.value).map(v => v.name)
            .concat(components.filter(v => v.type === e.target.value).map(v => v.name))
        setNameArr(findArr)
        formik.handleChange(e);
    }
    return (
        <div key={props.index} className={styles.mainDropDiv}>
            <div>
                <form className={styles.dropForm} onSubmit={formik.handleSubmit}>
                    <div className={styles.dropFormRows}>
                        <label htmlFor={'type'}>type:</label>
                        <select name={'type'} value={formik.values.type} onChange={onTypeChange}
                                required autoComplete={'off'} placeholder={'type'}>
                            <option value="" disabled selected hidden>{`Select type`}</option>
                            {selectFieldsOptions["component.type"].concat(selectFieldsOptions["material.type"]).map(v =>
                                <option value={v}>{`${v}`}</option>
                            )}
                        </select>
                    </div>
                    <div className={styles.dropFormRows}>
                        <label htmlFor={'name'}>name:</label>
                        <select name={'name'} value={formik.values.name} onChange={formik.handleChange}
                                required autoComplete={'off'} placeholder={'name'}>
                            <option value="" disabled selected hidden>{`Select name`}</option>
                            {nameArr.map(v => <option value={v}>{`${v}`}</option>)}
                        </select>
                    </div>
                    <div className={styles.dropFormRows}>
                        <label htmlFor={'count'}>count:</label>
                        <input className={styles.inputNum} type={'number'} name={'count'} title={'count'}
                               value={formik.values.count}
                               onChange={formik.handleChange}
                               required autoComplete={'off'} placeholder={'count'}/>
                    </div>
                    <div className={styles.dropFormRows}>
                        <label htmlFor={'chance'}>chance:</label>
                        <input className={styles.inputNum} type={'number'} name={'chance'} value={formik.values.chance}
                               onChange={formik.handleChange}
                               required autoComplete={'off'} placeholder={'chance'}/>
                    </div>
                    <button className={styles.addButton} type={"submit"}>ADD</button>
                </form>

            </div>
            <div>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tableRow}>
                            {dropKeys.map((v, i) => <th className={styles.tableCell}>{v}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {drop.length > 0 && drop.map((dropValue, index) =>
                                <tr className={styles.tableRow} key={index}>
                                    {Object.values(dropValue).map((v, i) =>
                                        <td className={styles.tableCell}>{v}</td>)}
                                </tr>)
                            || <tr>
                                <td colSpan={4}>...add first drop</td>
                            </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}