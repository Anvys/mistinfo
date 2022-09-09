import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TUser} from "../../Types/CommonTypes";
import {StatusCodes} from "../../Types/Utils";
import {AuthApi} from "../../API/AuthAPI";


const userFromLS = JSON.parse(localStorage.getItem('user') || 'null') as TUser | null

const reducerPath = 'mif/auth'


export type TInitialState = {
    data: TUser
    isInit: boolean
}
const emptyUser = {
    _id: undefined,
    login: undefined,
    // type: undefined,
    icon: '',
    token: undefined,
}
const initialState: TInitialState = {
    data: userFromLS === null ? emptyUser : userFromLS,
    isInit: false,
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        init: (state, action: PayloadAction) => {
            state.isInit = true;
            console.log(`Auth: Init ${state.isInit}`)
        },
        login: (state, action: PayloadAction<TUser>) => {
            console.log(`Auth: login ${action.payload.login}`)
            state.data = {...action.payload};
            state.isInit = true;
        },
        logout: (state, action: PayloadAction) => {
            localStorage.removeItem('user')
            state.data = {...emptyUser};
            console.log(`initstate:`)
            console.log(initialState.data)
            state.isInit = false;

        },
        extraReducers: (builder) => {
            // Add reducers for additional action types here, and handle loading state as needed
            // builder.addCase(AuthThunks.getAll.fulfilled, (state, action) => {
            // })
            // builder.addCase(AuthThunks.getOne.fulfilled, (state, action) => {
            // })
            // builder.addCase(AuthThunks.updateOne.fulfilled, (state, action) => {
            // })
            // builder.addCase(AuthThunks.deleteOne.fulfilled, (state, action) => {
            // })
        }
    }})

const CurAPI = AuthApi;
const CurSlice = AuthSlice;
export type TAuthThunks = typeof AuthThunks;
export const AuthThunks = {
    registerNew: createAsyncThunk(`${reducerPath}/registerNew`,
        async (user: { login: string, password: string, icon: string }, thunkAPI) => {
            const res = await CurAPI.registerNew(user.login, user.password, user.icon)
            // if register success : login
            if (res.status === StatusCodes.Created) {
                thunkAPI.dispatch(AuthThunks.login({login: user.login, password: user.password}))
            } else {
                console.error(res.msg.join(', '))
            }
        }
    ),
    login: createAsyncThunk(`${reducerPath}/login`, async (user: { login: string, password: string }, thunkAPI) => {
            const res = await CurAPI.login(user.login, user.password)
            if (res.status === StatusCodes.LoginSuccess) {
                thunkAPI.dispatch(CurSlice.actions.init())
                thunkAPI.dispatch(CurSlice.actions.login(res.data))
                localStorage.setItem('user', JSON.stringify(res.data))
            } else {
                console.error(res.msg.join(', '))
            }
        }
    ),
    me: createAsyncThunk(`${reducerPath}/me`, async (token: string, thunkAPI) => {
            const res = await CurAPI.me(token)
            if (res.status === StatusCodes.Ok) {
                thunkAPI.dispatch(CurSlice.actions.init())
                // console.log(`me: ${res.data.login}/${res.data._id} / ${res.data.token}`)
                // console.log(res.data)
            } else {
                console.error(res.msg.join(', '))
            }
        }
    ),

}