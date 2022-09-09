import axios from "axios";
import {TUser} from "../Types/CommonTypes";

const JWTToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMWEyZmI4YTA5MGE0ZDIzMzI3MzJmOCIsImlhdCI6MTY2MjY2MzA2NiwiZXhwIjoxNjY1MjU1MDY2fQ.ZQOSrkcMtdLNkfKpXEWzoPKKk9suj4h6RfgsWnte6Yk"
const baseURL = 'http://127.0.0.1'
const port = 3333;
const instance = axios.create({
    baseURL: `${baseURL}:${port}/api/auth`,
    // headers: {"Authorization" : `Bearer ${JWTToken}`}
});

export type TAuthResponseBody<T> = {
    status: number
    msg: Array<string>
    data: T
}

export const AuthApi = {
    registerNew: (login: string, password: string, icon: string = '') =>
        instance.post<TAuthResponseBody<TUser>>(`/new`, {login, password, icon}).then(data=> data.data),
    login: (login: string, password: string) =>
        instance.post<TAuthResponseBody<TUser>>(`/login`, {login, password}).then(data=> data.data),
    me: (token: string) =>
        instance.get<TAuthResponseBody<TUser>>(`/me`,{ headers: {"Authorization" : `Bearer ${token}`}} ).then(data=> {
            return data.data
        }),

}

// @ts-ignore
window.auth = AuthApi

