abstract class Component extends HTMLElement {
  constructor(template: string) {
    super();
    this.loadTemplate(template);
  }

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
}

export default Component;
