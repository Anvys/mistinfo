import React from 'react';
import styles from './DataAdd.module.css';
import {FormikProps} from "formik";
import {commonFields} from "./Fields/CommonFields";
import {useSelector} from "react-redux";
import {MapSelectors} from "../../redux/dataSelectors";
import {MyMap} from "../Map/MyMap";

type TProps = {
    formik: FormikProps<any>
    dataName: string
    resetAddFormData: () => void

};
export const AddDataForm: React.FC<TProps> = ({formik, dataName, resetAddFormData}) => {
    const isMapActive = useSelector(MapSelectors.isMapActive)
    // console.log(`AddDataForm`)
    const onReset = () =>{
        resetAddFormData()
        formik.handleReset()
    }
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={styles.rowDiv}>
                <div className={styles.fieldsBox}>
                    {/*<div className={styles.fieldsMainParamBox}>*/}
                    {/*    {getDeepElements(formik.values, '', formik, dataName)}*/}
                    {/*</div>*/}
                    {/*<div className={styles.fieldsMainParamBox}>*/}
                        {commonFields(formik,'',formik.values,dataName)}
                    {/*</div>*/}
                </div>
                {isMapActive && <MyMap wid={-1} hei={400}/>}
            </div>
            <div className={styles.buttonBox}>
                <button className={styles.formButton} type={"submit"}>Save</button>
                <button className={styles.formButton} type={"button"} onClick={onReset}>New / clear</button>
            </div>

        </form>
    )
}