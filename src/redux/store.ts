import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {NpcSlice, TNpcThunks} from "./reducers/npcReducer";
import {MaterialSlice, TMaterialThunks} from "./reducers/materialReducer";
import {ComponentSlice, TComponentThunks} from "./reducers/componentReducer";
import {LocationSlice, TLocationThunks} from "./reducers/locationReducer";
import {RegionSlice, TRegionThunks} from "./reducers/regionReducer";
import {MapSlice} from "./reducers/mapReducer";
import {GatherPointSlice, TGatherPointThunks} from "./reducers/gatherPointReducer";
import {LootSlice, TLootThunks} from "./reducers/lootReducer";
import {StaminaElixirSlice, TStaminaElixirThunks} from "./reducers/staminaElixirReducer";
import {EventSlice, TEventThunks} from "./reducers/eventReducer";
import {MapObjectSlice} from "./reducers/mapObjectReducer";
import {QuestSlice, TQuestThunks} from "./reducers/questReducer";
import {AuthSlice, TAuthThunks} from "./reducers/authReducer";
import {MonsterSlice, TMonsterThunks} from "./reducers/monsterReducer";
import {RecipeSlice, TRecipeThunks} from "./reducers/recipeReducer";
import {AbilitySlice, TAbilityThunks} from "./reducers/abilityReducer";
import {CompanionSlice, TCompanionThunks} from "./reducers/companionReducer";
import {QuestItemSlice, TQuestItemThunks} from "./reducers/questItemReducer";
import {QuestItemSourceSlice, TQuestItemSourceThunks} from "./reducers/questItemSourceReducer";
import {ShopSlice, TShopThunks} from "./reducers/shopReducer";
import {GlobalSettingsSlice} from "./reducers/globalSettingsReducer";


export const store = configureStore({
    reducer: {
        material: MaterialSlice.reducer,
        component: ComponentSlice.reducer,
        npc: NpcSlice.reducer,
        location: LocationSlice.reducer,
        region: RegionSlice.reducer,
        map: MapSlice.reducer,
        gatherpoint: GatherPointSlice.reducer,
        loot: LootSlice.reducer,
        staminaElixir: StaminaElixirSlice.reducer,
        event: EventSlice.reducer,
        mapObject: MapObjectSlice.reducer,
        quest: QuestSlice.reducer,
        recipe: RecipeSlice.reducer,
        monster: MonsterSlice.reducer,
        ability: AbilitySlice.reducer,
        companion: CompanionSlice.reducer,
        questItem: QuestItemSlice.reducer,
        questItemSource: QuestItemSourceSlice.reducer,
        shop: ShopSlice.reducer,

        globalSettings: GlobalSettingsSlice.reducer,
        auth: AuthSlice.reducer,

    },
})

export type TAppState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<TAppDispatch>()

export type TCombineThunks = TMaterialThunks | TComponentThunks
    | TNpcThunks | TLocationThunks | TRegionThunks | TGatherPointThunks
    | TLootThunks | TStaminaElixirThunks | TEventThunks | TQuestThunks
| TAbilityThunks | TMonsterThunks | TRecipeThunks | TCompanionThunks | TQuestItemThunks
| TQuestItemSourceThunks | TShopThunks //| TAuthThunks