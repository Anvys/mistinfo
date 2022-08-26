import {TMaterial} from "./ResourceTypes";

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,]
type Join<K, P> = K extends string | number ?
    P extends string | number ?
        `${K}${"" extends P ? "" : "."}${P}`
        : never : never;
type Paths<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
    { [K in keyof T]-?: K extends string | number ?
        `${K}` | Join<K, Paths<T[K], Prev[D]>>
        : never
    }[keyof T] : ""
type NestedObjectPaths = Paths<TMaterial>;
type NestedObjectLeaves = Leaves<TMaterial>
type Leaves<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
    { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T] : "";
type NestedKeys<T> =
    T extends object ? { [K in keyof T]-?: K | NestedKeys<T[K]> }[keyof T] : never;


type ObjectArrKeys<T> = {
    [K in keyof T]: T[K] extends object[] ? K : never;
}[keyof T];
type Spec<T> = {
    [key in ObjectArrKeys<T>]: {
        name: key, children?: T[key] extends (infer I)[] ? Spec<I> : never
    }
}[ObjectArrKeys<T>][]
// type TKeys = Paths<T>
type TVal<U> = U[keyof U]

// type asd = TVal<T>
type qwe<T extends Record<string, Record<string, unknown>>> = {
    [Prop in keyof T]: keyof T[Prop]

}
// type res = TVal<qwe<TMaterials>>
//     type keys = NestedKeys<T>
// type keys = Spec<T>

// type DistributiveValues<T extends Record<string, any>> = T extends T ? T[keyof T] : never;
// type InnerValues<
//     T extends Record<keyof T, object>,
//     K extends keyof T
//     > = DistributiveValues<T[K]>;
// export type TInnerValues<T> = InnerValues<T, keyof T>;