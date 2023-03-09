type Aux<T, B> = {
    [K in keyof T]: T[K] extends B ? [K, T[K]] : never;
}[keyof T] & [
    PropertyKey,
    B
];
type Aux2<T, B> = {
    [K in keyof T]: T[K] extends B ? [K, T[K]] : T[K] extends object ? Aux<T[K], B> : never;
}[keyof T] & [
    PropertyKey,
    B
];
type Aux1<T, B> = {
    [K in keyof T]: T[K] extends B ? [K, T[K]] : T[K] extends object ? Aux2<T[K], B> : never;
}[keyof T] & [
    PropertyKey,
    B
];
type FlattenPairs<T, B> = {
    [K in keyof T]: T[K] extends B ? [K, T[K]] : T[K] extends object ? Aux1<T[K], B> : never;
}[keyof T] & [
    PropertyKey,
    B
];
export type Flatten<T, BaseType> = {
    [P in FlattenPairs<T, BaseType> as P[0]]: P[1];
};
export {};
//# sourceMappingURL=flatten.d.ts.map