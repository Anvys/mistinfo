import React from 'react';
import styles from './DataAdd.module.css';
import {getDeepElements} from "../../Unils/utilsFunctions";
import {FormikProps} from "formik";
import {commonFields} from "./Fields/CommonFields";

type TProps = {
    formik: FormikProps<any>
    dataName: string
    resetAddFormData: () => void

};
export const AddDataForm: React.FC<TProps> = React.memo(({formik, dataName, resetAddFormData}) => {
    // console.log(`AddDataForm`)
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={styles.col}>
                <div className={styles.fieldsBox}>
                    {/*<div className={styles.fieldsMainParamBox}>*/}
                    {/*    {getDeepElements(formik.values, '', formik, dataName)}*/}
                    {/*</div>*/}
                    <div className={styles.fieldsMainParamBox}>
                        {commonFields(formik,'',formik.values,dataName)}
                    </div>
                </div>
            </div>
            <div className={styles.buttonBox}>
                <button className={styles.formButton} type={"submit"}>Save</button>
                <button className={styles.formButton} type={"button"} onClick={formik.handleReset}>New / clear</button>
            </div>

        </form>
    )
})