import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import s from './SideBar.module.scss'
import {useSelector} from "react-redux";
import {AuthSelectors} from "../../redux/dataSelectors";
import {NavButton} from "../styled/NavButton";

type TCategory = {
    materials: boolean
    components: boolean
}
type TCategoryKeys = keyof TCategory
export const SideBar: React.FC = () => {
    const [categories, setCategories] = useState(() => ({
        materials: false,
        components: false,
    }))
    const [cat1, setCat1] = useState(false)
    const [cat2, setCat2] = useState(false)
    const isAuth = useSelector(AuthSelectors.isInit)
    const loca = useLocation()
    const path = `${loca.pathname}`

    const onCategoryClick = (c: TCategoryKeys) => {
        switch (c) {
            case "materials":
                setCategories(a => ({...Object.fromEntries(Object.entries(a).map(e=>[e[0], false])) as TCategory, materials: !a.materials}))
                break
            case "components":
                setCategories(a => ({...Object.fromEntries(Object.entries(a).map(e=>[e[0], false])) as TCategory, components: !a.components}))
                break
        }
    }
    const getArrowCatEnd = (isOpen: boolean) => !isOpen ? '▲':'▼' // 🡆
    const getStyleSb = (path: string, uri: string) => path === uri ? s.sbActive : s.sbInactive
    const getStyleSbSubCat = (path: string, uri: string) => path === uri ? s.sbActiveSub : s.sbInactiveSub
    const getStyleSbCat = (path: string, uri: string) => path.includes(uri) ? s.sbActive : s.sbInactive
    return (
        <div className={s.sideBox}>
            {/*Database menu*/}
            <NavButton linkTo={'/AdminLoginForm38n8g32chrtm56'} text={'Login'} active={path === '/AdminLoginForm38n8g32chrtm56'}/>
            <NavButton linkTo={'/map'} text={'Map'} active={path === '/map'}/>
            <NavButton linkTo={'/AdminLoginForm38n8g32chrtm56'} text={'Login'} active={path === '/AdminLoginForm38n8g32chrtm56'}/>
            <NavButton linkTo={'#'} text={`SMaterials${getArrowCatEnd(categories.materials)}`} active={categories.materials} onClick={() => onCategoryClick('materials')}/>
            {categories.materials &&
                <>
                    <NavButton linkTo={'/material/bone'} text={'Bone'} subCat active={path === '/material/bone'}/>
                    <NavButton linkTo={'/material/fiber'} text={'Fiber'} subCat active={path === '/material/fiber'}/>
                    <NavButton linkTo={'/material/leather'} text={'leather'} subCat active={path === '/material/leather'}/>
                    <NavButton linkTo={'/material/metal'} text={'metal'} subCat active={path === '/material/metal'}/>
                    <NavButton linkTo={'/material/stone'} text={'stone'} subCat active={path === '/material/stone'}/>
                    <NavButton linkTo={'/material/wood'} text={'wood'} subCat active={path === '/material/wood'}/>
                </>
            }
            <NavButton linkTo={'#'} text={`SComponents${getArrowCatEnd(categories.components)}`} active={categories.components} onClick={() => onCategoryClick('components')}/>
            {categories.components &&
                <>
                    <NavButton linkTo={'/component/Plant'} text={'Plant'} subCat active={path === '/component/Plant'}/>
                    <NavButton linkTo={'/component/Gem'} text={'Gem'} subCat active={path === '/component/Gem'}/>
                    <NavButton linkTo={'/component/Substance'} text={'Substance'} subCat active={path === '/component/Substance'}/>
                    <NavButton linkTo={'/component/Powder'} text={'Powder'} subCat active={path === '/component/Powder'}/>
                    <NavButton linkTo={'/component/Sap'} text={'Sap'} subCat active={path === '/component/Sap'}/>
                    <NavButton linkTo={'/component/Pollen'} text={'Pollen'} subCat active={path === '/component/Pollen'}/>
                    <NavButton linkTo={'/component/Artefact'} text={'Artefact'} subCat active={path === '/component/Artefact'}/>
                </>
            }
            <NavButton linkTo={'/books'} text={'books'} active={path === '/books'}/>
            <NavButton linkTo={'/reputation'} text={'reputation'} active={path === '/reputation'}/>
            <NavButton linkTo={'/trainer'} text={'trainer'} active={path === '/trainer'}/>
            <NavButton linkTo={'/quest'} text={'quest'} active={path === '/quest'}/>
            <NavButton linkTo={'/ability'} text={'ability'} active={path === '/ability'}/>
            <NavButton linkTo={'/monster'} text={'monster'} active={path === '/monster'}/>
            <NavButton linkTo={'/companion'} text={'companion'} active={path === '/companion'}/>
            <NavButton linkTo={'/shop'} text={'shop'} active={path === '/shop'}/>
            <NavButton linkTo={'/npc'} text={'npc'} active={path === '/npc'}/>
            <NavButton linkTo={'/recipe'} text={'recipe'} active={path === '/recipe'}/>
            <NavButton linkTo={'/region'} text={'region'} active={path === '/region'}/>
            <NavButton linkTo={'/location'} text={'location'} active={path === '/location'}/>
            <NavButton linkTo={'/event'} text={'event'} active={path === '/event'}/>
            <NavButton linkTo={'/questitemsource'} text={'QI source'} active={path === '/questitemsource'}/>
            <NavButton linkTo={'/event'} text={'event'} active={path === '/event'}/>
            {isAuth && <div className={s.catDiv}>{`Dev menu`}</div>}
            {isAuth &&
                <>
                    <NavButton linkTo={'/staminaelixir'} text={'staminaelixir'} active={path === '/staminaelixir'}/>
                    <NavButton linkTo={'/gatherpoint'} text={'gatherpoint'} active={path === '/gatherpoint'}/>
                    <NavButton linkTo={'/questitem'} text={'questitem'} active={path === '/questitem'}/>
                    <NavButton linkTo={'/loot'} text={'loot'} active={path === '/loot'}/>
                    {/*<NavButton linkTo={'/mapobject'} text={'mapobject'} active={path === '/mapobject'}/>*/}
                </>
            }
        </div>
    )
}