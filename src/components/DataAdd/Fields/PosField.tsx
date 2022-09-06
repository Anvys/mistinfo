import {FormikProps} from "formik";
import React, {useEffect, useState} from "react";
import {useAppDispatch} from "../../../redux/store";
import {useSelector} from "react-redux";
import {getMarkerForAddPosSelector} from "../../../redux/dataSelectors";
import {MapSlice} from "../../../redux/reducers/mapReducer";
import posStyles from "../DataAdd.module.css";
import styles from './Fields.module.css';
import {TMapPosition} from "../../../Types/CommonTypes";

type PosFieldProps = {
    // pos: { x: number, y: number },
    posX: number,
    posY: number,
    // onChange: React.ChangeEventHandler<HTMLInputElement>,
    htmlId: string,
    index: number,
    formik: FormikProps<any>
    dataName: string
}
export const PosField: React.FC<PosFieldProps> = ({posX, posY, htmlId, index, formik, dataName}) => {
    const htmlX = `${htmlId}.x`
    const htmlY = `${htmlId}.x`
    const [isPosFromMarker, setIsPosFromMarker] = useState(false);
    const dispatch = useAppDispatch()
    const markerPos = useSelector(getMarkerForAddPosSelector)
    const onOpenMapHandler = () => {
        setIsPosFromMarker(true)
        dispatch(MapSlice.actions.setIsAddPosFieldActive(true))
    }
    const mapPos = isPosFromMarker ? markerPos : {x: posX, y: posY}
    const onXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.values.pos.x = Number(mapPos.x.toFixed(3))
        console.log(formik.values.pos)
        formik.handleChange(e)
    }
    const onYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.values.pos.y = Number(mapPos.y.toFixed(3))
        formik.handleChange(e)
        console.log(formik.values.pos)
    }
    return (
        <div className={styles.fieldBoxCol} key={index}>
            {dataName==='region' ? 'Center of region' : 'Position on map'}
            <div className={styles.fieldBoxNoBorder}>
                <div className={styles.fieldBoxPos}>
                    <label className={styles.label} htmlFor={htmlX}>x:</label>
                    <input className={styles.inputNumber} type={'number'} id={htmlX} name={htmlX}
                        // disabled={true}
                           onChange={onXChange}
                           value={Number(mapPos.x.toFixed(3))}/>
                </div>
                <div className={styles.fieldBoxPos}>
                    <label className={styles.label} htmlFor={htmlY}>y:</label>
                    <input className={styles.inputNumber} type={'number'} id={htmlY} name={htmlY}
                        // disabled={true}
                           onChange={onYChange}
                           value={Number(mapPos.y.toFixed(3))}/>
                </div>

            </div>
            <button className={styles.addButton} type={'button'} onClick={onOpenMapHandler}>OpenMap</button>
        </div>
    )
}
type TPosStageField = {
    posX: number,
    posY: number,
    onPosChange: (pos: TMapPosition)=>void
}
export const PosStageField: React.FC<TPosStageField> = ({posX, posY, onPosChange}) => {
    const [isPosFromMarker, setIsPosFromMarker] = useState(false);
    const [coord, setCoord] = useState<TMapPosition>({x: posX, y:posY})
    const dispatch = useAppDispatch()
    const markerPos = useSelector(getMarkerForAddPosSelector)
    const onOpenMapHandler = () => {
        setIsPosFromMarker(true)
        dispatch(MapSlice.actions.setIsAddPosFieldActive(true))
    }
    const mapPos = isPosFromMarker ? markerPos : {x: posX, y: posY}
    const onCoordChange = () =>{
        setCoord(actual=>({...actual, x: Number(mapPos.x.toFixed(3)), y: Number(mapPos.y.toFixed(3))}))
        onPosChange({x: Number(mapPos.x.toFixed(3)), y: Number(mapPos.y.toFixed(3))})
    }
    useEffect(()=>{
        onCoordChange()
    },[markerPos])
    return (
        <div className={styles.fieldBoxCol} key={0}>
            {'Position on map'}
            <div className={styles.fieldBoxNoBorder}>
                <div className={styles.fieldBoxPos}>
                    <label className={styles.label} htmlFor={`htmlX`}>x:</label>
                    <input className={styles.inputNumber} type={'number'} id={`htmlX`} name={`htmlX`}
                        // disabled={true}
                        //    onChange={onCoordChange}
                           value={coord.x}/>
                </div>
                <div className={styles.fieldBoxPos}>
                    <label className={styles.label} htmlFor={`htmlY`}>y:</label>
                    <input className={styles.inputNumber} type={'number'} id={`htmlY`} name={`htmlY`}
                        // disabled={true}
                        //    onChange={onCoordChange}
                           value={coord.y}/>
                </div>
            </div>
            <button className={styles.addButton} type={'button'} onClick={onOpenMapHandler}>OpenMap</button>
        </div>
    )
}