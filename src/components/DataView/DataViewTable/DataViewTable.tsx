import React from 'react';
import styles from './DataViewTable.module.css';

type TProps = {
    dataKeys: Map<string, Array<string>>
    sortedDataKeys: Array<string>
    dataValues: Array<Array<any>>
};
export const DataViewTable: React.FC<TProps> = (props) => {
    return (
        <div className={styles.vid}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {props.sortedDataKeys.map((v, i) => <th key={i}
                                                                colSpan={props.dataKeys.get(v)?.length}>{v}</th>)}
                    </tr>
                    <tr>
                        {props.sortedDataKeys.map((v) => [props.dataKeys.get(v)?.map((dKey, i) => (
                            <th key={i} colSpan={1}>{dKey}</th>
                        ))])}
                    </tr>
                </thead>
                <tbody>
                    {props.dataValues.map((data, i) => <tr key={i}>
                            {data.map((val, j) =>
                                j > 0
                                    ? j < 4
                                        ? <td className={styles.nameTd} key={j}>{val}</td>
                                        : <td key={j}>{val}</td>
                                    : null
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    )
}