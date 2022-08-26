import React from 'react';
import {useFormik} from "formik";
import {TRegion, TWOid} from "../../Types/ResourceTypes";
import {useDispatch} from "react-redux";
import {TAppDispatch} from "../../redux/store";
import {RegionThunks} from "../../redux/reducers/regionReducer";
import {AddDataForm} from "./AddDataForm";
// import styles from './NpcDataAdd.module.css';

const DATA_NAME = 'region';
type TProps = {
    data: TRegion | null
    resetAddFormData: ()=>void
};
export const RegionDataAdd: React.FC<TProps> = (props) => {
    const {data} = props
    const dispatch = useDispatch<TAppDispatch>();
    const initVal = data !== null ? data : {
        name: '',
        terrain: 'Forest',
        terrainReq: 0,
        translate: {En: '', Ru: '', Fr: ''},
    } as TWOid<TRegion>
    const formik = useFormik({
        initialValues: initVal,
        enableReinitialize: true,
        onSubmit: async (values, actions) => {
            values.name = values.translate.En;
            console.log(values)
            dispatch(RegionThunks.addOne(values))
            actions.setSubmitting(false);
        }
    })
    return (
        <div>
            {data === null ? 'New Region' : `Update ${data.name}/${data._id}`}
            <AddDataForm formik={formik} dataName={DATA_NAME} resetAddFormData={props.resetAddFormData}/>
        </div>
    );
}