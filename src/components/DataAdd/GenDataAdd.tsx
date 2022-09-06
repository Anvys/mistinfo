import React from 'react';
import {TCombineData, TWOid} from "../../Types/CommonTypes";
import {useSelector} from "react-redux";
import {TCombineThunks, useAppDispatch} from "../../redux/store";
import {useFormik} from "formik";
import {AddDataForm} from "./AddDataForm";
import {getMarkerForAddPosSelector} from "../../redux/dataSelectors";
import {commonFields} from "./Fields/CommonFields";
// import styles from './GenDataAdd.module.css';


const dataWithPos = ['gatherpoint', 'location', 'staminaelixir', 'region', 'event', 'mapobject']
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
    const pos = useSelector(getMarkerForAddPosSelector)
    const formik = useFormik({
        initialValues: initVal,
        enableReinitialize: true,
        onSubmit: async (values, actions) => {

            // @ts-ignore
            console.log(`pos: ${pos.x}:${pos.y} | ownPos: ${values.pos}/ dataName: ${props.dataName} have pos: ${dataWithPos.includes(props.dataName)}`)
            // if (dataWithPos.includes(props.dataName))

            const newData = dataWithPos.includes(props.dataName)
                // @ts-ignore
                ? {...values, name: values.translate.En, pos: values.pos.x !==0 || values.pos.y !==0 ? values.pos:pos}
                : {...values, name: values.translate.En}
            // if(props.dataName ==='gatherpoint'){
            //     const mat = useSelector(getMaterialsSelector).find(v=>v.name===newData.name)
            //     if(mat)newData.translate = mat.translate
            // }

            console.log(newData)
            if (data === null) { // @ts-ignore
                dispatch(curThunks.addOne(newData))
            } else {
                console.log(data._id)
                // @ts-ignore
                dispatch(curThunks.updateOne({id: data._id, data: {...newData, _id: data._id}}))
            }
            props.resetAddFormData();
            actions.setSubmitting(false);
        }
    })
    // @ts-ignore
    // console.log(`icon in gendata: ${formik.values.icon}`)
    // console.log(`GenDataAdd`)
    return (
        <div>
            {data === null ? `New ${props.dataName}` : `Update ${data.name}/${data._id}`}
            <AddDataForm formik={formik} dataName={props.dataName} resetAddFormData={props.resetAddFormData}/>

        </div>
    );

}