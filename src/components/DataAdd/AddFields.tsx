import React from 'react';
import styles from "./DataAdd.module.css";
import {FormikProps} from "formik";
import {IconField} from "./Fields/IconField";
import {PosField} from "./Fields/PosField";
import {InputField} from "./Fields/InputField";
import {SelectField} from "./Fields/SelectField";
import {selectFieldsOptions} from "../../Types/Utils";

export type TSelectFieldOptions = typeof selectFieldsOptions;
export type TSelectFieldOptionsKeys = keyof typeof selectFieldsOptions;
export const AddFields = {
    input: (type: React.HTMLInputTypeAttribute,
            value: string | number | readonly string[] | undefined,
            formik: FormikProps<any>,
            htmlId: string,
            labelText: string = '',
            index: number = 0,
            required: boolean = false,
            disabled: boolean = false
    ) =>
        <InputField key={index} index={index} formik={formik} value={value} htmlId={htmlId} labelText={labelText}
                    disabled={disabled} required={required}/>,
    select: (
        mapSelectValues: Array<string> | Array<number>,
        value: string | number | readonly string[] | undefined,
        formik: FormikProps<any>,
        htmlId: string,
        labelText: string = '',
        index: number = 0,
        required: boolean = false,
        disabled: boolean = false,
    ) =>
        <SelectField key={index} mapSelectValues={mapSelectValues} index={index} formik={formik} value={value} htmlId={htmlId}
                     labelText={labelText}
                     disabled={disabled} required={required}/>,
    posField: (
        posX: number,
        posY: number,
        htmlId: string,
        index: number = 0,
        formik: FormikProps<any>,
        dataName: string,
    ) =>
        <PosField formik={formik} posX={posX} posY={posY} htmlId={htmlId} index={index} dataName={dataName}/>,
    gathertypename: (
        type: string | number | readonly string[] | undefined,
        formik: FormikProps<any>,
        onChange: React.ChangeEventHandler<HTMLSelectElement>,
        htmlId: string,
        labelText: string = '',
        index: number = 0,
        cssFieldBox: string = styles.fieldBox,
        cssLabel: string = styles.label,
        cssInput: string = styles.inputNumber,) => {
        let mapSelNameValues = selectFieldsOptions[`gatherpoint.${type}` as TSelectFieldOptionsKeys]
        const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            console.log(`change name on ${e.target.value}`)
            // formik.values.name = e.target.value
            formik.values.translate.En = e.target.value
            // mapSelNameValues = selectFieldsOptions[`gatherpoint.${formik.values.type}` as TSelectFieldOptionsKeys]
            formik.handleChange(e)
        }
        const defVal = mapSelNameValues ? mapSelNameValues[0] : undefined
        return (
            <div className={cssFieldBox}>
                <label className={cssLabel} htmlFor={htmlId}>{labelText}</label>
                <select defaultValue={defVal}
                        className={cssInput}
                        name={htmlId}
                        onChange={onChange}
                        value={formik.values.translate.En}
                        required={true}>
                    {!formik.values.name.length &&
                        <option value="" disabled selected hidden>{`Select ${labelText}`}</option>}
                    {mapSelNameValues?.map((v, i) => (<option value={v}>{v}</option>))}

                </select>
            </div>
        )
    },
    icon: (
        formik: FormikProps<any>,
        index: number = 0,
        disabled: boolean = false) => {
        return (
            <IconField key={index} index={index} formik={formik} disabled={disabled}/>
        )
    }
}


// export const AddFields:React.FC<TProps> = (props) => {
//     return (
//         <div>
//
//         </div>
//     );
// }