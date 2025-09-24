import { createElement } from "../utils/domUtils.js";

export class InsightCardComponent {
  constructor(container) {
    this.container = container;
  }

  render(metrics) {
    this.container.innerHTML = "";

    const cards = [
      {
        label: "Projetos ativos",
        value: String(metrics.activeProjects),
        helper: "Squads em acompanhamento semanal",
      },
      {
        label: "NPS médio",
        value: metrics.avgSatisfaction.toFixed(1),
        helper: "Satisfação dos stakeholders nos últimos 90 dias",
      },
      {
        label: "Cobertura automatizada",
        value: `${metrics.automationCoverage}%`,
        helper: "Testes E2E + pipelines CI/CD",
      },
      {
        label: "Cycle time",
        value: `${metrics.cycleTime} dias`,
        helper: "Média da ideia ao deploy em produção",
      },
    ];

    cards.forEach(({ label, value, helper }) => {
      const card = createElement("article", "metric-card");
      const title = createElement("h3", "metric-card__title", label);
      const metricValue = createElement("p", "metric-card__value", value);
      const description = createElement("span", "metric-card__helper", helper);

      card.append(title, metricValue, description);
      this.container.append(card);
    });
  }
}
