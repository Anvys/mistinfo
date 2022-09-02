import React from 'react';
import {useFormik} from "formik";
import styles from './DataAdd.module.css';
import {getDefaultFormikValues} from "../../Types/Utils";
import {TCombineData, TPrimKeys, TSubKeys} from "../../Types/CommonTypes";

type TProps = {
    dataKeys: Map<string, Array<string>>
    sortedDataKeys: Array<string>
    data?: any
};
type objtype = { [key: string]: string | number  | { [key: string]: string | number }}
// type objtype = TCombineData
const getInitObj = (dataKeys: Map<string, Array<string>>, data: objtype | null = null) => {
    let obj: objtype = {};
    if (data === null) {
        dataKeys.forEach((v, k) => {
            if (obj[k] === undefined) obj[k] = {}
            v.forEach(k2 => {
                // @ts-ignore
                obj[k][k2] = getDefaultFormikValues(k2)
            })
        })
    } else {
        dataKeys.forEach((v, k) => {
            if (obj[k] === undefined) obj[k] = {}
            v.forEach(k2 => {
                // @ts-ignore
                obj[k][k2] = k === 'primary' ? data[k2] : data[k][k2]
            })
        })
    }
    return obj
}
export const DataAdd: React.FC<TProps> = (props) => {
    const {dataKeys, sortedDataKeys} = props;

    // console.log('initobj')
    // console.log(dataKeys)
    // console.log('Initialvalue:')

    const data = props.data ? getInitObj(dataKeys, props.data) : getInitObj(dataKeys)
    // console.log(data)

    const formik = useFormik({
        initialValues: data,
        enableReinitialize: true,
        onSubmit: async (values, actions) => {
            actions.setSubmitting(false);
        }
    })
    // type k1 = TPrimKeys<fv>
    // type k2 = TSubKeys<fv>
    // console.log(`formik values:`)
    // console.log(formik.values)

    // const data = {asd: 1, qwe: {q: 2, w: 3}, zxc: 4}
    // type tdata = Extract<keyof typeof data, string>
    type initVal = typeof formik.values
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={styles.col}>
                {sortedDataKeys.map(v =>
                    <div className={v==='primary' ? styles.fieldsMainParamBox : v=== 'translate' ? styles.fieldsTranslateBox : styles.fieldAttributesBox}>
                        {dataKeys.get(v)?.map((str, i) => {
                            const htmlId = `${v}.${str}`
                            // @ts-ignore
                            const value = formik.values[v as k1][str as k2]
                            const strType = typeof value === 'number' ? 'number' : 'text';
                            // console.log(`${htmlId} / ${value}`)
                            return (
                                <div className={styles.fieldBox} key={i}>
                                    <label className={styles.label} htmlFor={htmlId}>{str}</label>
                                    <input className={strType === 'number'?styles.inputNumber : styles.inputText} type={strType} id={htmlId} name={htmlId}
                                           onChange={formik.handleChange}
                                           value={value}/>
                                </div>)
                        })
                        }
                    </div>)}
                DataAdd
            </div>
        </form>
    );
}

// {props.sortedDataKeys.map((v, i) =>
//     <th className={styles.th1} key={i}
//         colSpan={props.dataKeys.get(v)?.length}>{v}
//     </th>)}