import React from 'react';
import styles from "./DataAdd.module.css";
import {FormikProps} from "formik";
import {IconField} from "./Fields/IconField";
import {PosField} from "./Fields/PosField";
import {InputField} from "./Fields/InputField";
import {SelectField} from "./Fields/SelectField";

export type TSelectFieldOptions = typeof selectFieldsOptions;
export type TSelectFieldOptionsKeys = keyof typeof selectFieldsOptions;
export const selectFieldsOptions = {
    'material.type': ['Bone', 'Fiber', 'Leather', 'Metal', 'Stone', 'Wood'],
    'material.attributes': ['Absorbity', 'Density', 'Flexibility', 'Hardness', 'Lightness', 'Purity', 'Radiance', 'Rigidity',],
    'component.attributes': [
        'Activator', 'Binder', 'Deteriorator', 'Energizer', 'Focuser', 'Fortifier', 'Putrefier', 'Stimulator', 'Toner',
        'Tranquilizer', 'Elioam', 'Frimam', 'Hydram', 'Lectram', 'Lithram', 'Magnam', 'Psycham', 'Pyram', 'Stratam',
    ],
    // 'material.tier': [0, 1, 2, 3, 4, 5],
    'adventure': ['Academic', 'Athletics', 'Exploration', 'Perception', 'Persuasion', 'Strategy', 'Subterfuge'],
    'weapon.type': ['Axe', 'Dagger', 'Mace', 'Polearm', 'Staff', 'Sword'],
    'crafting': ['Alchemy', 'Forge', 'Herbalism', 'Sewing', 'Stoneworking', 'Tanning', 'Woodworking'],
    'reputation.guild': ['Arcanists', 'Circle of the Great Tree', 'Claw Assembly', 'Lunar caravan', 'Mistwalkers', 'Order of the Hippogriff', 'Protector of the Rose'],
    'reputation.town': ['Gantras', 'Kortombe', 'Larcen', 'Thorval', 'Wellnear'],
    'component.type': ['Plant', 'Gem', 'Substance', 'Powder', 'Sap', 'Pollen', 'Artefact'],
    'tier': [0, 1, 2, 3, 4, 5],
    'terrain': ['Forest', 'Mountain', 'Swamp', 'Underground', 'Desert', 'Mists', 'Urban'],
    'gatherpoint.type': ['Botany', 'Hunting', 'Lumberjacking', 'Mining'],


    'stage.type': ['Adventure'],

    'material': undefined as Array<string> | undefined,
    'component': undefined as Array<string> | undefined,
    'location': undefined as Array<string> | undefined,
    'region': undefined as Array<string> | undefined,
    'npc': undefined as Array<string> | undefined,
    'loot': undefined as Array<string> | undefined,
    'event': undefined as Array<string> | undefined,
    'mapobject': undefined as Array<string> | undefined,


    'gatherpoint.Botany': undefined as Array<string> | undefined,
    'gatherpoint.Hunting': undefined as Array<string> | undefined,
    'gatherpoint.Lumberjacking': undefined as Array<string> | undefined,
    'gatherpoint.Mining': undefined as Array<string> | undefined,
}
export const AddFields = {
    input: (type: React.HTMLInputTypeAttribute,
            value: string | number | readonly string[] | undefined,
            formik: FormikProps<any>,
            htmlId: string,
            labelText: string = '',
            index: number = 0,
            required: boolean = false,
            disabled: boolean = false
    ) =>
        <InputField index={index} formik={formik} value={value} htmlId={htmlId} labelText={labelText}
                    disabled={disabled} required={required}/>,
    select: (
        mapSelectValues: Array<string> | Array<number>,
        value: string | number | readonly string[] | undefined,
        formik: FormikProps<any>,
        htmlId: string,
        labelText: string = '',
        index: number = 0,
        required: boolean = false,
        disabled: boolean = false,
    ) =>
        <SelectField mapSelectValues={mapSelectValues} index={index} formik={formik} value={value} htmlId={htmlId}
                     labelText={labelText}
                     disabled={disabled} required={required}/>,
    posField: (
        posX: number,
        posY: number,
        htmlId: string,
        index: number = 0,
        formik: FormikProps<any>
    ) =>
        <PosField formik={formik} posX={posX} posY={posY} htmlId={htmlId} index={index}/>,
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
        let mapSelNameValues = selectFieldsOptions[`gatherpoint.${type}` as TSelectFieldOptionsKeys]
        const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            console.log(`change name on ${e.target.value}`)
            // formik.values.name = e.target.value
            formik.values.translate.En = e.target.value
            // mapSelNameValues = selectFieldsOptions[`gatherpoint.${formik.values.type}` as TSelectFieldOptionsKeys]
            formik.handleChange(e)
        }
        const defVal = mapSelNameValues ? mapSelNameValues[0] : undefined
        return (
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
        )
    },
    icon: (
        formik: FormikProps<any>,
        index: number = 0,
        disabled: boolean = false) => {
        return (
            <IconField index={index} formik={formik} disabled={disabled}/>
        )
    }
}


// export const AddFields:React.FC<TProps> = (props) => {
//     return (
//         <div>
//
//         </div>
//     );
// }