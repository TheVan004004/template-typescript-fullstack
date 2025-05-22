/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiUrl } from "../../apiURL";
import { axiosInstance } from "../../axios";
import type { TTask } from "./type";

export const createTask = async (taskData: TTask) => {
  try {
    const response = await axiosInstance.post(apiUrl.task.create, taskData);
    return response.data;
  } catch (error: any) {
    console.log(error.response?.data?.error || "Failed to create task");
  }
};

export const getTaskById = async (id: string) => {
  try {
    const response = await axiosInstance.get(apiUrl.task.getById(id));
    return response.data;
  } catch (error: any) {
    console.log(error.response?.data?.error || "Failed to get task");
  }
};

export const updateTask = async (id: string, updatedData: Partial<TTask>) => {
  try {
    const response = await axiosInstance.put(
      apiUrl.task.update(id),
      updatedData
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response?.data?.error || "Failed to update task");
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await axiosInstance.delete(apiUrl.task.delete(id));
    return response.data;
  } catch (error: any) {
    console.log(error.response?.data?.error || "Failed to delete task");
  }
};

export const getAllTasks = async (): Promise<TTask[]> => {
  try {
    const response = await axiosInstance.get(apiUrl.task.getAll);
    return response.data;
  } catch (error: any) {
    console.log(error.response?.data?.error || "Failed to fetch tasks");
    return [];
  }
};
