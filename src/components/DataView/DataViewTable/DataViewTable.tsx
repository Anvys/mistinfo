import React, {useState} from 'react';
import styles from './DataViewTable.module.css';
import {useAppDispatch} from "../../../redux/store";

type TProps = {
    dataKeys: Map<string, Array<string>>
    sortedDataKeys: Array<string>
    dataValues: Array<Array<any>>
    dataAddHandler: (id: string) => void
    dataDelHandler: (id: string) => void

};
export const DataViewTable: React.FC<TProps> = (props) => {
    const [isDeleteModeActive, setIsDeleteModeActive] = useState(false);
    const dispatch = useAppDispatch()
    const data = props.dataValues.map(v => [
        ...v,
        <button className={styles.editButton} onClick={() => props.dataAddHandler(v[0])}/>,
        <button className={styles.deleteButton} onClick={() => props.dataDelHandler(v[0])}/>])
    // const onEdithandler:MouseEventHandler<HTMLButtonElement> = (e)=>{
    //
    // }
    // style={{ "--vid-width": '100vw'}as React.CSSProperties}
    const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsDeleteModeActive(e.target.checked)
    }

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

                        <th>Edit</th>
                        <th>Del?</th>
                    </tr>
                    <tr>
                        {/*{ style={i>2?{maxWidth: `calc((95% - 150px)/${props.dataKeys.get(v)?.length||0-3})`}:undefined}}*/}
                        {props.sortedDataKeys.map((v) => [props.dataKeys.get(v)?.map((dKey, i) => (
                                <th className={styles.th2} key={i}
                                    colSpan={1}>{v === 'attributes' ? dKey.substring(0, 3) : dKey.substring(0, 5)}</th>

                            ))]
                        )}
                        <th></th>
                        <th><input type={"checkbox"} checked={isDeleteModeActive} onChange={onCheck}/></th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((data, i) =>
                        <tr className={styles.dataRow} key={i}>
                            {data.map((val, j) => {
                                    const stl = val ? styles.notEmptyTd : styles.emptyTd
                                    // console.log(val?undefined:styles.emptyTd)
                                    return j > 0
                                        ? j < 4
                                            ? <td className={styles.nameTd} key={j}>{val}</td>
                                            : j < data.length - 1
                                                ? <td className={stl} key={j}>{val}</td>
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