import {
  createElement,
  formatDateLabel,
  formatHealthScore,
} from "../utils/domUtils.js";

export class ProjectListComponent {
  constructor(container) {
    this.container = container;
  }

  render(projects) {
    this.container.innerHTML = "";

    if (!projects.length) {
      const emptyState = createElement(
        "p",
        "project-list__empty",
        "Nenhum projeto encontrado para o filtro selecionado."
      );
      this.container.appendChild(emptyState);
      return;
    }

    projects
      .slice()
      .sort((a, b) => b.healthScore - a.healthScore)
      .forEach((project) => {
        this.container.appendChild(this.buildCard(project));
      });
  }

  buildCard(project) {
    const card = createElement("article", "project-card");

    const header = createElement("header", "project-card__header");
    const title = createElement("h3", "project-card__title", project.name);
    const badge = createElement("span", "project-card__status", project.status);

    header.append(title, badge);

    const description = createElement(
      "p",
      "project-card__description",
      project.description
    );

    const meta = createElement("div", "project-card__meta");
    const client = createElement("span", "project-card__client", `Cliente: ${project.client}`);
    const lead = createElement("span", "project-card__lead", `PO: ${project.lead}`);
    const milestone = createElement(
      "span",
      "project-card__milestone",
      `Próximo marco: ${project.nextMilestone} (${formatDateLabel(project.nextMilestoneDue)})`
    );

    meta.append(client, lead, milestone);

    const footer = createElement("footer", "project-card__footer");

    const health = createElement(
      "span",
      "project-card__health",
      `${project.healthScore}% · ${formatHealthScore(project.healthScore)}`
    );

    const tagsContainer = createElement("ul", "project-card__tags");
    project.tags.forEach((tag) => {
      const item = createElement("li", "project-card__tag", tag);
      tagsContainer.appendChild(item);
    });

    footer.append(health, tagsContainer);

    const focusList = createElement("ul", "project-card__focus");
    project.focusAreas.forEach((area) => {
      const li = createElement("li", "project-card__focus-item");
      li.innerHTML = `<strong>•</strong> ${area}`;
      focusList.appendChild(li);
    });

    const focusWrapper = createElement("div", "project-card__focus-wrapper");
    const focusTitle = createElement(
      "h4",
      "project-card__focus-title",
      "Próximos passos do squad"
    );
    focusWrapper.append(focusTitle, focusList);

    card.append(header, description, meta, focusWrapper, footer);
    return card;
  }
}
