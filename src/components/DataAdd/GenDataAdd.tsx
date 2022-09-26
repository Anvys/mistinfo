import React from 'react';
import {TCombineData, TWOid} from "../../Types/CommonTypes";
import {useSelector} from "react-redux";
import {TCombineThunks, useAppDispatch} from "../../redux/store";
import {useFormik} from "formik";
import {AddDataForm} from "./AddDataForm";
import {AuthSelectors, getMarkerForAddPosSelector, MapSelectors, TSelectors} from "../../redux/dataSelectors";
import {MapSlice} from "../../redux/reducers/mapReducer";
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
    const { curThunks, data} = props
    // const data = null
    const isMod = useSelector(AuthSelectors.isInit)
    const dispatch = useAppDispatch();
    const pos = useSelector(getMarkerForAddPosSelector)
    const isMarkerAdd = useSelector(MapSelectors.isAddActive)
    const initVal = data !== null ? data : props.initObj
    const formik = useFormik({
        initialValues: initVal,
        enableReinitialize: true,
        onSubmit: async (values, actions) => {
            console.log(`Add active: ${isMarkerAdd}`)

            // @ts-ignore
            console.log(`pos: ${pos.x}:${pos.y} | ownPos: ${values.pos?.x}:${values.pos?.y}/ dataName: ${props.dataName} have pos: ${dataWithPos.includes(props.dataName)}`)
            // if (dataWithPos.includes(props.dataName))
            const fixerPos = {x:Number(pos.x.toFixed(3))-(props.dataName === 'location'?0.045:0),y:Number(pos.y.toFixed(3))}
            const newData = dataWithPos.includes(props.dataName)
                // @ts-ignore
                ? {...values, name: values.translate.En, pos: !isMarkerAdd ? values.pos:fixerPos}
                : {...values, name: values.translate.En}
            // if(props.dataName ==='gatherpoint'){
            //     const mat = useSelector(getMaterialsSelector).find(v=>v.name===newData.name)
            //     if(mat)newData.translate = mat.translate
            // }

            console.log(newData)
            if (data === null) { // @ts-ignore
                await dispatch(curThunks.addOne(newData))
            } else {
                // console.log(data._id)
                // @ts-ignore
                await dispatch(curThunks.updateOne({id: data._id, data: {...newData, _id: data._id}}))
            }
            props.resetAddFormData();
            if(isMarkerAdd && dataWithPos.includes(props.dataName)){
                dispatch(MapSlice.actions.setIsAddPosFieldActive(false))
            }
            dispatch(curThunks.getAll())
            actions.setSubmitting(false);
        }
    })
    // @ts-ignore
    // console.log(`icon in gendata: ${formik.values.icon}`)
    // console.log(`GenDataAdd`)
    return (isMod ?
        <div>
            {/*{data === null ? `New ${props.dataName}` : `Update ${data.name}/${data._id}`}*/}
            <AddDataForm formik={formik} dataName={props.dataName} resetAddFormData={props.resetAddFormData}/>
            {/*asd*/}
            {/**/}

        </div>
            :<div> user </div>
    );

}