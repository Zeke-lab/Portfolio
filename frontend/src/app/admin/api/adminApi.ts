const ADMIN_API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type RequestOptions = {
  method?: HttpMethod;
  token?: string;
  body?: unknown;
};

async function parseJsonSafe(response: Response) {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${ADMIN_API_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...(options.body ? { "Content-Type": "application/json" } : {}),
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  });

  const data = await parseJsonSafe(response);

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? String((data as { error?: string }).error)
        : `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data as T;
}

export const adminApi = {
  login: (email: string, password: string) =>
    request<{ token: string; user: { id: string; name: string; email: string; role: string } }>(
      "/api/admin/login",
      { method: "POST", body: { email, password } },
    ),
  me: (token: string) => request<{ user: { id: string; name: string; email: string; role: string } }>("/api/admin/me", { token }),
  content: (token: string) => request<any>("/api/admin/content", { token }),
  createProfile: (token: string, body: unknown) => request("/api/admin/profile", { method: "POST", token, body }),
  updateProfile: (token: string, id: string, body: unknown) => request(`/api/admin/profile/${id}`, { method: "PUT", token, body }),
  deleteProfile: (token: string, id: string) => request(`/api/admin/profile/${id}`, { method: "DELETE", token }),
  createProject: (token: string, body: unknown) => request("/api/admin/project", { method: "POST", token, body }),
  updateProject: (token: string, id: string, body: unknown) => request(`/api/admin/project/${id}`, { method: "PUT", token, body }),
  deleteProject: (token: string, id: string) => request(`/api/admin/project/${id}`, { method: "DELETE", token }),
  createSkill: (token: string, body: unknown) => request("/api/admin/skill", { method: "POST", token, body }),
  updateSkill: (token: string, id: string, body: unknown) => request(`/api/admin/skill/${id}`, { method: "PUT", token, body }),
  updateSkillVisibility: (token: string, id: string, visible: boolean) => request(`/api/admin/skill/${id}/visibility`, { method: "PATCH", token, body: { visible } }),
  deleteSkill: (token: string, id: string) => request(`/api/admin/skill/${id}`, { method: "DELETE", token }),
  createExperience: (token: string, body: unknown) => request("/api/admin/experience", { method: "POST", token, body }),
  updateExperience: (token: string, id: string, body: unknown) => request(`/api/admin/experience/${id}`, { method: "PUT", token, body }),
  deleteExperience: (token: string, id: string) => request(`/api/admin/experience/${id}`, { method: "DELETE", token }),
  createEducation: (token: string, body: unknown) => request("/api/admin/education", { method: "POST", token, body }),
  updateEducation: (token: string, id: string, body: unknown) => request(`/api/admin/education/${id}`, { method: "PUT", token, body }),
  deleteEducation: (token: string, id: string) => request(`/api/admin/education/${id}`, { method: "DELETE", token }),
  createCertification: (token: string, body: unknown) => request("/api/admin/certification", { method: "POST", token, body }),
  updateCertification: (token: string, id: string, body: unknown) => request(`/api/admin/certification/${id}`, { method: "PUT", token, body }),
  deleteCertification: (token: string, id: string) => request(`/api/admin/certification/${id}`, { method: "DELETE", token }),
  uploadFile: async (token: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${ADMIN_API_URL}/api/admin/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await parseJsonSafe(response);

    if (!response.ok) {
      const message =
        data && typeof data === "object" && "error" in data
          ? String((data as { error?: string }).error)
          : `Upload failed (${response.status})`;
      throw new Error(message);
    }

    return data as {
      url: string;
      fileName: string;
      storedName: string;
      mimeType: string;
      size: number;
    };
  },
};
