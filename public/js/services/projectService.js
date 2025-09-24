export class ProjectService {
  constructor() {
    this.basePath = "./public/assets/data";
  }

  async fetchJson(resource) {
    const response = await fetch(`${this.basePath}/${resource}`);
    if (!response.ok) {
      throw new Error(`Não foi possível carregar ${resource} (status ${response.status}).`);
    }
    return await response.json();
  }

  async getProjects() {
    return this.fetchJson("projects.json");
  }

  async getMetrics() {
    return this.fetchJson("metrics.json");
  }

  async getTeam() {
    return this.fetchJson("team.json");
  }
}
