import React from 'react';
import {TCombineData, TComponent, TComponentType, TWOid} from "../../Types/ResourceTypes";
import {useDispatch} from "react-redux";
import {TAppDispatch, TCombineThunks, useAppDispatch} from "../../redux/store";
import {useFormik} from "formik";
import {ComponentThunks} from "../../redux/reducers/componentReducer";
import {AddDataForm} from "./AddDataForm";
// import styles from './GenDataAdd.module.css';

export type TDataAddProps<T extends TCombineData> = {
    data: T | null
    resetAddFormData: () => void
    initObj: TWOid<T>
    curThunks: TCombineThunks
    dataName: string
}
export const GenDataAdd = <T extends TCombineData, >(props: React.PropsWithChildren<TDataAddProps<T>>) => {
    const {data, curThunks} = props
    const dispatch = useAppDispatch();
    const initVal = data !== null ? data : props.initObj

    const formik = useFormik({
        initialValues: initVal,
        enableReinitialize: true,
        onSubmit: async (values, actions) => {
            values.name = values.translate.En;
            console.log(values)
            if (data === null) { // @ts-ignore
                dispatch(curThunks.addOne({...values}))
            } else {
                console.log(data._id)
                // @ts-ignore
                dispatch(curThunks.updateOne({id: data._id, data: {...values, _id: data._id}}))
            }
            props.resetAddFormData();
            actions.setSubmitting(false);
        }
    })
    return (
        <div>
            {data === null ? `New ${props.dataName}` : `Update ${data.name}/${data._id}`}
            <AddDataForm formik={formik} dataName={props.dataName} resetAddFormData={props.resetAddFormData}/>
        </div>
    );

}