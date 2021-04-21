export namespace Bindings {
  interface IProps {
    element: HTMLElement;
    stateKey: string;
    attributeKey: string;
    getState<T>(key: string): T;
    callback?(ev: Event): void;
  }

  type ElementValueBinding = {
    [key: string]: (props: IBindingProps) => void;
  };
}
