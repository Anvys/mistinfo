import React, {useState} from 'react';
import styles from './DataViewTable.module.css';
import fieldsStyles from './../../DataAdd/Fields/Fields.module.css'

import {useAppDispatch} from "../../../redux/store";
import {iconUrlPicker} from "../../IconPicker/IconPicker";
import {TCombineData, TRegion, TTranslateLang} from "../../../Types/CommonTypes";
import {getDataView, getTableTdKey, TDataViewObj} from "../DataView";
import {useSelector} from "react-redux";
import {AuthSelectors, GlobalSettingsSelectors} from "../../../redux/dataSelectors";
import {SimpleInputField} from "../../DataAdd/Fields/InputField";
import {useLocation} from "react-router-dom";
import {SimpleSelectField} from "../../DataAdd/Fields/SelectField";
import {selectFieldsOptions} from "../../../Types/Utils";


type TDataViewTable2Props = {
    data: Array<TCombineData>
    dataEditHandler: (id: string) => void
    dataDelHandler: (id: string) => void
    // dataName: string
    // isMod: boolean
}
export const DataViewTable2: React.FC<TDataViewTable2Props> = React.memo((props) => {
    const {dataEditHandler, dataDelHandler} = props
    const [isDeleteModeActive, setIsDeleteModeActive] = useState(false);
    const [search, setSearch] = useState('')
    const [regionFilters, setRegionFilters] = useState({land:'all', count:0})
    let data = [...props.data.filter(v=>search.length>0 ? v.name.toLocaleLowerCase().includes(search.toLowerCase()) :true)]
    // console.log(data)
    const lang = useSelector(GlobalSettingsSelectors.getLang)
    const isMod = useSelector(AuthSelectors.isInit)
    const path = useLocation().pathname
    if(path === '/region') data = data.filter((v: any)=>(regionFilters.land === 'all'? true : v.terrain===regionFilters.land)
        && v.terrainReq>=regionFilters.count)
    const dataView: TDataViewObj | null = getDataView(data, lang)
    if (!dataView && search.length===0 && path !== '/region') return <>Empty dataView</>
    const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsDeleteModeActive(e.target.checked)
    }
    // console.log(dataView)
    return (
        <div className={styles.mainBox}>
            <div className={styles.searchDiv}>
                <SimpleInputField value={search} onChange={str=>setSearch(str)} index={0} htmlId={'search'} labelText={'Search:'} required={false} disabled={false}/>
                {path==='/region' &&<>
                    <SimpleSelectField mapSelectValues={['all',...selectFieldsOptions['terrain']]} value={regionFilters.land} onSelChange={str=>setRegionFilters(a=>({...a,land: str}))} labelText={'land:'}/>
                    <SimpleInputField value={regionFilters.count} onChange={str=>setRegionFilters(a=>({...a,count: +str}))} index={0} htmlId={'dif'} labelText={'dif:'} required={false} disabled={false}/>
                </>}
            </div>
            {(search.length>0 && data.length===0 && ( path === '/region' && (regionFilters.land!=='all' || regionFilters.count>0))) || !dataView ? <p>Nothing found</p> :
            <div className={styles.vid}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {dataView.keys1.map(([key, num], i) => {
                                    const rowSpan = num > 1 ? 1 : dataView.keys2.some(([k2, num2]) => k2 === key) ? 2 : 1
                                    return <th className={styles.th1} rowSpan={rowSpan} colSpan={num} key={i} title={key}>
                                        {getTableTdKey(key, 4)}</th>
                                }
                            )}
                            {isMod && <th className={styles.th1} rowSpan={2}>Edit</th>}
                            {isMod && <th className={styles.th1} rowSpan={1}>Delete</th>}

                        </tr>
                        <tr>
                            {dataView.keys2.map(([key, num], i) => dataView.keys1.some(([k1, num1]) => k1 === key) ? null :
                                <th className={styles.th1} colSpan={num} key={i}
                                    title={key}>{getTableTdKey(key, 3)}</th>)}
                            {isMod && <th className={styles.th1}><input type={"checkbox"} checked={isDeleteModeActive}
                                                                        onChange={onCheck}/></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {dataView.values.map((val, index) =>
                            <tr className={styles.dataRow} key={index}>
                                {val.map((str, index2) => {
                                    if (index2 === 0 && dataView.keys1[0][0] === 'icon') {
                                        return (typeof str === 'string' ?
                                            <td key={index2}><img className={fieldsStyles.imgIcon} key={index2}
                                                                  src={iconUrlPicker(str.split('/')[0], str.split('/')[1])}/>
                                            </td> : null)
                                    }
                                    const stl = !(!str || str === '-') ? styles.notEmptyTd : styles.emptyTd
                                    return <td className={stl} key={index2}>
                                        {str}
                                    </td>
                                })}
                                {isMod && <td className={styles.notEmptyTd}>
                                    <button type={'button'} className={styles.editButton}
                                            onClick={() => dataEditHandler(data[index]._id)}/>
                                </td>}
                                {isMod && isDeleteModeActive &&
                                    <td className={styles.notEmptyTd}>
                                        <button type={'button'} className={styles.deleteButton}
                                                onClick={() => dataDelHandler(data[index]._id)}/>
                                    </td>}
                            </tr>)}
                    </tbody>
                </table>
            </div>
            }
        </div>
    )
})

type TProps = {
    dataKeys: Map<string, Array<string>>
    sortedDataKeys: Array<string>
    dataValues: Array<Array<any>>
    dataEditHandler: (id: string) => void
    dataDelHandler: (id: string) => void
    isMod: boolean
    lang: TTranslateLang | undefined
};

export const DataViewTable: React.FC<TProps> = (props) => {
    const {isMod, lang} = props
    const [isDeleteModeActive, setIsDeleteModeActive] = useState(false);
    const dispatch = useAppDispatch()
    const data = isMod
        ? props.dataValues.map(v => [
            ...v,
            <button className={styles.editButton} onClick={() => props.dataEditHandler(v[0])}/>,
            <button className={styles.deleteButton} onClick={() => props.dataDelHandler(v[0])}/>])
        : props.dataValues.map(v => [...v])
    // const onEdithandler:MouseEventHandler<HTMLButtonElement> = (e)=>{
    //
    // }
    // style={{ "--vid-width": '100vw'}as React.CSSProperties}
    const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsDeleteModeActive(e.target.checked)
    }
    let iconIndex = props.dataKeys.get('primary')?.indexOf('icon')
    // console.log(`iconIndexEA: ${iconIndex}`)
    iconIndex = iconIndex === -1 || iconIndex === undefined ? -1 : iconIndex + 4
// console.log(`iconIndex: ${iconIndex}`)
// console.log(props.dataKeys)
//     console.log(data)
    return (
        <div className={styles.vid}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.headRow}>
                        {props.sortedDataKeys.map((v, i) => {
                            return props.dataKeys.get(v)?.length
                                ? <th className={styles.th1} key={i}
                                      colSpan={props.dataKeys.get(v)?.length}>{v}
                                </th>
                                : null

                        })}

                        {isMod && <th>Edit</th>}
                        {isMod && <th>Del?</th>}
                    </tr>
                    <tr>
                        {/*{ style={i>2?{maxWidth: `calc((95% - 150px)/${props.dataKeys.get(v)?.length||0-3})`}:undefined}}*/}
                        {props.sortedDataKeys.map((v) => [props.dataKeys.get(v)?.map((dKey, i) => (
                                <th className={styles.th2} key={i}
                                    colSpan={1}>{v === 'attributes' ? dKey.substring(0, 3) : dKey.substring(0, 5)}</th>

                            ))]
                        )}
                        {isMod && <th></th>}
                        {isMod && <th><input type={"checkbox"} checked={isDeleteModeActive} onChange={onCheck}/></th>}

                    </tr>
                </thead>
                <tbody>
                    {data.map((data, i) =>
                        <tr className={styles.dataRow} key={i}>
                            {data.map((val, j) => {
                                    const stl = val ? styles.notEmptyTd : styles.emptyTd
                                    // if(iconIndex===j) console.log(`incex: ${j}=${iconIndex}/= ${val}`)
                                    // console.log(val?undefined:styles.emptyTd)
                                    return j > 0
                                        ? j < 4
                                            ? <td className={styles.nameTd} key={j}>{val}</td>
                                            : j < data.length - 1
                                                ? <td className={stl}
                                                      key={j}>{iconIndex === (lang === undefined ? j : j + 2) && val
                                                    ? <img className={fieldsStyles.imgIcon}
                                                           src={iconUrlPicker(val.split('/')[0], val.split('/')[1])}/>
                                                    : val}</td>
                                                : (j >= data.length - 1 && isDeleteModeActive)
                                                    ? <td className={stl}
                                                          key={j}>{val}</td>
                                                    : null
                                        : null
                                }
                            )}
                            {/*<td>*/}
                            {/*    <button onClick={onEdithandler}>Edit</button>*/}
                            {/*</td>*/}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    )
}