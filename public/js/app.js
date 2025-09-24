import { InsightCardComponent } from "./components/insightCard.js";
import { ProjectListComponent } from "./components/projectList.js";
import { ProjectService } from "./services/projectService.js";
import { createElement, setLoading } from "./utils/domUtils.js";

const projectService = new ProjectService();
const projectListContainer = document.querySelector("#project-list");
const metricsContainer = document.querySelector("#metrics-grid");
const teamContainer = document.querySelector("#team-grid");
const statusChips = Array.from(document.querySelectorAll("[data-filter-status]"));
const liveRegion = document.querySelector("#live-region");

if (!projectListContainer || !metricsContainer || !teamContainer || !liveRegion) {
  throw new Error("Estrutura HTML principal não encontrada. Verifique os IDs.");
}

const projectListComponent = new ProjectListComponent(projectListContainer);
const insightComponent = new InsightCardComponent(metricsContainer);
let cachedProjects = [];

async function bootstrapDashboard() {
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

function bindFilterEvents() {
  statusChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const status = chip.dataset.filterStatus ?? "all";
      statusChips.forEach((btn) => btn.classList.toggle("is-active", btn === chip));
      filterProjects(status);
    });
  });
}

function filterProjects(status) {
  if (status === "all") {
    projectListComponent.render(cachedProjects);
    announce("Mostrando todos os projetos");
    return;
  }

  const filtered = cachedProjects.filter((project) => project.status === status);
  projectListComponent.render(filtered);
  announce(`Encontrados ${filtered.length} projetos com status ${status}`);
}

function renderTeam(team) {
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

function renderStatusCounters(projects) {
  const counters = document.querySelectorAll("[data-counter]");
  const totals = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] ?? 0) + 1;
    return acc;
  }, {});

  counters.forEach((counter) => {
    const key = counter.dataset.counter ?? "";
    counter.textContent = String(totals[key] ?? 0);
  });

  const totalElement = document.querySelector("[data-counter-total]");
  if (totalElement) {
    totalElement.textContent = String(projects.length);
  }
}

function announce(message) {
  liveRegion.textContent = message;
}

bootstrapDashboard();
