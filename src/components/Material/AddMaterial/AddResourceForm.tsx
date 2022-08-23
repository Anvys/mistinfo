import React, {useState} from 'react';
import styles from "./AddMaterial.module.css";
import {TTranslateLang} from "../../../Types/ResourceTypes";
// import styles from './AddResourceForm.module.css';
//
// type TProps = {
//     formik: any
//     MainParamKeys: Array<string>
//     AttributeKeys: Array<string>
//     TranslateKeys: Array<string>
//     selectFields: Array<{[key: string]: Array<string>}>
//
// };
// export const AddResourceForm: React.FC<TProps> = (props) => {
//     const [translateLang, setTranslateLang] = useState(1);
//     const {formik} = props
//     const {MainParamKeys, AttributeKeys, TranslateKeys, selectFields} = props
//     const addTranslateFrHandler = () => {
//         if (formik.values.translate.Fr === undefined) {
//             formik.values.translate = {...formik.values.translate, Fr: ''}
//             setTranslateLang(translateLang + 1);
//         }
//     };
//     const addTranslateRuHandler = () => {
//         if (formik.values.translate.Ru === undefined) {
//             formik.values.translate = {...formik.values.translate, Ru: ''}
//             setTranslateLang(translateLang + 1);
//         }
//     };
//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <div className={styles.formBox}>
//                 <div className={styles.fieldsBox}>
//                     <div className={styles.fieldsTranslateBox}>
//                         {TranslateKeys.map((v, i) => {
//                             const vName = `translate.${v}`;
//                             return (
//                                 <div className={styles.fieldNameBox} key={i}>
//                                     <div>
//                                         <label className={styles.label} htmlFor={vName}>Name({v})</label>
//                                         {v === 'En' &&
//                                             <button type={"button"} onClick={addTranslateFrHandler}>+Fr</button>}
//                                         {v === 'En' &&
//                                             <button type={"button"} onClick={addTranslateRuHandler}>+Ru</button>}
//                                     </div>
//                                     <input className={styles.inputText} type={"text"} id={vName} name={vName}
//                                            required={v === 'En'}
//                                            onChange={formik.handleChange}
//                                            value={formik.values.translate[v]}/>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                     <div className={styles.fieldsMainParamBox}>
//                         {MainParamKeys.map((v, i) => {
//                             return (
//                                 <div className={styles.fieldBox} key={i}>
//                                     <label className={styles.label} htmlFor={v}>{v}</label>
//                                     <input className={styles.inputNumber} type={"number"} id={v} name={v}
//                                            onChange={formik.handleChange}
//                                            value={formik.values[v]}/>
//                                 </div>
//                             )
//                         })}
//                         {selectFields.map(v=>{
//                             //TODO: костыль
//                             const vKey = Object.keys(v)[0] as keyof typeof formik.values;
//                             return(
//                                 <div className={styles.fieldBox}>
//                                     <label className={styles.label} htmlFor={vKey}>{vKey}</label>
//                                     <select name={vKey} onChange={formik.handleChange}
//                                             value={formik.values[vKey] as string}>
//                                         {v[vKey].map(v=>(<option value={v}>{v}</option>))}
//                                     </select>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                     <div className={styles.fieldAttributesBox}>
//                         {AttributeKeys.map((key, i) => {
//                             const htmlId = `attributes.${key}`
//                             return (
//                                 <div className={styles.fieldBox} key={i}>
//                                     <label className={styles.label} htmlFor={htmlId}>{key}</label>
//                                     <input className={styles.inputNumber} type={"number"} id={htmlId}
//                                            name={htmlId}
//                                            onChange={formik.handleChange}
//                                            value={formik.values.attributes[key]}/>
//                                 </div>)
//                         })}
//                     </div>
//                 </div>
//             </div>
//             <button type="submit">Submit</button>
//         </form>
//     );
// }