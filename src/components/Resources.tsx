import React, {useEffect, useState} from "react";
import {TComponent, TMaterial} from "../Types/ResourceTypes";
import {useDispatch, useSelector} from "react-redux";
import {TAppDispatch} from "../redux/store";
import {getComponentsSelector, getMaterialsSelector} from "../redux/dataSelectors";
import {AddMaterial} from "./Material/AddMaterial/AddMaterial";


// export const Resources: React.FC = (props) => {
//     const [resArr, setResArr] = useState<Array<TMaterials | TComponents>>([]);
//     const materials = useSelector(getMaterialsSelector)
//     const components = useSelector(getComponentsSelector)
//     const dispatch = useDispatch<TAppDispatch>();
//     useEffect(() => {
//         setResArr([...materials, ...components])
//     }, [materials, components])
//     const getResHandler = () => {
//         dispatch(ResourcesThunks.getAllResources())
//         // const res = await ResourceAPI.getAll();
//         // if (res.status !== StatusCodes.Ok) console.log(res.msg[0])
//         // else setResArr(res.data)
//     }
//     return (
//         <>
//             <AddMaterial/>
//             <button onClick={getResHandler}>GetRes</button>
//             {resArr.map(v => <div>name:{v.name} tier:{v.tier}</div>)}
//         </>
//     )
//
//
// }