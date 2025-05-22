import { useTask } from "../../hooks/useTask";
import type { TTask } from "../../services/api/task/type";

export const TaskManager = () => {
  const {
    data: tasks,
    isLoading,
    isError,
    formData,
    editingId,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    changeTaskState,
  } = useTask();

  if (isLoading) return <div className="text-center">Loading tasks...</div>;
  if (isError)
    return <div className="text-center text-red-500">Error loading tasks</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>

      <div className="mb-4 space-y-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
        />
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {editingId ? "Update Task" : "Add Task"}
        </button>
      </div>

      <ul className="divide-y">
        {tasks?.map((task: TTask) => (
          <li
            key={task.id}
            className="py-3 flex flex-col md:flex-row md:justify-between md:items-center gap-2"
          >
            <div>
              <p className="font-semibold">{task.title}</p>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <select
                value={task.state}
                onChange={(e) =>
                  changeTaskState(task.id, e.target.value as TTask["state"])
                }
                className="border px-2 py-1 rounded"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <button
                onClick={() => handleEdit(task)}
                className="text-sm text-yellow-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
