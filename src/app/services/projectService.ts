import { MetricsSnapshot, Project, TeamMember } from "../models/project";

export class ProjectService {
  private readonly basePath = "./public/assets/data";

  private async fetchJson<T>(resource: string): Promise<T> {
    const response = await fetch(`${this.basePath}/${resource}`);

    if (!response.ok) {
      throw new Error(`Não foi possível carregar ${resource} (status ${response.status}).`);
    }

    return (await response.json()) as T;
  }

  async getProjects(): Promise<Project[]> {
    return this.fetchJson<Project[]>("projects.json");
  }

  async getMetrics(): Promise<MetricsSnapshot> {
    return this.fetchJson<MetricsSnapshot>("metrics.json");
  }

  async getTeam(): Promise<TeamMember[]> {
    return this.fetchJson<TeamMember[]>("team.json");
  }
}
