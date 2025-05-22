import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import type { TTask } from "../services/api/task/type";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../services/api/task";

export const useTask = () => {
  const [formData, setFormData] = useState<Omit<TTask, "id">>({
    title: "",
    description: "",
    state: "todo",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const taskQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });

  const { refetch, data: tasks } = taskQuery;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateTask(editingId, formData);
        setEditingId(null);
      } else {
        if (!formData.title || !formData.description) {
          alert("Fill More Info");
          return;
        }
        const newTask: TTask = {
          id: Date.now().toString(),
          ...formData,
        };
        await createTask(newTask);
      }
      setFormData({ title: "", description: "", state: "todo" });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (task: TTask) => {
    setFormData({
      title: task.title,
      description: task.description,
      state: task.state,
    });
    setEditingId(task.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask(id);
      refetch();
    }
  };

  const changeTaskState = async (id: string, newState: TTask["state"]) => {
    try {
      const task = tasks?.find((t: TTask) => t.id === id);
      if (!task) return;
      await updateTask(id, { ...task, state: newState });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    ...taskQuery,
    formData,
    editingId,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    changeTaskState,
  };
};
