import {FormikProps} from "formik";
import React, {useEffect, useState} from "react";
import {useAppDispatch} from "../../../redux/store";
import {useSelector} from "react-redux";
import {getMarkerForAddPosSelector, MapSelectors} from "../../../redux/dataSelectors";
import {MapSlice} from "../../../redux/reducers/mapReducer";
import posStyles from "../DataAdd.module.css";
import styles from './Fields.module.css';
import {TMapPosition} from "../../../Types/CommonTypes";

type PosFieldProps = {
    // pos: { x: number, y: number },
    // posX: number,
    // posY: number,
    // onChange: React.ChangeEventHandler<HTMLInputElement>,
    // htmlId: string,
    index: number,
    formik: FormikProps<any>
    dataName: string
}
export const BoundField: React.FC<PosFieldProps> = (props) => {
    const {index, formik, dataName} = props
    const [isBoundsFromMap, setIsBoundsFromMap] = useState(false);
    // const [bounds, setBounds] = useState<Array<[number, number]>>([])
    const dispatch = useAppDispatch()
    // const markerPos = useSelector(getMarkerForAddPosSelector)
    const bounds = useSelector(MapSelectors.getBounds)
    const isBoundsActive = useSelector(MapSelectors.isBoundActive)
    const onOpenMapHandler = () => {
        dispatch(MapSlice.actions.setIsMapActive(true))
        setIsBoundsFromMap(true)
        dispatch(MapSlice.actions.setIsAddBoundsActive(true))
    }
    const onCloseMapHandler = () => {
        dispatch(MapSlice.actions.setIsMapActive(false))
        setIsBoundsFromMap(false)
        dispatch(MapSlice.actions.setIsAddBoundsActive(false))
    }
    useEffect(()=>{
        formik.setFieldValue('bound', bounds)
    }, [bounds])
    return (
        <div className={styles.fieldBoxCol} key={index}>
            {'Bounds'}
            <div className={styles.fieldBoxNoBorder}>
                {bounds.length}
                {/*{bounds.map(v=>`${v[0]}:${v[1]}, `)}*/}
            </div>

            {!isBoundsActive && <button className={styles.addButton} type={'button'} onClick={onOpenMapHandler}>OpenMap</button>}
            {isBoundsActive && <button className={styles.addButton} type={'button'} onClick={onCloseMapHandler}>CloseMap</button>}
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