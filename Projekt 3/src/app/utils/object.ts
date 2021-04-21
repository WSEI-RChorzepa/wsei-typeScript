interface IObjectProperties {
  state: object;
  keys: string[];
  node?: string;
}

export const getProperty = (obj: any, keys: string[]) => {
  const name = keys.reduce((result, prop) => (result === null ? "" : prop), "");
  const value = keys.reduce((result, prop) => (result == null ? undefined : result[prop]), obj);

  return {
    name,
    value,
    type: typeof value,
  };
};

export function getObjectProperties(prop: IObjectProperties): string[] {
  const { state, keys, node } = prop;

  for (let key of Object.keys(state)) {
    const { type, value: object } = getProperty(state, key as never);
    const nestedNode = node ? `${node}.${key}` : key;

    if (type === "object") {
      getObjectProperties({ state: object, keys, node: nestedNode });
    } else {
      keys.push(node ? `${node}.${key}` : key);
    }
  }

  return prop.keys;
}
