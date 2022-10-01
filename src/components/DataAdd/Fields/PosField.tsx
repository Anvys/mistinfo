import {FormikProps} from "formik";
import React, {useEffect, useState} from "react";
import {useAppDispatch} from "../../../redux/store";
import {useSelector} from "react-redux";
import {
    getMarkerForAddPosSelector,
    LocationSelectors,
    MapSelectors,
    MonsterSelectors
} from "../../../redux/dataSelectors";
import {MapSlice} from "../../../redux/reducers/mapReducer";
import posStyles from "../DataAdd.module.css";
import styles from './Fields.module.css';
import {
    TLocation,
    TMapPosition, TMonster,
    TNpc,
    TQuestItemPosition,
    TQuestItemPosType,
    TStagePos
} from "../../../Types/CommonTypes";
import {selectFieldsOptions} from "../../../Types/Utils";
import {SimpleInputField} from "./InputField";
import {SimpleSelectField} from "./SelectField";

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


    // const isAddActive = useSelector(MapSelectors.isAddActive)
    const isMapActive = useSelector(MapSelectors.isMapActive)
    // const isBoundActive = useSelector(MapSelectors.isBoundActive)
    const onOpenMapHandler = () => {
        dispatch(MapSlice.actions.setIsMapActive(true))
        setIsPosFromMarker(true)
        dispatch(MapSlice.actions.setIsAddPosFieldActive(true))
    }
    const onCloseMapHandler = () => {
        dispatch(MapSlice.actions.setIsMapActive(false))
        // setIsPosFromMarker(false)
        dispatch(MapSlice.actions.setMarkerForAddPos({x:Number(mapPos.x.toFixed(3)), y: Number(mapPos.y.toFixed(3))}))
        // dispatch(MapSlice.actions.setIsAddPosFieldActive(false))
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
    // useEffect(()=>{
    //     formik.setFieldValue('pos', {x: Number(mapPos.x.toFixed(3)), y: Number(mapPos.y.toFixed(3))})
    // },[mapPos])
    return (
        <div className={styles.fieldBoxCol} key={index}>
            {dataName === 'region' ? 'Center of region' : 'Position on map'}
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
            {!isMapActive &&
                <button className={styles.addButton} type={'button'} onClick={onOpenMapHandler}>OpenMap</button>}
            {isMapActive &&
                <button className={styles.addButton} type={'button'} onClick={onCloseMapHandler}>CloseMap</button>}
        </div>
    )
}
type TPosStageField = {
    posX: number,
    posY: number,
    onPosChange: (pos: TMapPosition) => void
}
export const PosStageField: React.FC<TPosStageField> = ({posX, posY, onPosChange}) => {
    const [isPosFromMarker, setIsPosFromMarker] = useState(false);
    const [coord, setCoord] = useState<TMapPosition>({x: posX, y: posY})
    const dispatch = useAppDispatch()
    const isBoundActive = useSelector(MapSelectors.isBoundActive)
    const isMapActive = useSelector(MapSelectors.isMapActive)
    // console.log(`map active: ${isMapActive}`)
    const markerPos = useSelector(getMarkerForAddPosSelector)
    const onOpenMapHandler = () => {
        dispatch(MapSlice.actions.setIsMapActive(true))
        // console.log(`post: ${isPosFromMarker}`)
        setIsPosFromMarker(true)
        dispatch(MapSlice.actions.setIsAddPosFieldActive(true))
    }
    const onCloseMapHandler = () => {
        dispatch(MapSlice.actions.setIsMapActive(false))
        // console.log(`post: ${isPosFromMarker}`)
        setIsPosFromMarker(false)
        dispatch(MapSlice.actions.setIsAddPosFieldActive(false))
    }
    const mapPos = isPosFromMarker ? markerPos : {x: posX, y: posY}
    const onCoordChange = () => {
        setCoord(actual => ({...actual, x: Number(mapPos.x.toFixed(3)), y: Number(mapPos.y.toFixed(3))}))
        onPosChange({x: Number(mapPos.x.toFixed(3)), y: Number(mapPos.y.toFixed(3))})
    }
    useEffect(() => {
        onCoordChange()
    }, [markerPos])
    useEffect(() => {
        return () => {
            dispatch(MapSlice.actions.setIsAddPosFieldActive(false))
        }
    }, [])
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
            {!isMapActive &&
                <button className={styles.addButton} type={'button'} onClick={onOpenMapHandler}>OpenMap</button>}
            {isMapActive &&
                <button className={styles.addButton} type={'button'} onClick={onCloseMapHandler}>CloseMap</button>}
        </div>
    )
}

type TQuestItemPosProps = {
    onPositionChange: (position: TQuestItemPosition) => void
    formik: FormikProps<any>
    type?: string
    position?: TQuestItemPosType
}

export const PosQuestItemField: React.FC<TQuestItemPosProps> = (props) => {
    // console.log(props.formik.values)
    const {onPositionChange, formik} = props
    const dispatch = useAppDispatch()
    const [type, setType] = useState<TQuestItemPosType>(()=>formik.values.posQuestItem.type)
    // const [name, setName] = useState<string>(formik.values.name)
    const [mapPos, setMapPos] = useState<TMapPosition | undefined>(undefined)
    const [genPos, setGenPos] = useState<string | TMapPosition | undefined>(()=>formik.values.posQuestItem.position)

    const locations = useSelector(LocationSelectors.getData)
    const monsters = useSelector(MonsterSelectors.getData)

    useEffect(()=>{
        setType(formik.values.posQuestItem.type)

    },[formik.values.posQuestItem.type])
    useEffect(()=>{
        // if(type === 'pos'){
        //     dispatch(MapSlice.actions.setMarkerForAddPos(formik.values.posQuestItem.position.x ? formik.values.posQuestItem.position: {x:23,y:-23}))
            setMapPos(formik.values.posQuestItem.position)
        // }
        // else
            setGenPos(formik.values.posQuestItem.position)




    },[formik.values.posQuestItem.position])
    useEffect(() => {
        // console.log(`setGen ${type}:${type === 'pos' ? mapPos : name}`)
        setGenPos(mapPos)
        // setGenPos(type === 'pos' ? mapPos : name)
    }, [mapPos])
    useEffect(() => {
        // console.log(`effect type => gen = null`)
        setGenPos(undefined)
    }, [type])
    useEffect(() => {
        // console.log(`Effect gen : ${type}/${Boolean(genPos)}: ${typeof genPos}`)
        // console.log(genPos)
        if (genPos !== null && genPos) {
            switch (type) {
                case "pos":
                    onPositionChange({type, position: genPos as TMapPosition})
                    break;
                case "location":
                    const loc = locations.find(v => v.name === genPos) as TLocation
                    if (loc) onPositionChange({type, position: loc as TLocation})
                    else console.log(`QI POS loc not found`)
                    break;
                case "monster":
                    const mon = monsters.find(v => v.name === genPos) as TMonster
                    if (mon) onPositionChange({type, position: mon as TMonster})
                    else console.log(`QI POS monster not found`)
                    break;
                default:
                    console.error(`quest item  pos change fail t:${type}/gp:${genPos}`)
            }
        }
    }, [genPos])
    return (
        <div>
            <p>Choose position</p>
            <SimpleSelectField mapSelectValues={[...selectFieldsOptions['questItem.postype']]} value={type}
                               onSelChange={v => setType(v as TQuestItemPosType)} labelText={'Pos type'}/>

            {type === 'pos' && <SimplePosField onPosChange={(pos) => setMapPos(pos)}/>}
            {type === 'location' && <SimpleSelectField mapSelectValues={selectFieldsOptions['location'] || ['Error']}
                                                       value={genPos as string | undefined}
                                                       onSelChange={v => setGenPos(v)} labelText={'location'}/>}
            {type === 'monster' && <SimpleSelectField mapSelectValues={selectFieldsOptions['monster'] || ['Error']}
                                                      value={genPos as string  | undefined}
                                                      onSelChange={v => setGenPos(v)} labelText={'mob'}/>}
        </div>
    )
}

type TSimplePosField = {
    x0?:number
    y0?:number
    onPosChange: (pos: TMapPosition) => void
}
export const SimplePosField: React.FC<TSimplePosField> = (props) => {
    const {onPosChange} = props

    const [isPosFromMarker, setIsPosFromMarker] = useState(false);

    const dispatch = useAppDispatch()
    const isAddActive = useSelector(MapSelectors.isAddActive)
    const isMapActive = useSelector(MapSelectors.isMapActive)
    // const isBoundActive = useSelector(MapSelectors.isBoundActive)
    const markerPos = useSelector(getMarkerForAddPosSelector)

    const onOpenMapHandler = () => {
        dispatch(MapSlice.actions.setIsMapActive(true))
        setIsPosFromMarker(true)
        dispatch(MapSlice.actions.setIsAddPosFieldActive(true))
        dispatch(MapSlice.actions.setIsAddPosFieldActive(true))
    }
    const onCloseMapHandler = () => {
        dispatch(MapSlice.actions.setIsMapActive(false))
        setIsPosFromMarker(false)
        dispatch(MapSlice.actions.setIsAddPosFieldActive(false))
    }

    // const mapPos = isPosFromMarker ? markerPos : {x: x0, y: y0}
    const mapPos = markerPos
    useEffect(() => {
        onPosChange({
            x: Number(mapPos.x.toFixed(3)),
            y: Number(mapPos.y.toFixed(3))
        })
    }, [mapPos])
    return (
        <div className={styles.fieldBoxCol} key={0}>
            {'Position on map'}
            <div className={styles.fieldBoxNoBorder}>
                <SimpleInputField value={Number(mapPos.x.toFixed(3))} onChange={v => v} index={0} htmlId={'x'}
                                  labelText={'x'} required={false} disabled={false}/>
                <SimpleInputField value={Number(mapPos.y.toFixed(3))} onChange={v => v} index={1} htmlId={'y'}
                                  labelText={'y'} required={false} disabled={false}/>
            </div>
            {!isMapActive &&
                <button className={styles.addButton} type={'button'} onClick={onOpenMapHandler}>OpenMap</button>}
            {isMapActive &&
                <button className={styles.addButton} type={'button'} onClick={onCloseMapHandler}>CloseMap</button>}
        </div>
    )
}