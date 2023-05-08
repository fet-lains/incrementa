import { HttpClient, HttpResponse } from '@/services/client';

export interface ITask {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

class TaskService extends HttpClient {
  async getTodos(): Promise<HttpResponse<ITask[]>> {
    return await this.get('/todos');
  }
}

export const taskService = new TaskService('');
