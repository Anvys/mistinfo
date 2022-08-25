import React, {MouseEventHandler} from 'react';
import styles from './DataViewTable.module.css';

type TProps = {
    dataKeys: Map<string, Array<string>>
    sortedDataKeys: Array<string>
    dataValues: Array<Array<any>>
    edithandler: (id: string) => void
};
export const DataViewTable: React.FC<TProps> = (props) => {
    const data = props.dataValues.map(v => [...v, <button onClick={() => props.edithandler(v[0])}>Edit</button>])
    // const onEdithandler:MouseEventHandler<HTMLButtonElement> = (e)=>{
    //
    // }

    return (
        <div className={styles.vid}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.headRow}>
                        {props.sortedDataKeys.map((v, i) =>
                            <th className={styles.th1} key={i}
                                colSpan={props.dataKeys.get(v)?.length}>{v}
                            </th>)}
                    </tr>
                    <tr>
                        {props.sortedDataKeys.map((v) => [props.dataKeys.get(v)?.map((dKey, i) => (
                                <th className={styles.th2} key={i} colSpan={1}>{dKey}</th>
                            ))]
                        )}

                    </tr>
                </thead>
                <tbody>
                    {data.map((data, i) =>
                        <tr className={styles.dataRow} key={i}>
                            {data.map((val, j) =>
                                j > 0
                                    ? j < 4
                                        ? <td className={styles.nameTd} key={j}>{val}</td>
                                        : <td key={j}>{val}</td>
                                    : null
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