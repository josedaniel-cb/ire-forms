// How to deep flatten an interface in Typescript?
// https://stackoverflow.com/a/68518494/11026079

// Why am I getting "Type instantiation is excessively deep and possibly infinite"?
// https://stackoverflow.com/a/70552078/11026079

// // Attempt 1
// type Aux<T, B> = T extends {
//   [key: string]: B
// }
//   ? {
//       [K in keyof T]: [K, T[K]]
//     }[keyof T] &
//       [PropertyKey, B]
//   : never

// type Aux2<T, B> = {
//   [K in keyof T]: T[K] extends B ? [K, T[K]] : Aux<T[K], B>
// }[keyof T] &
//   [PropertyKey, B]

// type Aux1<T, B> = {
//   [K in keyof T]: T[K] extends B ? [K, T[K]] : Aux2<T[K], B>
// }[keyof T] &
//   [PropertyKey, B]

// type FlattenPairs<T, B> = {
//   [K in keyof T]: T[K] extends B ? [K, T[K]] : Aux1<T[K], B>
// }[keyof T] &
//   [PropertyKey, B]

// Attempt 2
type Aux<T, B> = {
  [K in keyof T]: T[K] extends B ? [K, T[K]] : never
}[keyof T] &
  [PropertyKey, B]

type Aux2<T, B> = {
  [K in keyof T]: T[K] extends B
    ? [K, T[K]]
    : T[K] extends object
    ? Aux<T[K], B>
    : never
}[keyof T] &
  [PropertyKey, B]

type Aux1<T, B> = {
  [K in keyof T]: T[K] extends B
    ? [K, T[K]]
    : T[K] extends object
    ? Aux2<T[K], B>
    : never
}[keyof T] &
  [PropertyKey, B]

type FlattenPairs<T, B> = {
  [K in keyof T]: T[K] extends B
    ? [K, T[K]]
    : T[K] extends object
    ? Aux1<T[K], B>
    : never
}[keyof T] &
  [PropertyKey, B]

// // Attempt 3
// type FlattenPairs<T, B> = T extends object
//   ? {
//       [K in keyof T]: T[K] extends B ? [K, T[K]] : FlattenPairs<T[K], B>
//     }[keyof T] &
//       [PropertyKey, B]
//   : never

export type Flatten<T, BaseType> = {
  [P in FlattenPairs<T, BaseType> as P[0]]: P[1]
}
