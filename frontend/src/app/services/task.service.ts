import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { JarwisService } from './jarwis.service';
import { Router } from '@angular/router';

// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from '../../environments/environment';
// import { TokenService } from './token.service';

@Injectable()
export class TaskService {
  
  task_lists = [];
  
  constructor(
    private router: Router,
    private Jarwis: JarwisService,
    private Auth: AuthService
    ) {}

  initTaskList() {
    const me = this;
    this.Jarwis.getTaskList().subscribe(
      data => { const res:any = data; me.task_lists = res.data},
      error => { if(error.status = 401) me.Auth.logout(); else alert(error.message);}
    );
  }

  postTaskList(task_list) {
    const me = this;
    return new Promise((resolve, reject) => {
      me.Jarwis.postTaskList(task_list).subscribe(
        data => {
          const res:any = data;
          if(res.success) {
            me.refreshTaskList(res.data);
          }
          resolve(res.success);
        },
        error => {resolve(false)}
      );
    });
  }

  deleteTaskList(task_list) {
    const me = this;
    return new Promise((resolve, reject) => {
      me.Jarwis.deleteTaskList(task_list).subscribe(
        data => {
          const res:any = data;
          if(res.success) {
            me.refreshTaskList(task_list, true);
          }
          resolve(res.success);
        },
        error => {resolve(false)}
      );
    });
  }

  refreshTaskList(task_list, is_delete = false) {
    for (let i = 0; i < this.task_lists.length; i++) {
      let element = this.task_lists[i];
      if(element.id == task_list.id) {
        if(is_delete) {
          this.task_lists.splice(i, 1);
        } else {
          this.task_lists[i] = task_list;
        }
        return;
      }
    }
    if(!is_delete) this.task_lists.push(task_list);
  }

  postTask(task) {
    const me = this;
    return new Promise((resolve, reject) => {
      me.Jarwis.postTask(task).subscribe(
        data => {
          const res:any = data;
          if(res.success) {
            me.refreshTask(res.data);
          }
          resolve(res.success);
        },
        error => {resolve(false)}
      );
    });
  }

  deleteTask(task) {
    const me = this;
    return new Promise((resolve, reject) => {
      me.Jarwis.deleteTask(task).subscribe(
        data => {
          const res:any = data;
          if(res.success) {
            me.refreshTask(task, true);
          }
          resolve(res.success);
        },
        error => {resolve(false)}
      );
    });
  }

  refreshTask(task, is_delete = false) {
    for (let i = 0; i < this.task_lists.length; i++) {
      let task_list = this.task_lists[i];
      if(task_list.id == task.list_id) {
        for (let j = 0; j < task_list.tasks.length; j++) {
          let element = task_list.tasks[j];
          if(element.id == task.id) {
            if(is_delete) {
              task_list.tasks.splice(j, 1);
            } else {
              task_list.tasks[j] = task;
            }
            return;
          }
        }
        if(!is_delete) task_list.tasks.push(task);
        return;
      }
    }
  }
}
