import React, {useState} from "react";
import styles from "./AddMaterial.module.css";
import {
    TComponents,
    TMaterials,
    TMaterialType,
    TTranslateLang,
    TTranslateLangObj,
    TTranslateLangObjFull
} from "../../../Types/ResourceTypes";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {ResourcesThunks} from "../../../redux/reducers/resourceReducer";
import {TAppDispatch} from "../../../redux/store";

type TSelectsParams = 'type' | 'tier';
type TCompWithoutId = Omit<TMaterials, '_id'>
type TProps = {
    selectFields: Array<{[key: string]: Array<string>}>
}
export const AddMaterial: React.FC<TProps> = (props) => {
    const {selectFields} = props;
    const dispatch = useDispatch<TAppDispatch>()
    const [translateLang, setTranslateLang] = useState(1);
    const formik = useFormik({
        initialValues: {
            name: '',
            type: 'Bone' as TMaterialType,
            durability: 0,
            difficulty: 0,
            tier: 0,
            attributes: {
                Absorbity: 0,
                Density: 0,
                Flexibility: 0,
                Hardness: 0,
                Lightness: 0,
                Purity: 0,
                Radiance: 0,
                Rigidity: 0,
            },
            goldCost: 0,
            encumbrance: 0,
            translate: {En: '',Fr:'', Ru:''} as TTranslateLangObjFull,
        },
        onSubmit: async (values, actions) => {
            // alert(JSON.stringify(values, null, 2));
            const resToSend: TCompWithoutId = {
                name: values.translate.En,
                type: values.type,
                difficulty: +values.difficulty,
                durability: +values.durability,
                tier: +values.tier,
                goldCost: +values.goldCost,
                attributes: {...values.attributes},
                encumbrance: +values.encumbrance,
                translate: values.translate,
            }
            console.log(resToSend)
            // await dispatch(ResourcesThunks.addMaterial(resToSend))
            actions.setSubmitting(false);
        },
    });

    const AttributeKeys = Object.keys(formik.values.attributes) as (keyof typeof formik.values.attributes)[]
    const TranslateKeys = Object.keys(formik.values.translate) as (keyof typeof formik.values.translate)[]
    const MainParamKeys = Object.keys(formik.values)
        .filter(v => v !== '__v' && v !== '_id' && v !== 'attributes' && v !== 'translate'
            && v !== 'tier' && v !== 'type') as (keyof Omit<typeof formik.values, 'tier' | 'type'| 'attributes'| 'translate'| 'name' >)[]
    const addTranslateFrHandler = () => {
        if (formik.values.translate.Fr === undefined) {
            formik.values.translate = {...formik.values.translate, Fr: ''}
            setTranslateLang(translateLang + 1);
        }
    };
    const addTranslateRuHandler = () => {
        if (formik.values.translate.Ru === undefined) {
            formik.values.translate = {...formik.values.translate, Ru: ''}
            setTranslateLang(translateLang + 1);
        }
    };
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.formBox}>
                    <div className={styles.fieldsBox}>
                        <div className={styles.fieldsTranslateBox}>
                            {TranslateKeys.map((v, i) => {
                                const vName = `translate.${v}`;
                                return (
                                    <div className={styles.fieldNameBox} key={i}>
                                        <div>
                                            <label className={styles.label} htmlFor={vName}>Name({v})</label>
                                            {v === 'En' &&
                                                <button type={"button"} onClick={addTranslateFrHandler}>+Fr</button>}
                                            {v === 'En' &&
                                                <button type={"button"} onClick={addTranslateRuHandler}>+Ru</button>}
                                        </div>
                                        <input className={styles.inputText} type={"text"} id={vName} name={vName}
                                               required={v === 'En'}
                                               onChange={formik.handleChange}
                                               value={formik.values.translate[v]}/>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.fieldsMainParamBox}>
                            {MainParamKeys.map((v, i) => {
                                return (
                                    <div className={styles.fieldBox} key={i}>
                                        <label className={styles.label} htmlFor={v}>{v}</label>
                                        <input className={styles.inputNumber} type={"number"} id={v} name={v}
                                               onChange={formik.handleChange}
                                               value={formik.values[v]}/>
                                    </div>
                                )
                            })}
                            {selectFields.map(v=>{
                                //TODO: костыль
                                const vKey = Object.keys(v)[0] as keyof typeof formik.values;
                                return(
                                    <div className={styles.fieldBox}>
                                        <label className={styles.label} htmlFor={vKey}>{vKey}</label>
                                        <select name={vKey} onChange={formik.handleChange}
                                                value={formik.values[vKey] as string}>
                                            {v[vKey].map(v=>(<option value={v}>{v}</option>))}
                                        </select>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.fieldAttributesBox}>
                            {AttributeKeys.map((key, i) => {
                                const htmlId = `attributes.${key}`
                                return (
                                    <div className={styles.fieldBox} key={i}>
                                        <label className={styles.label} htmlFor={htmlId}>{key}</label>
                                        <input className={styles.inputNumber} type={"number"} id={htmlId}
                                               name={htmlId}
                                               onChange={formik.handleChange}
                                               value={formik.values.attributes[key]}/>
                                    </div>)
                            })}
                        </div>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}