import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {ComponentSelectors, MaterialSelectors, RecipeSelectors} from "../../../redux/dataSelectors";
import {TEquip, TRecipePart} from "../../../Types/CommonTypes";
import styles from "./Fields.module.css";
import {SimpleSelectField} from "./SelectField";
import {selectFieldsOptions} from "../../../Types/Utils";
// import styles from './EquipField.module.css';

type TProps = {
    onEquipAdd: (equip: TEquip)=>void
};
export const EquipField:React.FC<TProps> = (props) => {
    const str = 'Equip'
    const [equip, setEquip] = useState<string>('')
    const [isSaved, setIsSaved] = useState(false)

    const [recipeParts, setRecipeParts] = useState<Array<TRecipePart> | null>(null)
    const [equipComponents, setEquipComponents] = useState<Array<string>>([])

    const recipes = useSelector(RecipeSelectors.getData)
    const materials = useSelector(MaterialSelectors.getData)
    const components = useSelector(ComponentSelectors.getData)

    const onSaveHandler = () => {
        const findRes = recipes.find(v => v.name === equip)
        if (findRes !== undefined && equipComponents.every(v=>v.length>0)) {
            setIsSaved(true)
            props.onEquipAdd({recipe: findRes, components: equipComponents})
        }
        else console.log(`fail Save ${equip}`)
    }
    const onRecipeSelectHandler = (value: string) => {
        const findRes = recipes.find(v => v.name === value)
        if (findRes !== undefined) {
            setEquip(value)
            setRecipeParts(findRes.parts)
        } else {
            console.log('Error in find recipe')
            console.log(value)
        }
    }
    useEffect(()=>{
        if(recipeParts === null || recipeParts.length===0) setEquipComponents([])
        else setEquipComponents(recipeParts.map(v=>''))
    },[recipeParts])
    return (
        <div className={styles.divCol}>
            <div className={styles.fieldBoxColNoBorder}>
                <SimpleSelectField mapSelectValues={selectFieldsOptions['recipe'] || ['not found']}
                                   value={equip} onSelChange={onRecipeSelectHandler}
                                   labelText={`${str}`}/>
                {recipeParts?.map((v: TRecipePart, i: number) => {
                    const selectStrings = materials
                        .filter(mat=>mat.type===v.component).map(v=>v.name)
                        .concat(components.filter(com=>com.type===v.component).map(v=>v.name))
                    return <SimpleSelectField mapSelectValues={selectStrings || ['not found']}
                                              value={equipComponents[i]}
                                              onSelChange={(val) => equipComponents[i] = val}
                                              labelText={`${v.component}`}/>
                })}
                <div className={styles.divRow}>
                    <button type={'button'} className={styles.addButton} onClick={onSaveHandler}>Save equip</button>
                    {`${!isSaved?`Not saved`:`Saved`}`}
                </div>

            </div>
        </div>
    )
}