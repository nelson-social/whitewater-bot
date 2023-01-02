export function selectTextMaybe(
  document: Document,
  selector: string
): string | null {
  if (!document.querySelector(selector)) return null;
  return selectText(document, selector);
}

export function selectText(document: Document, selector: string): string {
  const el = document.querySelector(selector);
  if (!el) {
    throw new Error(`Element not found at ${selector}`);
  }
  const text = el.textContent;
  if (!text) {
    throw new Error(`No textContent at ${selector}`);
  }
  return text.trim();
}

export function selectInt(document: Document, selector: string): number {
  return parseInt(selectText(document, selector), 10);
}

export function selectElements(document: Document, selector: string): Node[] {
  return Array.from(document.querySelectorAll(selector));
}

export function nodeIsElement(node: Node): node is Element {
  return node.nodeType === node.ELEMENT_NODE;
}
