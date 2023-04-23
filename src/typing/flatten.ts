/**
 * A generic type that takes an object type `T` and a base type `BaseType`. The
 * `Flatten` type flattens `T` by recursively iterating over its properties and
 * returning an object that has all of `T`'s properties and their associated
 * values, including nested properties that extend `BaseType`, but without the
 * nesting. The resulting object has string keys representing the unique path
 * to each property.
 *
 * For example, given the following input type:
 *
 *     type InputType = {
 *       a: number
 *       b: {
 *         c: boolean
 *         d: {
 *           e: string
 *           f: number[]
 *           g: number
 *         }
 *       }
 *       h: string
 *     };
 *
 * Calling `Flatten<InputType, number>` would return the following type:
 *
 *     type FlattenedType = {
 *       a: number;
 *       g: number;
 *     }
 *
 * The `BaseType` argument is used to filter which properties are included in
 * the flattened object. Only properties that match `BaseType` or are objects
 * with nested properties that match `BaseType` will be included. This allows
 * you to selectively flatten only certain parts of the input type.
 *
 * Read more:
 * - [How to deep flatten an interface in Typescript?](https://stackoverflow.com/a/68518494/11026079)
 * - [Why am I getting "Type instantiation is excessively deep and possibly infinite"?](https://stackoverflow.com/a/70552078/11026079)
 */
export type Flatten<T, BaseType> = {
  [P in FlattenPairs<T, BaseType> as P[0]]: P[1]
}

/**
 * A helper type used by `Flatten` to recursively iterate over the properties
 * of `T` and return an array of [key, value] pairs for any properties that
 * match `B` or are objects with nested properties that match `B`.
 */
type FlattenPairs<T, B> = {
  [K in keyof T]: T[K] extends B
    ? [K, T[K]]
    : T[K] extends object
    ? Aux1<T[K], B>
    : never
}[keyof T] &
  [PropertyKey, B]

/**
 * Recursiver FlattenPairs level 2
 */
type Aux1<T, B> = {
  [K in keyof T]: T[K] extends B
    ? [K, T[K]]
    : T[K] extends object
    ? Aux2<T[K], B>
    : never
}[keyof T] &
  [PropertyKey, B]

/**
 * Recursiver FlattenPairs level 3
 */
type Aux2<T, B> = {
  [K in keyof T]: T[K] extends B
    ? [K, T[K]]
    : T[K] extends object
    ? Aux3<T[K], B>
    : never
}[keyof T] &
  [PropertyKey, B]

/**
 * Recursiver FlattenPairs level 4
 */
type Aux3<T, B> = {
  [K in keyof T]: T[K] extends B ? [K, T[K]] : never
}[keyof T] &
  [PropertyKey, B]
