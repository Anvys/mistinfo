import React from 'react';
// import {useFormik} from "formik";
// import {TLocation, TWOid} from "../../Types/ResourceTypes";
// import {useDispatch} from "react-redux";
// import {TAppDispatch} from "../../redux/store";
// import {LocationThunks} from "../../redux/reducers/locationReducer";
// import {AddDataForm} from "./AddDataForm";
// import {IconPicker} from "../IconPicker/IconPicker";
// // import styles from './NpcDataAdd.module.css';
//
// const DATA_NAME = 'location';
// const isSkipField = (key: string): boolean => {
//     return key === 'translate' || key === 'attribute' || key === 'name'
// }
// type TProps = {
//     data: TLocation | null
//     resetAddFormData: () => void
// };
// export const LocationDataAdd: React.FC<TProps> = (props) => {
//     const {data} = props
//     const dispatch = useDispatch<TAppDispatch>();
//     const initVal = data !== null ? data : {
//         name: '',
//         exploreReq: 0,
//         pos: {x: 0, y: 0},
//         icon: '',
//         region: '',
//         translate: {En: '', Ru: '', Fr: ''},
//     } as TWOid<TLocation>
//     const formik = useFormik({
//         initialValues: initVal,
//         enableReinitialize: true,
//         onSubmit: async (values, actions) => {
//             values.name = values.translate.En;
//             console.log(values)
//             dispatch(LocationThunks.addOne(values))
//             actions.setSubmitting(false);
//         }
//     })
//     return (
//         <div>
//             {data === null ? 'New Location' : `Update ${data.name}/${data._id}`}
//             <AddDataForm formik={formik} dataName={DATA_NAME} resetAddFormData={props.resetAddFormData}/>
//         </div>
//     );
// }
//
