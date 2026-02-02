// import api
import api from './api.js';

export async function getAllTasks() {
  const response = await api.get('/tasks?_expand=user');
  return response.data;
}

export async function getTaskById(id) {
  try {
    const res = await api.get(`/tasks/${id}?_expand=user`);
    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function getTasksByUserId(userId) {
  const response = await api.get('/tasks', {
    params: { userId, _expand: 'user' }
  });
  return response.data;
}

export async function createTask(taskData) {
  const response = await api.post('/tasks', {
    name: taskData.name,
    description: taskData.description,
    priority: taskData.priority || 'medium',
    status: taskData.status || 'pending',
    dueDate: taskData.dueDate,
    userId: taskData.userId
  });
  return response.data;
}

export async function updateTask(id, taskData) {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
}

export async function updateTaskStatus(id, status) {
  const response = await api.patch(`/tasks/${id}`, { status });
  return response.data;
}

export async function deleteTask(id) {
  await api.delete(`/tasks/${id}`);
}

export async function getUserTaskStats(userId) {
  const tasks = await getTasksByUserId(userId);
  return calculateStats(tasks);
}

export async function getAllTaskStats() {
  const tasks = await getAllTasks();
  return calculateStats(tasks);
}

function calculateStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const pending = tasks.filter(t => t.status === 'pending').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const highPriority = tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    pending,
    inProgress,
    highPriority,
    progress
  };
}
