import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';

@Injectable()
export class JarwisService {
  private baseUrl = environment.base_url;

  task_list = [];
  
  constructor(
    private http: HttpClient,
    private Token: TokenService
  
    ) {}

  private getHttpOption() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + this.Token.get(),
      })
    };
    return httpOptions;
  }

  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data)
  }

  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data)
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data)
  }
  
  changePassword(data) {
    return this.http.post(`${this.baseUrl}/resetPassword`, data)
  }

  getTaskList() {
    return this.http.get(`${this.baseUrl}/task-lists`, this.getHttpOption());
  }

  postTaskList(task_list) {
    return this.http.post(`${this.baseUrl}/task-lists`, task_list, this.getHttpOption());
  }

  deleteTaskList(task_list) {
    return this.http.delete(`${this.baseUrl}/task-lists/${task_list.id}`, this.getHttpOption());
  }

  postTask(task) {
    return this.http.post(`${this.baseUrl}/tasks`, task, this.getHttpOption());
  }

  deleteTask(task) {
    return this.http.delete(`${this.baseUrl}/tasks/${task.id}`, this.getHttpOption());
  }

}
