import React, {useState} from 'react';
import styles from "./DataAdd.module.css";
import {useAppDispatch} from "../../redux/store";
import {MapSlice} from "../../redux/reducers/mapReducer";
import {useSelector} from "react-redux";
import {getMarkerForAddPosSelector} from "../../redux/dataSelectors";
import {FormikProps} from "formik";
import {IconPicker} from "../IconPicker/IconPicker";

export type TSelectFieldOptions = typeof selectFieldsOptions;
export type TSelectFieldOptionsKeys = keyof typeof selectFieldsOptions;
export const selectFieldsOptions = {
    'material.type': ['Bone', 'Fiber', 'Leather', 'Metal', 'Stone', 'Wood'],
    // 'material.tier': [0, 1, 2, 3, 4, 5],

    'component.type': ['Plant', 'Gem', 'Substance', 'Powder', 'Sap', 'Pollen', 'Artefact'],
    'tier': [0, 1, 2, 3, 4, 5],

    'material': undefined as Array<string> | undefined,
    'component': undefined as Array<string> | undefined,
    'location': undefined as Array<string> | undefined,
    'region': undefined as Array<string> | undefined,
    'npc': undefined as Array<string> | undefined,
    'loot': undefined as Array<string> | undefined,

    'terrain': ['Forest', 'Mountain', 'Swamp', 'Underground', 'Desert', 'Mists', 'Urban'],
    'gatherpoint.type': ['Botany', 'Hunting', 'Lumberjacking', 'Mining'],
    'gatherpoint.Botany': undefined as Array<string> | undefined,
    'gatherpoint.Hunting': undefined as Array<string> | undefined,
    'gatherpoint.Lumberjacking': undefined as Array<string> | undefined,
    'gatherpoint.Mining': undefined as Array<string> | undefined,
}
export const AddFields = {
    input: (type: React.HTMLInputTypeAttribute,
            value: string | number | readonly string[] | undefined,
            onChange: React.ChangeEventHandler<HTMLInputElement>,
            htmlId: string,
            labelText: string = '',
            required: boolean = false,
            index: number = 0,
            cssFieldBox: string = styles.fieldBox,
            cssLabel: string = styles.label,
            cssInput: string = styles.inputNumber,
            disabled: boolean = false) =>
        (<div className={cssFieldBox} key={index}>
            <label className={cssLabel} htmlFor={htmlId}>{labelText}</label>
            <input className={cssInput} type={type} id={htmlId} name={htmlId}
                   onChange={onChange}
                   required={required}
                   disabled={disabled}
                   autoComplete={'off'}
                   value={value}/>
        </div>),
    select: (
        value: string | number | readonly string[] | undefined,
        onChange: React.ChangeEventHandler<HTMLSelectElement>,
        htmlId: string,
        labelText: string = '',
        index: number = 0,
        mapSelectValues: Array<string> | Array<number>,
        cssFieldBox: string = styles.fieldBox,
        cssLabel: string = styles.label,
        cssInput: string = styles.inputNumber,) => {
        // if(labelText==='region') console.log(value)

        return (<div className={cssFieldBox}>
                <label className={cssLabel} htmlFor={htmlId}>{labelText}</label>
                <select defaultValue={mapSelectValues[0]}
                        className={cssInput}
                        name={htmlId}
                        onChange={onChange}
                        value={value}
                        required={true}>
                    {labelText !== 'type' && <option value="" disabled selected>{`Select ${labelText}`}</option>}
                    {mapSelectValues.map((v, i) => (<option selected={i === 0} value={v}>{v}</option>))}
                </select>
            </div>
        )
    },
    posField: (
        // pos: { x: number, y: number },
        posX: number,
        posY: number,
        onChange: React.ChangeEventHandler<HTMLInputElement>,
        htmlId: string,
        index: number = 0,
        formik: FormikProps<any>
    ) => (<PosField formik={formik} posX={posX} posY={posY} onChange={onChange} htmlId={htmlId} index={index}/>

    ),
    gathertypename: (
        type: string | number | readonly string[] | undefined,
        formik: FormikProps<any>,
        onChange: React.ChangeEventHandler<HTMLSelectElement>,
        htmlId: string,
        labelText: string = '',
        index: number = 0,
        cssFieldBox: string = styles.fieldBox,
        cssLabel: string = styles.label,
        cssInput: string = styles.inputNumber,) => {
        // let curType = formik.values.type
        // const mapSelTypeValues = selectFieldsOptions["gatherpoint.type"]
        // console.log(`gatherpoint.${formik.values.type}`)
        let mapSelNameValues = selectFieldsOptions[`gatherpoint.${type}` as TSelectFieldOptionsKeys]
        const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            console.log(`change name on ${e.target.value}`)
            // formik.values.name = e.target.value
            formik.values.translate.En = e.target.value
            // mapSelNameValues = selectFieldsOptions[`gatherpoint.${formik.values.type}` as TSelectFieldOptionsKeys]
            formik.handleChange(e)
        }
        const defVal = mapSelNameValues ? mapSelNameValues[0] : undefined
        return (<>
                <div className={cssFieldBox}>
                    <label className={cssLabel} htmlFor={htmlId}>{labelText}</label>
                    <select defaultValue={defVal}
                            className={cssInput}
                            name={htmlId}
                            onChange={onChange}
                            value={formik.values.translate.En}
                            required={true}>
                        {!formik.values.name.length &&
                            <option value="" disabled selected hidden>{`Select ${labelText}`}</option>}
                        {mapSelNameValues?.map((v, i) => (<option value={v}>{v}</option>))}

                    </select>
                </div>
                {/*{mapSelNameValues && mapSelNameValues.length && <div className={cssFieldBox}>*/}
                {/*    <label className={cssLabel} htmlFor={htmlId}>name</label>*/}
                {/*    <select className={cssInput} name={htmlId} onChange={onChange}*/}
                {/*            value={formik.values.name}>*/}
                {/*        {mapSelNameValues?.map((v, i) => (<option value={v}>{v}</option>))}*/}
                {/*    </select>*/}
                {/*</div>}*/}

            </>

        )
    },
    icon: (
           formik: FormikProps<any>,
           index: number = 0,
           disabled: boolean = false) => {
        return (<IconField  index={index} formik={formik} disabled={disabled}/>


        )
    }
}

type IconFieldProps = {
    // pos: { x: number, y: number },
    // onChange: React.ChangeEventHandler<HTMLInputElement>,
    index: number,
    formik: FormikProps<any>
    disabled: boolean
}
const IconField: React.FC<IconFieldProps> = ({index, formik, disabled}) => {
    const [isPickIcon, setIsPickIcon] = useState(false)
    const [iconURL, setIconURL] = useState(formik.values.icon)
    const onAddIcon = () =>{
        setIsPickIcon(true)
    }
    const onIconPickHandler = (path: string, url: string) =>{
        formik.setFieldValue('icon', path)
        setIsPickIcon(false)
        setIconURL(url)
    }
    const onClose = () =>{
        setIsPickIcon(false)
    }

    return (
        <div className={styles.iconMainDiv}>
            <div className={styles.iconFieldBox}>
                <label className={styles.iconLabel} htmlFor={'icon'}>icon:</label>
                <input disabled={disabled} className={styles.iconInput} type={'text'} id={'icon'} name={'icon'}
                    // disabled={true}
                    //    onChange={onYChange}
                       value={formik.values.icon}/>
                {iconURL && <img className={styles.imgIcon} src={iconURL}/>}
                {!iconURL && <img className={styles.imgIcon} src={require('./../../assets/icons/location/Unknown.png')}/>}
            </div>
            {isPickIcon && <IconPicker onClose={onClose} onIconPickHandler={onIconPickHandler} />}
            <button disabled={disabled} onClick={onAddIcon}>Choose Icon</button>
        </div>

    )
}

type PosFieldProps = {
    // pos: { x: number, y: number },
    posX: number,
    posY: number,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    htmlId: string,
    index: number,
    formik: FormikProps<any>
}
const PosField: React.FC<PosFieldProps> = ({posX, posY, onChange, htmlId, index, formik}) => {
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
    return <div className={styles.posMainDiv} key={index}>
        <div className={styles.posCoordDiv}>
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
        <button type={'button'} onClick={onOpenMapHandler}>OpenMap</button>
    </div>
}
// export const AddFields:React.FC<TProps> = (props) => {
//     return (
//         <div>
//
//         </div>
//     );
// }