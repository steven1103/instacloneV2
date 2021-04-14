export type Resolver = {}

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
