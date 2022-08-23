import React, {useState} from "react";
import styles from "./AddComponent.module.css";
import {
    TComponents,
    TComponentType,
    TMaterials,
    TMaterialType,
    TTranslateLang,
    TTranslateLangObj
} from "../../../Types/ResourceTypes";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {ResourcesThunks} from "../../../redux/reducers/resourceReducer";
import {TAppDispatch} from "../../../redux/store";

type TProps = {
    selectFields: Array<{[key: string]: Array<string>}>
}
export const AddComponent: React.FC<TProps> = (props) => {
    const {selectFields} = props;
    const dispatch = useDispatch<TAppDispatch>()
    const [translateLang, setTranslateLang] = useState(1);
    const formik = useFormik({
        initialValues: {
            name: '',
            type: 'Plant' as TComponentType,
            durability: 0,
            difficulty: 0,
            tier: 0,
            attributes: {
                Activator: 0,
                Binder: 0,
                Deteriorator: 0,
                Energizer: 0,
                Focuser: 0,
                Fortifier: 0,
                Putrefier: 0,
                Stimulator: 0,
                Toner: 0,
                Tranquilizer: 0,
                Elioam: 0,
                Frimam: 0,
                Hydram: 0,
                Lectram: 0,
                Lithram: 0,
                Magnam: 0,
                Psycham: 0,
                Pyram: 0,
                Stratam: 0,
            },
            goldCost: 0,
            encumbrance: 0,
            translate: {En: ''} as TTranslateLangObj,
        },
        onSubmit: async (values, actions) => {
            // alert(JSON.stringify(values, null, 2));
            const resToSend: TComponents = {
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
            await dispatch(ResourcesThunks.addComponent(resToSend))
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
                                        <select name={vKey} onChange={formik.handleChange} value={formik.values[vKey] as string}>
                                            {v[vKey].map(v=>(<option value={v}>{v}</option>))}
                                            {/*<option value="Fiber">Fiber</option>*/}
                                            {/*<option value="Leather">Leather</option>*/}
                                            {/*<option value="Metal">Metal</option>*/}
                                            {/*<option value="Stone">Stone</option>*/}
                                            {/*<option value="Wood">Wood</option>*/}
                                        </select>
                                    </div>
                                )
                            })}
                            {/*<div className={styles.fieldBox}>*/}
                            {/*    <label className={styles.label} htmlFor="type">type</label>*/}
                            {/*    <select name="type" onChange={formik.handleChange} value={formik.values.type}>*/}
                            {/*        <option value="Plant">Plant</option>*/}
                            {/*        <option value="Gem">Gem</option>*/}
                            {/*        <option value="Substance">Substance</option>*/}
                            {/*        <option value="Powder">Powder</option>*/}
                            {/*        <option value="Sap">Sap</option>*/}
                            {/*        <option value="Pollen">Pollen</option>*/}
                            {/*        <option value="Artefact">Artefact</option>*/}
                            {/*    </select>*/}
                            {/*</div>*/}
                            {/*<div className={styles.fieldBox}>*/}
                            {/*    <label className={styles.label} htmlFor="tier">tier</label>*/}
                            {/*    <select name="tier" onChange={formik.handleChange} value={formik.values.tier}>*/}
                            {/*        <option value="0">0</option>*/}
                            {/*        <option value="1">1</option>*/}
                            {/*        <option value="2">2</option>*/}
                            {/*        <option value="3">3</option>*/}
                            {/*        <option value="4">4</option>*/}
                            {/*        <option value="5">5</option>*/}
                            {/*    </select>*/}
                            {/*</div>*/}
                        </div>

                        <div className={styles.fieldAttributesBox}>
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
                </div>


                <button type="submit">Submit</button>
            </form>

        </div>
    )
}