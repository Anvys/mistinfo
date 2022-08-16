import React, {useState} from "react";
import styles from "../Resource.module.css";
import {TComponents, TMaterials, TMaterialType, TTranslateLang, TTranslateLangObj} from "../../Types/ResourceTypes";
import {useFormik} from "formik";


export const AddMaterial: React.FC = (props) => {

    const [translateLang,setTranslateLang] = useState(1);
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
            translate: {En:''} as TTranslateLangObj,
        },
        onSubmit: async (values, actions) => {
            // alert(JSON.stringify(values, null, 2));
            const resToSend: TMaterials = {
                name: values.name,
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
            // const res = await ResourceAPI.addMaterial(resToSend)

            // actions.setSubmitting(false);
        },
    });
    const addTranslateFrHandler = () => {
        if(formik.values.translate.Fr === undefined){
            formik.values.translate = {...formik.values.translate,Fr:  ''}
            setTranslateLang(translateLang+1);
        }
    };
    const addTranslateRuHandler = () => {
        if(formik.values.translate.Ru === undefined){
            formik.values.translate = {...formik.values.translate,Ru:  ''}
            setTranslateLang(translateLang+1);
        }
    };
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.formBox}>
                    <div className={styles.fieldsBox}>
                        {Object.entries(formik.values.translate).map(([vKey, value], i) => {
                            // const vKey = Object.keys(v)[0] as TTranslateLang;
                            const vName = `translate.${vKey}`;
                            // console.log(vKey + '  ' + value)
                            // @ts-ignore
                            // console.log(typeof formik.values.translate.find((val => Object.keys(val)[0] === vKey))[vKey])
                            return (
                                <div className={styles.fieldBox} key={i}>
                                    <label className={styles.label} htmlFor={vName}>Name({vKey})</label>
                                    {vKey === 'En' &&
                                        <button type={"button"} onClick={addTranslateFrHandler}>+Fr</button>}
                                    {vKey === 'En' &&
                                        <button type={"button"} onClick={addTranslateRuHandler}>+Ru</button>}
                                    <input className={styles.inputText} type={"text"} id={vName} name={vName}
                                           required={vKey==='En'}
                                           onChange={formik.handleChange}
                                           value={formik.values.translate[vKey as TTranslateLang]}/>
                                </div>
                            )
                        })}
                        <div className={styles.fieldBox}>
                            <label className={styles.label} htmlFor="durability">durability</label>
                            <input className={styles.inputNumber} type={"number"} id="durability" name="durability"
                                   onChange={formik.handleChange}
                                   value={formik.values.durability}/>
                        </div>
                        <div className={styles.fieldBox}>
                            <label className={styles.label} htmlFor="difficulty">difficulty</label>
                            <input className={styles.inputNumber} type={"number"} id="difficulty" name="difficulty"
                                   onChange={formik.handleChange}
                                   value={formik.values.difficulty}/>
                        </div>
                        <div className={styles.fieldBox}>
                            <label className={styles.label} htmlFor="goldCost">goldCost</label>
                            <input className={styles.inputNumber} type={"number"} id="goldCost" name="goldCost"
                                   onChange={formik.handleChange}
                                   value={formik.values.goldCost}/>
                        </div>
                        <div className={styles.fieldBox}>
                            <label className={styles.label} htmlFor="type">type</label>
                            <select name="type" onChange={formik.handleChange} value={formik.values.type}>
                                <option value="Bone">Bone</option>
                                <option value="Fiber">Fiber</option>
                                <option value="Leather">Leather</option>
                                <option value="Metal">Metal</option>
                                <option value="Stone">Stone</option>
                                <option value="Wood">Wood</option>
                            </select>
                        </div>
                        <div className={styles.fieldBox}>
                            <label className={styles.label} htmlFor="tier">tier</label>
                            <select name="tier" onChange={formik.handleChange} value={formik.values.tier}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className={styles.fieldAttributesBox}>
                            <label className={styles.label} htmlFor="attributes.Absorbity">Absorbity</label>
                            <input className={styles.inputNumber} type={"number"} id="attributes.Absorbity" name="attributes.Absorbity"
                                   onChange={formik.handleChange}
                                   value={formik.values.attributes.Absorbity}/>

                            <label className={styles.label} htmlFor="attributes.Density">Density</label>
                            <input className={styles.inputNumber} type={"number"} id="attributes.Density" name="attributes.Density"
                                   onChange={formik.handleChange}
                                   value={formik.values.attributes.Density}/>

                            <label className={styles.label} htmlFor="attributes.Flexibility">Flexibility</label>
                            <input className={styles.inputNumber} type={"number"} id="attributes.Flexibility" name="attributes.Flexibility"
                                   onChange={formik.handleChange}
                                   value={formik.values.attributes.Flexibility}/>

                            <label className={styles.label} htmlFor="attributes.Hardness">Hardness</label>
                            <input className={styles.inputNumber} type={"number"} id="attributes.Hardness" name="attributes.Hardness"
                                   onChange={formik.handleChange}
                                   value={formik.values.attributes.Hardness}/>

                            <label className={styles.label} htmlFor="attributes.Lightness">Lightness</label>
                            <input className={styles.inputNumber} type={"number"} id="attributes.Lightness" name="attributes.Lightness"
                                   onChange={formik.handleChange}
                                   value={formik.values.attributes.Lightness}/>

                            <label className={styles.label} htmlFor="attributes.Purity">Purity</label>
                            <input className={styles.inputNumber} type={"number"} id="attributes.Purity" name="attributes.Purity"
                                   onChange={formik.handleChange}
                                   value={formik.values.attributes.Purity}/>

                            <label className={styles.label} htmlFor="attributes.Radiance">Radiance</label>
                            <input className={styles.inputNumber} type={"number"} id="attributes.Radiance" name="attributes.Radiance"
                                   onChange={formik.handleChange}
                                   value={formik.values.attributes.Radiance}/>

                            <label className={styles.label} htmlFor="attributes.Rigidity">Rigidity</label>
                            <input className={styles.inputNumber} type={"number"} id="attributes.Rigidity" name="attributes.Rigidity"
                                   onChange={formik.handleChange}
                                   value={formik.values.attributes.Rigidity}/>

                        </div>
                        <div className={styles.fieldBox}>
                            <label className={styles.label} htmlFor="attributes.encumbrance">encumbrance</label>
                            <input className={styles.inputNumber} type={"number"} id="attributes.encumbrance" name="attributes.encumbrance"
                                   onChange={formik.handleChange}
                                   value={formik.values.encumbrance}/>
                        </div>
                    </div>
                </div>


                <button type="submit">Submit</button>
            </form>

        </div>
    )
}