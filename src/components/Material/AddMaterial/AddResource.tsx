import React, {useState} from "react";
import styles from "./AddMaterial.module.css";
import {TComponent, TMaterial, TMaterialType, TTranslateLang, TTranslateLangObj} from "../../../Types/ResourceTypes";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {TAppDispatch} from "../../../redux/store";
// import {AddResourceForm} from "./AddResourceForm";
import {getIsMaterialsInitSelector, getMaterialsSelector} from "../../../redux/dataSelectors";

// const getWeight = (str: string): number => {
//     switch (str) {
//         case 'name':
//             return 1;
//         case 'nameFr':
//             return 1.1;
//         case 'nameRu':
//             return 1.2;
//         case 'type':
//             return 2;
//         case 'tier':
//             return 3;
//         default:
//             return 99;
//     }
// }

// type TProps = {
//     // initialValues: any,
//     // resKeys: Array<string | Array<string>>
//     // addRes: (res: any) => void
// }
// export const AddMaterial: React.FC<TProps> = (props) => {
//     const dispatch = useDispatch<TAppDispatch>()
//     const materials = useSelector(getMaterialsSelector)
//     // const TranslateKeys = Object.keys(materials[0].translate)
//     const TranslateKeys = Object.keys(materials[0].translate)
//     const AttributeKeys = Object.keys(materials[0].attributes)
//     const MainParamKeys = Object.keys(materials[0])
//         .filter(v => v !== '__v' && v !== '_id' && v !== 'attributes' && v !== 'translate')
//         .sort((a, b) => {
//             return getWeight(a) - getWeight(b)
//         })
//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             type: 'Bone' as TMaterialType,
//             durability: 0,
//             difficulty: 0,
//             tier: 0,
//             attributes: {
//                 Absorbity: 0,
//                 Density: 0,
//                 Flexibility: 0,
//                 Hardness: 0,
//                 Lightness: 0,
//                 Purity: 0,
//                 Radiance: 0,
//                 Rigidity: 0,
//             },
//             goldCost: 0,
//             encumbrance: 0,
//             translate: {En: ''} as TTranslateLangObj,
//         },
//         onSubmit: async (values, actions) => {
//             // alert(JSON.stringify(values, null, 2));
//             const resToSend: TMaterials = {
//                 name: values.translate.En,
//                 type: values.type,
//                 difficulty: +values.difficulty,
//                 durability: +values.durability,
//                 tier: +values.tier,
//                 goldCost: +values.goldCost,
//                 attributes: {...values.attributes},
//                 encumbrance: +values.encumbrance,
//                 translate: values.translate,
//             }
//             console.log(resToSend)
//             // await dispatch(ResourcesThunks.addMaterial(resToSend))
//             actions.setSubmitting(false);
//         },
//     });
//     return (
//         <div>
//             <AddResourceForm formik={formik}
//                              MainParamKeys={MainParamKeys}
//                              AttributeKeys={AttributeKeys}
//                              TranslateKeys={TranslateKeys}/>
//         </div>
//     )
// }