import { BACKEND_URL } from "./baseURL";

export const apiUrl = {
  task: {
    create: `${BACKEND_URL}/create`,
    getById: (id: string) => `${BACKEND_URL}/get/${id}`,
    update: (id: string) => `${BACKEND_URL}/update/${id}`,
    delete: (id: string) => `${BACKEND_URL}/delete/${id}`,
    getAll: `${BACKEND_URL}/get_all`,
  },
};
