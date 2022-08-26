import React from 'react';
import styles from "./DataAdd.module.css";
import {TLocation, TNpc, TRegion} from "../../Types/ResourceTypes";
// import styles from './AddFields.module.css';

export type TSelectFieldOptions = typeof selectFieldsOptions;
export type TSelectFieldOptionsKeys = keyof typeof selectFieldsOptions;
export const selectFieldsOptions = {
    'material.type': ['Bone', 'Fiber', 'Leather', 'Metal', 'Stone', 'Wood'],
    // 'material.tier': [0, 1, 2, 3, 4, 5],

    'component.type': ['Plant', 'Gem', 'Substance', 'Powder', 'Sap', 'Pollen', 'Artefact'],
    'tier': [0, 1, 2, 3, 4, 5],

    'material' : undefined as Array<string> | undefined,
    'component' : undefined as Array<string> | undefined,
    'location' : undefined as Array<string> | undefined,
    'region' : undefined as Array<string> | undefined,
    'npc' : undefined as Array<string> | undefined,

    'terrain': ['Forest' , 'Mountain' , 'Swamp' , 'Underground' , 'Desert' , 'Mists' , 'Urban']
 }
export const AddFields = {
    input: (type: React.HTMLInputTypeAttribute,
            value: string | number | readonly string[] | undefined,
            onChange: React.ChangeEventHandler<HTMLInputElement>,
            htmlId: string,
            labelText: string = '',
            required: boolean = false,
            index: number = 0,
            cssFieldBox: string = '',
            cssLabel: string = '',
            cssInput: string = '',) =>
        (<div className={cssFieldBox} key={index}>
            <label className={cssLabel} htmlFor={htmlId}>{labelText}</label>
            <input className={cssInput} type={type} id={htmlId} name={htmlId}
                   onChange={onChange}
                   required={required}
                   value={value}/>
        </div>),
    select: (
        value: string | number | readonly string[] | undefined,
        onChange: React.ChangeEventHandler<HTMLSelectElement>,
        htmlId: string,
        labelText: string = '',
        index: number = 0,
        mapSelectValues: Array<string> | Array<number>,
        cssFieldBox: string = '',
        cssLabel: string = '',
        cssInput: string = '',) => (
        <div className={cssFieldBox}>
            <label className={cssLabel} htmlFor={htmlId}>{labelText}</label>
            <select className={cssInput} name={htmlId} onChange={onChange}
                    value={value}>
                {mapSelectValues.map((v,i) => (<option selected={i===0} value={v}>{v}</option>))}
            </select>
        </div>
    )
}
// export const AddFields:React.FC<TProps> = (props) => {
//     return (
//         <div>
//
//         </div>
//     );
// }