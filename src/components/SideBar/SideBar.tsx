import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import s from './SideBar.module.scss'
import {useSelector} from "react-redux";
import {AuthSelectors} from "../../redux/dataSelectors";

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
            <div className={`${s.catDiv} ${getStyleSb(path, '/AdminLoginForm38n8g32chrtm56')}`}>
                <Link to={'/AdminLoginForm38n8g32chrtm56'} className={s.navButton}>Login</Link>
            </div>

            <div className={`${s.catDiv} ${getStyleSb(path, '/map')}`}>
                <Link to={'/map'} className={s.navButton}>Map</Link>
            </div>

            <div className={`${s.catDiv} ${categories.materials ? s.sbActive : s.sbInactive}`}>
                <button className={`${categories.materials ? s.catBtnActive : s.catBtn} ${s.navButton}`} type={'button'}
                        onClick={() => onCategoryClick('materials')}>{`Materials${categories.materials ?'▲':'▼'}`}
                </button>
            </div>
            {categories.materials &&
                <div className={s.categoryBox}>
                    <div className={`${s.catDiv} ${getStyleSbSubCat(path, '/material/bone')}`}>
                        <Link to={'/material/bone'} className={s.navButton}>Bone</Link>
                    </div>
                    <div className={`${s.catDiv} ${getStyleSbSubCat(path, '/material/fiber')}`}>
                        <Link to={'/material/fiber'} className={s.navButton}>Fiber</Link>
                    </div>
                    <div className={`${s.catDiv} ${getStyleSbSubCat(path, '/material/leather')}`}>
                        <Link to={'/material/leather'} className={s.navButton}>Leather</Link>
                    </div>
                    <div className={`${s.catDiv} ${getStyleSbSubCat(path, '/material/metal')}`}>
                        <Link to={'/material/metal'} className={s.navButton}>Metal</Link>
                    </div>
                    <div className={`${s.catDiv} ${getStyleSbSubCat(path, '/material/stone')}`}>
                        <Link to={'/material/stone'} className={s.navButton}>Stone</Link>
                    </div>
                    <div className={`${s.catDiv} ${getStyleSbSubCat(path, '/material/wood')}`}>
                        <Link to={'/material/wood'} className={s.navButton}>Wood</Link>
                    </div>
                </div>}

            <div className={`${s.catDiv} ${categories.components ? s.sbActive : s.sbInactive}`}>
                <button className={`${categories.components ? s.catBtnActive : s.catBtn} ${s.navButton}`} type={'button'}
                        onClick={() => onCategoryClick('components')}>{`Components${getArrowCatEnd(categories.components)}`}
                </button>
            </div>
            {categories.components &&
                <div className={s.categoryBox}>
                    <div className={`${s.catDiv} ${getStyleSbSubCat(path, '/component/Plant')}`}>
                        <Link to={'/component/Plant'} className={s.navButton}>Plant</Link>
                    </div>
                    <div className={`${s.catDiv} ${getStyleSbSubCat(path, '/component/Gem')}`}>
                        <Link to={'/component/Gem'} className={s.navButton}>Gem</Link>
                    </div>
                    <div className={`${s.catDiv} ${getStyleSbSubCat(path, '/component/Substance')}`}>
                        <Link to={'/component/Substance'} className={s.navButton}>Substance</Link>
                    </div>
                    <div className={`${s.catDiv} ${getStyleSbSubCat(path, '/component/Powder')}`}>
                        <Link to={'/component/Powder'} className={s.navButton}>Powder</Link>
                    </div>
                    <div className={`${s.catDiv} ${getStyleSbSubCat(path, '/component/Sap')}`}>
                        <Link to={'/component/Sap'} className={s.navButton}>Sap</Link>
                    </div>
                    <div className={`${s.catDiv} ${getStyleSbSubCat(path, '/component/Pollen')}`}>
                        <Link to={'/component/Pollen'} className={s.navButton}>Pollen</Link>
                    </div>
                    <div className={`${s.catDiv} ${getStyleSbSubCat(path, '/component/Artefact')}`}>
                        <Link to={'/component/Artefact'} className={s.navButton}>Artefact</Link>
                    </div>
                </div>}



            {/*<div className={`${s.catDiv} ${getStyleSb(path, '/map')}`}>*/}
            {/*    <Link to={'/component'} className={s.navButton}>Component</Link>*/}
            {/*</div>*/}
            <div className={`${s.catDiv} ${getStyleSb(path, '/books')}`}>
                <Link to={'/books'} className={s.navButton}>Books</Link>
            </div>
            <div className={`${s.catDiv} ${getStyleSb(path, '/reputation')}`}>
                <Link to={'/reputation'} className={s.navButton}>Rep</Link>
            </div>
            <div className={`${s.catDiv} ${getStyleSb(path, '/trainer')}`}>
                <Link to={'/trainer'} className={s.navButton}>Trainers</Link>
            </div>

            <div className={`${s.catDiv} ${getStyleSb(path, '/quest')}`}>
                <Link to={'/quest'} className={s.navButton}>Quests</Link>
            </div>
            <div className={`${s.catDiv} ${getStyleSb(path, '/ability')}`}>
                <Link to={'/ability'} className={s.navButton}>Ability</Link>
            </div>
            <div className={`${s.catDiv} ${getStyleSb(path, '/monster')}`}>
                <Link to={'/monster'} className={s.navButton}>Monster</Link>
            </div>
            <div className={`${s.catDiv} ${getStyleSb(path, '/companion')}`}>
                <Link to={'/companion'} className={s.navButton}>Companion</Link>
            </div>

            <div className={`${s.catDiv} ${getStyleSb(path, '/shop')}`}>
                <Link to={'/shop'} className={s.navButton}>Shop</Link>
            </div>

            <div className={`${s.catDiv} ${getStyleSb(path, '/npc')}`}>
                <Link to={'/npc'} className={s.navButton}>Npc</Link>
            </div>
            <div className={`${s.catDiv} ${getStyleSb(path, '/recipe')}`}>
                <Link to={'/recipe'} className={s.navButton}>Recipe</Link>
            </div>
            <div className={`${s.catDiv} ${getStyleSb(path, '/region')}`}>
                <Link to={'/region'} className={s.navButton}>Region</Link>
            </div>
            <div className={`${s.catDiv} ${getStyleSb(path, '/location')}`}>
                <Link to={'/location'} className={s.navButton}>Location</Link>
            </div>
            <div className={`${s.catDiv} ${getStyleSb(path, '/event')}`}>
                <Link to={'/event'} className={s.navButton}>Events</Link>
            </div>
            <div className={`${s.catDiv} ${getStyleSb(path, '/questitemsource')}`}>
                <Link to={'/questitemsource'} className={s.navButton}>QI Source</Link>
            </div>


            {isAuth && <div className={s.catDiv}>{`Dev menu`}</div>}
            {isAuth &&
                <>
                    <div className={`${s.catDiv} ${getStyleSb(path, '/staminaelixir')}`}>
                        <Link to={'/staminaelixir'} className={s.navButton}>Stamina</Link>
                    </div>
                    <div className={`${s.catDiv} ${getStyleSb(path, '/gatherpoint')}`}>
                        <Link to={'/gatherpoint'} className={s.navButton}>GatherPoint</Link>
                    </div>
                    <div className={`${s.catDiv} ${getStyleSb(path, '/mapobject')}`}>
                        <Link to={'/mapobject'} className={s.navButton}>Map Objects</Link>
                    </div>
                    <div className={`${s.catDiv} ${getStyleSb(path, '/questitem')}`}>
                        <Link to={'/questitem'} className={s.navButton}>Quest Item</Link>
                    </div>
                    <div className={`${s.catDiv} ${getStyleSb(path, '/loot')}`}>
                        <Link to={'/loot'} className={s.navButton}>Loot</Link>
                    </div>
                </>}


        </div>
    )
}