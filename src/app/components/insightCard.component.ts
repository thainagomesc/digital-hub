import { MetricsSnapshot } from "../models/project";
import { createElement } from "../utils/domUtils";

export class InsightCardComponent {
  constructor(private readonly container: HTMLElement) {}

  render(metrics: MetricsSnapshot): void {
    this.container.innerHTML = "";

    const cards: Array<{ label: string; value: string; helper: string }> = [
      {
        label: "Projetos ativos",
        value: metrics.activeProjects.toString(),
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
      const metric = createElement("p", "metric-card__value", value);
      const description = createElement("span", "metric-card__helper", helper);

      card.append(title, metric, description);
      this.container.append(card);
    });
  }
}
