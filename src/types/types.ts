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

export type ArrayElement<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;