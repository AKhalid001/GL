import type { TaskRequestDto } from "../model/dto/taskRequesDto";
import type { Task } from "./../model/task.model";
import { taskApi } from "./taskApi";

export const taskService = {
  //get api
  async getAllTasks(page:number,size:number): Promise<any> {
    const response = await taskApi.get(`/getAllTask?page=${page}&size=${size}`);

    return response.data;
  },

  //save task api
  async createTask(request: TaskRequestDto): Promise<any> {
    const response = await taskApi.post("/addTask", request);

    return response.data;
  },

  //update task api
  async updateTask(id: number, request: TaskRequestDto): Promise<any> {
    const response = await taskApi.put(`/updateTask/${id}`, request);

    return response.data;
  },

  //delete task api
  async deleteTask(id: number): Promise<void> {
    await taskApi.delete(`/deleteTask/${id}`);
  },

  async getTaskById(id: number) :Promise<Task>{
    const response =  await taskApi.get(`getTask/${id}`);
    return response.data;
  },
};
