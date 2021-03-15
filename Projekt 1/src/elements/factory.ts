import { IElement } from "../types";
import { ElementType } from "../utils";
import Alert from "./alert";
import InputGroup from "./inputGroup";

export default class FactoryElement {
  public static create(type: ElementType): IElement {
    switch (type) {
      case ElementType.Alert:
        return new Alert("alertTemplate", ".inputs");
      case ElementType.InputGroup:
        return new InputGroup("inputGroupTemplate", ".inputs");
    }
  }
}
