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
import styles from './Fields.module.css';
import {TLocation, TMapPosition, TMonster, TQuestItemPosition, TQuestItemPosType} from "../../../Types/CommonTypes";
import {EAddState, selectFieldsOptions} from "../../../Types/Utils";
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
const getStrPos = (pos:TMapPosition)=>`${pos.x}:${pos.y}`
export const PosQuestItemField: React.FC<TQuestItemPosProps> = (props) => {
    // console.log(props.formik.values)
    const {onPositionChange, formik} = props
    const dispatch = useAppDispatch()
    const [type, setType] = useState<TQuestItemPosType>(()=>{
        console.log('asdasdasdasdsaddddddddddddddddddd 1')
        return formik.values.posQuestItem.type
    })
    const [saveState, setSaveState] = useState<EAddState>(0)
    // const [name, setName] = useState<string>(formik.values.name)
    // const [mapPos, setMapPos] = useState<TMapPosition | undefined>(undefined)
    const [genPos, setGenPos] = useState<string | undefined>(()=>{
        console.log('asdasdasdasdsaddddddddddddddddddd 2')
        return formik.values.posQuestItem.type === 'pos'
            ?getStrPos(formik.values.posQuestItem.position):formik.values.posQuestItem.position
    })

    const locations = useSelector(LocationSelectors.getData)
    const monsters = useSelector(MonsterSelectors.getData)

    const onTypeChange = (v: string) =>{
        setGenPos('')
        setType(v as TQuestItemPosType)
    }
    // useEffect(()=>{
    //     console.log('CHANGINGGEN POS')
    //
    // },[type])

    // useEffect(() => {
    //     setGenPos(mapPos)
    // }, [mapPos])

    useEffect(() => {
        console.log(`FORMIK CHANGED`)
        setGenPos(formik.values.posQuestItem.position)
        setType(formik.values.posQuestItem.type)
    }, [formik.values.posQuestItem])
    const onPosSave = () =>{
        if (genPos !== undefined && !!genPos) {
            setSaveState(EAddState.added)
            switch (type) {
                case "pos":
                    const tempPos = genPos.split(':')
                    onPositionChange({type, position: {x:+tempPos[0], y:+tempPos[1]} as TMapPosition})
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
                    setSaveState(EAddState.error)
                    console.error(`quest item  pos change fail t:${type}/gp:${genPos}`)
            }
        }else {
            setSaveState(EAddState.error)
        }

    }

    return (
        <div>
            <p>Choose position</p>
            <div>{saveState===EAddState.error ?'ERROR or not saved!': saveState===EAddState.added ? 'SAVED!':'EMPTY'}</div>
            <SimpleSelectField mapSelectValues={[...selectFieldsOptions['questItem.postype']]} value={type}
                               onSelChange={onTypeChange} labelText={'Pos type'}/>

            {type === 'pos' && <SimplePosField onPosChange={(pos) => setGenPos(getStrPos(pos))}/>}
            {type === 'location' && <SimpleSelectField mapSelectValues={selectFieldsOptions['location'] || ['Error']}
                                                       value={genPos}
                                                       onSelChange={v => setGenPos(v)} labelText={'location'}/>}
            {type === 'monster' && <SimpleSelectField mapSelectValues={selectFieldsOptions['monster'] || ['Error']}
                                                      value={genPos}
                                                      onSelChange={v => setGenPos(v)} labelText={'mob'}/>}
            <button type={'button'} className={styles.addButton} onClick={onPosSave}>Save</button>
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