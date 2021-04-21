import { Component, State } from "./types";
import { HTMLElementBinder, ObjectHelpers } from "../utils";

abstract class ComponentWithState<TState extends State> extends HTMLElement {
  private htmlElementBinder: HTMLElementBinder = new HTMLElementBinder();

  constructor(template: string) {
    super();
    this.loadTemplate(template);
  }

  protected abstract state: TState;
  protected abstract configuration: Component.IConfiguration;
  protected root: ShadowRoot = this.attachShadow({ mode: "closed" });

  protected loadTemplate = (source: string) => {
    const template = document.createElement("template");
    const regex = new RegExp(/(?<=<template>)(.|\s)*(?=<\/template>)/);
    const html = source.match(regex) as string[];

    if (html == null) {
      throw new Error(`Error: Template tag was not found in template file. \n${template}`);
    }

    template.innerHTML = html[0];
    this.root.appendChild(template.content.cloneNode(true));
  };

  protected updateElement = <T extends HTMLElement>(key: string, state?: string, callback?: (ev: Event) => void): void => {
    const element = this.root.querySelector(`[data-bind*="${key}"]`) as T;

    if (element === null) {
      throw new Error(`Error: Cannot find element with attribute: data-bind: ${key}`);
    }

    const bindingValues = (element.getAttribute("data-bind") as string).split("|").map((a) => a.trim());
    const bindingValue = (bindingValues.length >= 2 ? bindingValues.find((a) => a.includes(key)) : bindingValues[0]) as string;

    const attributes = bindingValue.substring(0, bindingValue.indexOf(":")).split(", ");
    const attribute = attributes.length === 1 ? attributes[0] : (attributes.find((a) => a.includes(key)) as string);

    const value = bindingValue.substring(bindingValue.indexOf(":") + 1, bindingValue.length).trim();

    this.htmlElementBinder.bind(attribute, {
      element,
      attributeKey: attribute,
      stateKey: value,
      getState: (key) => (state !== undefined ? state : ObjectHelpers.getProperty(this.state, key.split(".")).value),
      callback,
    });
  };
}

export default ComponentWithState;
