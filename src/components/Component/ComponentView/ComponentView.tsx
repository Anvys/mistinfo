import React from 'react';
import styles from './ComponentView.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getComponentsSelector, getMaterialsSelector} from "../../../redux/resourcesSelectors";
import {TMaterialAttributes, TMaterials, TTranslateData} from "../../../Types/ResourceTypes";
import {TAppDispatch} from "../../../redux/store";
import {ResourcesThunks} from "../../../redux/reducers/resourceReducer";
import {getDeepKeys} from "../../Material/MaterialView/MaterialView";
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
const getWeight = (str: string):number=>{
    switch (str){
        case 'name': return 1;
        case 'nameFr': return 1.1;
        case 'nameRu': return 1.2;
        case 'type': return 2;
        case 'tier': return 3;
        default: return 99;
    }
}

type TProps = {};
export const ComponentView: React.FC<TProps> = (props) => {
    const components = useSelector(getComponentsSelector);
    const dispatch = useDispatch<TAppDispatch>()
    if (!components.length) return <>empty</>
    const mKeys = Object.keys(components[0])
        .concat(Object.keys(components[0].attributes))
        .concat(['nameFr', 'nameRu'])
        .filter(v=>v !== '__v' && v !== '_id' && v !== 'attributes' && v !== 'translate')
        .sort((a, b) => {
        return getWeight(a) - getWeight(b)
    })
    const onRefreshHandler = () =>{
        dispatch(ResourcesThunks.getComponents());
    }
    const getMaterialTable = (keys: Array<string>, col: number) => {

    }
    console.log(getDeepKeys(components[0],[]).sort((a, b) => {
        return getWeight(a) - getWeight(b)
    }))
// @ts-ignore
    console.log(mKeys)
    return (
        <div className={styles.vid}>
            <DataView data={components}/>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th colSpan={mKeys.length-1}>COMPONENTS</th>
                        <th><button onClick={onRefreshHandler}>Refresh</button></th>
                    </tr>
                    <tr>{mKeys.map((v,i )=><td key={i}>{v}</td>)}</tr>
                </thead>
                <tbody>

                    {
                        components.map((v: any, i)=>(<tr key={i}>{mKeys.map((vKey,ii)=>{
                            if(vKey==='nameFr') {
                                console.log(v)
                                return <td key={ii}>{v.translate.Fr}</td>
                            }
                            if(vKey==='nameRu') return <td key={ii}>{v.translate.Ru}</td>
                            if(v[vKey] === undefined) return <td key={ii}>{v.attributes[vKey]}</td>
                            return <td key={ii}>{v[vKey]}</td>
                        })}</tr>))
                    }
                </tbody>
            </table>
        </div>
    );
}