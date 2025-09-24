export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  textContent?: string
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}

export function clearElement(element: Element | null): void {
  if (!element) {
    return;
  }

  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function formatDateLabel(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR", {
    month: "short",
    day: "numeric",
  });
}

export function formatHealthScore(score: number): string {
  if (score >= 80) return "Saudável";
  if (score >= 60) return "Atenção";
  return "Crítico";
}

export function setLoading(element: HTMLElement, isLoading: boolean): void {
  if (isLoading) {
    element.setAttribute("data-loading", "true");
  } else {
    element.removeAttribute("data-loading");
  }
}
