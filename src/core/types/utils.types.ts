/////////////////////// SNAKE TO CAMEL CASE ////////////////////////
type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}` ? `${Lowercase<T>}${Capitalize<SnakeToCamelCase<U>>}` : S;

export type SnakeToCamelCaseKeys<T> = {
  [K in keyof T as SnakeToCamelCase<K & string>]: T[K];
};

/////////////////////// CAMEL TO SNAKE CASE ////////////////////////
type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U> // Check if U is already lowercase (indicating the start of a new word)
    ? `${Uncapitalize<T>}${CamelToSnakeCase<U>}`
    : `${Uncapitalize<T>}_${CamelToSnakeCase<U>}`
  : S;

export type CamelToSnakeCaseKeys<T> = {
  [K in keyof T as CamelToSnakeCase<K & string>]: T[K];
};
