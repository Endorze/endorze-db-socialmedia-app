export type CommentForPost = {
    id: number;
    post_id: number;
    content: string;
    created_at: string;
    parent_id: number | null;
    user: {
        username: string;
    };
}

export type Result<T, V extends string> = (
  Record<V, T> & { error?: null }
) | (
  PartialRecord<V, null | undefined> & { error: Error }
)

export type ArrayElement<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};


export type UserType = {
  username: string,
  id: string,
}