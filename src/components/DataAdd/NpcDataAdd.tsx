import React from 'react';
// import {useFormik} from "formik";
// import {TNpc, TWOid} from "../../Types/ResourceTypes";
// import {NpcThunks} from "../../redux/reducers/npcReducer";
// import {useDispatch} from "react-redux";
// import {TAppDispatch} from "../../redux/store";
// import {AddDataForm} from "./AddDataForm";
// // import styles from './NpcDataAdd.module.css';
//
// const DATA_NAME = 'npc';
// type TProps = {
//     data: TNpc | null
//     resetAddFormData: ()=>void
// };
// export const NpcDataAdd: React.FC<TProps> = (props) => {
//     const {data} = props
//     const dispatch = useDispatch<TAppDispatch>();
//     const initVal = data !== null ? data : {
//         name: '',
//         location: '',
//         time: '',
//         translate: {En: '', Ru: '', Fr: ''},
//     }
//     const formik = useFormik({
//         initialValues: initVal as TWOid<TNpc>,
//         enableReinitialize: true,
//         onSubmit: async (values, actions) => {
//             values.name = values.translate.En;
//             console.log(values)
//             dispatch(NpcThunks.addOne(values))
//             actions.setSubmitting(false);
//         }
//     })
//     return (
//         <div>
//             {data === null ? 'New NPC' : `Update ${data.name}/${data._id}`}
//             <AddDataForm formik={formik} dataName={DATA_NAME} resetAddFormData={props.resetAddFormData}/>
//         </div>
//     );
// }