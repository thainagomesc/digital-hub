export type ProjectStatus = "Discovery" | "Delivery" | "Stabilization";

export interface Project {
  id: number;
  name: string;
  client: string;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  lead: string;
  description: string;
  tags: string[];
  healthScore: number;
  nextMilestone: string;
  nextMilestoneDue: string;
  focusAreas: string[];
}

export interface MetricsSnapshot {
  activeProjects: number;
  avgSatisfaction: number;
  automationCoverage: number;
  cycleTime: number;
}

export interface TeamMember {
  name: string;
  role: string;
  availability: string;
  skills: string[];
}
