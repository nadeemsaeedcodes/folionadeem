import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// Re-export types for convenience
export type Project = {
  id: number;
  title: string;
  description: string;
  category: "fullstack" | "uiux" | "graphic" | "animation";
  subCategory?: "logo" | "package" | "social" | "other";
  thumbnailUrl: string;
  liveUrl: string | null;
  technologies: string[] | null;
  images: { id: number; imageUrl: string }[];
};

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/folionadeem/projects.json");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      return data as Project[];
    },
  });
}

export function useProjectsByCategory(category: string) {
  return useQuery({
    queryKey: ["projects", category],
    queryFn: async () => {
      const res = await fetch("/folionadeem/projects.json");
      if (!res.ok) throw new Error(`Failed to fetch ${category} projects`);
      const data = await res.json();
      const projects = data as Project[];
      return projects.filter((p) => p.category === category);
    },
    enabled: !!category,
  });
}

export function useProject(id: number) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const res = await fetch("/folionadeem/projects.json");
      if (!res.ok) throw new Error("Failed to fetch project");
      const data = await res.json();
      const projects = data as Project[];
      return projects.find((p) => p.id === id) || null;
    },
    enabled: !!id,
  });
}
