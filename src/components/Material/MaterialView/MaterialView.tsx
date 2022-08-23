import React from 'react';
import styles from './MaterialView.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getMaterialsSelector} from "../../../redux/resourcesSelectors";
import {TMaterialAttributes, TMaterials, TTranslateData} from "../../../Types/ResourceTypes";
import {TAppDispatch} from "../../../redux/store";
import {ResourcesThunks} from "../../../redux/reducers/resourceReducer";
import {DataView} from "../../DataView/DataView";

enum tableSort {
    type = 9,
    durability = 4,
    difficulty = 7,
    tier = 8,
    attributes = 0,
    goldCost = 6,
    encumbrance = 5,
    name = 12,
    Fr = 11,
    Ru = 10,
}

const getWeight = (str: string): number => {
    switch (str) {
        case 'name':
            return 1;
        case 'nameFr':
            return 1.1;
        case 'nameRu':
            return 1.2;
        case 'type':
            return 2;
        case 'tier':
            return 3;
        default:
            return 99;
    }
}

type TProps = {};
export const MaterialView: React.FC<TProps> = (props) => {
    const materials = useSelector(getMaterialsSelector);
    const dispatch = useDispatch<TAppDispatch>()
    if (!materials.length) return <>empty</>
    const mKeys = Object.keys(materials[0])
        .concat(Object.keys(materials[0].attributes))
        .concat(['nameFr', 'nameRu'])
        .filter(v => v !== '__v' && v !== '_id' && v !== 'attributes' && v !== 'translate')
        .sort((a, b) => {
            return getWeight(a) - getWeight(b)
        })
    console.log(getDeepKeys(materials[0], []).sort((a, b) => {
        return getWeight(a) - getWeight(b)
    }))
    console.log(getMapKeys(materials[0]))
    const onRefreshHandler = () => {
        dispatch(ResourcesThunks.getMaterials());
    }
    const getMaterialTable = (keys: Array<string>, col: number) => {

    }
// @ts-ignore
//     console.log(mKeys)
    return (
        <div className={styles.vid}>
            <DataView data={materials}/>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>
                            <button onClick={onRefreshHandler}>Refresh</button>
                        </th>
                        <th colSpan={mKeys.length - 2}>MATERIALS</th>
                    </tr>
                    <tr>{mKeys.map((v, i) => <td key={i}>{v}</td>)}</tr>
                </thead>
                <tbody>
                    {
                        materials.map((v: any, i) => (<tr key={i}>{mKeys.map((vKey, ii) => {
                            if (vKey === 'name') {
                                // console.log(v)
                                return <td className={styles.nameTd} key={ii}>{v.translate.En}</td>
                            }
                            if (vKey === 'nameFr') {
                                // console.log(v)
                                return <td className={styles.nameTd} key={ii}>{v.translate.Fr}</td>
                            }
                            if (vKey === 'nameRu') return <td className={styles.nameTd} key={ii}>{v.translate.Ru}</td>
                            if (v[vKey] === undefined) return <td key={ii}>{v.attributes[vKey]}</td>
                            return <td key={ii}>{v[vKey]}</td>
                        })}</tr>))
                    }
                </tbody>
            </table>
        </div>
    );
}
export const getDeepKeys = (obj: object, keys: Array<string> = []): Array<string> => {
    //todo только для объектов, не для массивов
    let deepKeys: Array<string> = [];
    keys = keys.concat(Object.entries(obj).filter(([key, value]) => {
        const tValue = typeof value;
        if (tValue !== 'object' && !Array.isArray(value) && key !== '__v' && key !== '_id' && key !== 'En') {
            return true
        } else {
            if (tValue === 'object' || Array.isArray(value)) {
                deepKeys = getDeepKeys(value, deepKeys)
            }
            return false
        }
    }).map(([key, value]) => {
        switch (key) {
            case 'Fr':
                return 'nameFr'
            case 'Ru':
                return 'nameRu'
            default:
                return key
        }
    }))
    return deepKeys.length ? keys.concat(deepKeys) : keys
}
export const getMapKeys = (data: any) => {
    const dataKeys = new Map<string, Array<string>>([['primary', []]])
    Object.entries(data).forEach(([key, value]) => {
        if (key !== '_id' && key !== '__v' && key !== 'name') {
            const tValue = typeof value
            if (tValue !== 'object') dataKeys.get('primary')?.push(key)
            else dataKeys.set(key, Object.keys(value as any))
        }
    })
    return dataKeys
}
export const sortStrKeys = (a: string, b: string) => {
    return getWeight(a) - getWeight(b)
}
export const sortDataMapKeys = (dataKeys: Map<string, Array<string>>): Array<string> => {
    let result: Array<string> = []
    if (dataKeys.get('translate')) result.push('translate')
    if (dataKeys.get('primary')) result.push('primary')
    dataKeys.forEach((v, k) => {
        if (k !== 'translate' && k !== 'primary') result.push(k)
    })
    return result
}
