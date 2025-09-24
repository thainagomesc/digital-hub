import { InsightCardComponent } from "./components/insightCard.component";
import { ProjectListComponent } from "./components/projectList.component";
import { MetricsSnapshot, Project, TeamMember } from "./models/project";
import { ProjectService } from "./services/projectService";
import { createElement, setLoading } from "./utils/domUtils";

const projectService = new ProjectService();

function requireElement<T extends HTMLElement>(element: T | null): T {
  if (!element) {
    throw new Error("Estrutura HTML principal não encontrada. Verifique os IDs.");
  }
  return element;
}

const projectListContainer = requireElement(
  document.querySelector<HTMLElement>("#project-list")
);
const metricsContainer = requireElement(
  document.querySelector<HTMLElement>("#metrics-grid")
);
const teamContainer = requireElement(
  document.querySelector<HTMLElement>("#team-grid")
);
const statusChips = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-filter-status]")
);
const liveRegion = requireElement(
  document.querySelector<HTMLElement>("#live-region")
);

const projectListComponent = new ProjectListComponent(projectListContainer);
const insightComponent = new InsightCardComponent(metricsContainer);
let cachedProjects: Project[] = [];

async function bootstrapDashboard(): Promise<void> {
  try {
    setLoading(projectListContainer, true);
    const [projects, metrics, team] = await Promise.all([
      projectService.getProjects(),
      projectService.getMetrics(),
      projectService.getTeam(),
    ]);

    cachedProjects = projects;
    bindFilterEvents();

    projectListComponent.render(projects);
    insightComponent.render(metrics);
    renderTeam(team);
    renderStatusCounters(projects);
    announce(`Dashboard carregado com ${projects.length} projetos.`);
  } catch (error) {
    console.error(error);
    projectListContainer.innerHTML =
      "<p class=\"project-list__error\">Não foi possível carregar os dados. Tente novamente em instantes.</p>";
    announce("Falha ao carregar os dados do dashboard.");
  } finally {
    setLoading(projectListContainer, false);
  }
}

function bindFilterEvents(): void {
  statusChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const status = chip.dataset.filterStatus ?? "all";
      statusChips.forEach((btn) => btn.classList.toggle("is-active", btn === chip));
      filterProjects(status);
    });
  });
}

function filterProjects(status: string): void {
  if (status === "all") {
    projectListComponent.render(cachedProjects);
    announce("Mostrando todos os projetos");
    return;
  }

  const filtered = cachedProjects.filter((project) => project.status === status);
  projectListComponent.render(filtered);
  announce(`Encontrados ${filtered.length} projetos com status ${status}`);
}

function renderTeam(team: TeamMember[]): void {
  teamContainer.innerHTML = "";

  team.forEach((member) => {
    const card = createElement("article", "team-card");
    const header = createElement("header", "team-card__header");
    const name = createElement("h3", "team-card__name", member.name);
    const role = createElement("span", "team-card__role", member.role);

    header.append(name, role);

    const availability = createElement(
      "p",
      "team-card__availability",
      `Disponibilidade: ${member.availability}`
    );

    const skillsList = createElement("ul", "team-card__skills");
    member.skills.forEach((skill) => {
      const item = createElement("li", "team-card__skill", skill);
      skillsList.appendChild(item);
    });

    card.append(header, availability, skillsList);
    teamContainer.appendChild(card);
  });
}

function renderStatusCounters(projects: Project[]): void {
  const counters = document.querySelectorAll<HTMLElement>("[data-counter]");
  const totals = projects.reduce<Record<string, number>>((acc, project) => {
    acc[project.status] = (acc[project.status] ?? 0) + 1;
    return acc;
  }, {});

  counters.forEach((counter) => {
    const key = counter.dataset.counter ?? "";
    counter.textContent = String(totals[key] ?? 0);
  });

  const totalElement = document.querySelector<HTMLElement>("[data-counter-total]");
  if (totalElement) {
    totalElement.textContent = String(projects.length);
  }
}

function announce(message: string): void {
  liveRegion.textContent = message;
}

void bootstrapDashboard();
