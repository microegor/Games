export function getElementById(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error(`Element '${id}' is null`);
  }

  return el;
}