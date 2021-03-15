export class Guid {
  public static newGuid(): string {
    return `_${
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    }`;
  }
}

export enum ElementType {
  Alert,
  InputGroup,
}
