import React from 'react';
import {getWeight} from "../../../Unils/utilsFunctions";
import {AddFields, TSelectFieldOptionsKeys} from "../AddFields";
import {FormikProps} from "formik";
import {AttributeField} from "./AttributeField";
import {LootField} from "./LootField";
import {NotesField} from "./NotesField";
import {getSkillsArr, selectFieldsOptions} from "../../../Types/Utils";
import {SelectField, SimpleBooleanField, SimpleSelectField} from "./SelectField";
import {StageField} from "./StageField";
import {StageQuestField} from "./QuestStageField";
import {AbilityFiled} from "./AbilityFiled";
import {RecipePartField} from "./RecipePartFiled";
import {EvoQuestField} from "./EvoQuestFiled";
import {BoundField} from "./BoundField";
import {PosQuestItemField} from "./PosField";
import {CompanionSkillField} from "./CompanionSkillField";
import {ShopContentField} from "./ShopContentField";
import {NO_LOOT} from "../../../Types/CommonTypes";
import {SimpleInputField} from "./InputField";
import {LootAddField} from "./LootAddField";
import {RewardCostFiled} from "./RewardCostFiled";
// import styles from './CommonFields.module.css';


export const fieldsIgnoreList = ['name', '_id', '__v', 'author']
export const fieldsNotRequiredList = ['Ru', 'Fr','link']
export const fieldsDisabled = ['staminaelixir.translate.En','staminaelixir.translate.Ru','staminaelixir.translate.Fr']

export const commonFields = (
    formik: FormikProps<any>,
    key:string,
    values: object,
    dataName: string): JSX.Element => {
    // console.log(`key: ${key}, valuse: ${values}`)
    const entries = Object.entries(values).sort((a, b) => getWeight(a[0]) - getWeight(b[0]))
    return (
        <>
            {entries.map(([eKey, value], i) => {
                const curKey = key.length ? `${key}.${eKey}` : eKey
                const selectPathToFind = eKey === 'type' ? `${dataName}.${eKey}` : `${eKey}`
                const selArr = selectFieldsOptions[`${selectPathToFind}` as TSelectFieldOptionsKeys];
                const isSelectAvailable = selArr?.length && selArr?.length > 0
                switch (true) {
                    case fieldsIgnoreList.includes(eKey):
                        return null
                    case dataName==='trainer' && (eKey ==='cost' || eKey==='reward'):
                        // console.log(eKey,value)
                        // console.log('formik values', formik.values[eKey])
                        return <RewardCostFiled index={i} formik={formik} field={eKey} dataName={dataName}/>
                    case dataName === 'quest' && eKey === 'startAt':
                        return <SimpleSelectField
                            mapSelectValues={['auto',...(selectFieldsOptions["npc"]||['not found'])]}
                            value={formik.values.startAt} onSelChange={val=>formik.setFieldValue('startAt', val)}
                            labelText={'Start:'}/>
                    case dataName === 'quest' && eKey === 'endAt':
                        return <SimpleSelectField
                            mapSelectValues={['auto',...selectFieldsOptions["npc"]||['not found']]}
                            value={formik.values.endAt} onSelChange={val=>formik.setFieldValue('endAt', val)}
                            labelText={'End:'}/>
                    case dataName === 'trainer' && eKey === 'type':
                        return <SimpleSelectField
                            mapSelectValues={getSkillsArr()}
                            value={formik.values.type} onSelChange={val=>formik.setFieldValue('type', val)}
                            labelText={'type'}/>
                    case dataName==='questItemSource' && eKey==='En':
                        return <SimpleSelectField key={i} mapSelectValues={selectFieldsOptions['questitem'] || ['Error']}
                                                  value={formik.values.translate.En}
                                                  onSelChange={v=>formik.setFieldValue('translate.En', v)} labelText={'Quest Item name'}/>
                    case eKey === 'moveTo':
                        return <SimpleSelectField mapSelectValues={['',...(selectFieldsOptions["location"] || ['No location in bd'])]} value={formik.values.moveTo} onSelChange={val=>formik.setFieldValue('moveTo', val)} labelText={'moveTo'}/>
                    case eKey === 'resultType':
                        return <SimpleSelectField
                            mapSelectValues={[...(selectFieldsOptions["equip"] || ['No location in bd'])]}
                            value={formik.values.resultType} onSelChange={val=>formik.setFieldValue('resultType', val)} labelText={'Result'}/>
                    case eKey==='content':
                        return <ShopContentField key={i}  formik={formik} index={i} dataName={dataName}/>
                    case eKey==='pos':
                        return AddFields.posField(value['x'], value['y'], curKey, i, formik, dataName)
                    case eKey==='icon':
                        return AddFields.icon(formik, i+100, dataName === 'staminaelixir')
                    case eKey==='abilities':
                        return <AbilityFiled key={i} formik={formik} index={i} dataName={dataName}/>
                    case eKey==='skills':
                        // console.log(`skilll ${dataName} ${eKey} ${value}`)
                        // console.log(value)
                        return <CompanionSkillField key={i} formik={formik} index={i} dataName={dataName}/>
                    case eKey==='bound':
                        return <BoundField key={i} formik={formik} index={i} dataName={dataName}/>
                    case eKey==='parts':
                        return <RecipePartField key={i} formik={formik} index={i} dataName={dataName}/>
                    case eKey==='evoQuests':
                        return <EvoQuestField key={i} formik={formik} index={i} dataName={dataName}/>
                    case eKey==='attributes':
                        return <AttributeField key={i} formik={formik} index={i} dataName={dataName}/>
                    case eKey==='loot' && dataName==='loot':
                        return <LootField key={i} formik={formik} index={i} dataName={dataName}/>
                    case eKey==='loot' && dataName!=='loot':
                        return <LootAddField index={i} dataName={dataName} formik={formik}/>
                        // return AddFields.select([NO_LOOT, ...selectFieldsOptions[`loot`] || ['empty db']] as string[] | number[],value, formik,curKey,eKey,i+50,false )
                    case eKey==='notes':
                        return <NotesField key={i} formik={formik} index={i} dataName={dataName}/>
                    case eKey==='posQuestItem': // type={formik.values.type} position={formik.values.posQuestItem.}
                        return <PosQuestItemField key={i} formik={formik} onPositionChange={(pos)=>formik.values.posQuestItem = {...pos}}/>
                    case eKey==='qStages' || eKey==='eStages':
                        return dataName==='quest'
                            ?<StageQuestField key={i} onStageAdd={()=>console.log('addddddd')} formik={formik} />
                            :<StageField key={i} formik={formik} onStageAdd={()=>null}/>
                    case eKey==='quest' &&  dataName==='location' :
                        return AddFields.select(selectFieldsOptions[`quest`] as string[] | number[],value, formik,curKey,eKey,i+50,false )
                    case eKey==='availableAfter' &&  dataName==='quest' :
                        let selQuests = selectFieldsOptions[`quest`]// || ['No knows dependencies for this quest']
                        if(selQuests === undefined || selQuests.length===0) selQuests =  ['No knows dependencies for this quest']
                        else selQuests = ['No knows dependencies for this quest',...selQuests]
                        return AddFields.select(selQuests as string[] | number[],value, formik,curKey,eKey,i+50,false )
                    case isSelectAvailable:
                        return AddFields.select(selArr as string[] | number[],value, formik,curKey,eKey,i+50,true )

                    case typeof value ==='number':
                        return AddFields.input('number',value, formik,curKey,eKey,i,!fieldsNotRequiredList.includes(eKey),fieldsDisabled.includes(`${dataName}.${curKey}`))

                    case typeof value ==='string':
                        return AddFields.input('text',value, formik,curKey,eKey,i,!fieldsNotRequiredList.includes(eKey),fieldsDisabled.includes(`${dataName}.${curKey}`))
                    case typeof value==='object' :
                        return commonFields(formik,curKey, value,dataName)
                    case typeof value === 'boolean' && eKey==='isBattle':
                        return <SimpleBooleanField value={value} labelText={eKey} onSelChange={val=>formik.setFieldValue(key, val)}/>

                    default:
                        console.error(`Default in commonFields// ekey: ${eKey},${curKey},${value},${typeof value}`)
                }
            })}
        </>
    )
}


type TProps = {};
export const CommonFields: React.FC<TProps> = (props) => {
    return (
        <div>

        </div>
    );
}