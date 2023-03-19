export const collections = ["user", "role", "student", "school"] as const;

type CollectionList = Record<typeof collections[number], string>;

export const models = collections.reduce<CollectionList>(
  (prev, current) => ({ ...prev, [current]: current }),
  {} as CollectionList
);
