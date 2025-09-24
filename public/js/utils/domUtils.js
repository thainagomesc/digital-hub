export function createElement(tag, className, textContent) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}

export function clearElement(element) {
  if (!element) {
    return;
  }

  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function formatDateLabel(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR", {
    month: "short",
    day: "numeric",
  });
}

export function formatHealthScore(score) {
  if (score >= 80) return "Saudável";
  if (score >= 60) return "Atenção";
  return "Crítico";
}

export function setLoading(element, isLoading) {
  if (!element) return;
  if (isLoading) {
    element.setAttribute("data-loading", "true");
  } else {
    element.removeAttribute("data-loading");
  }
}
