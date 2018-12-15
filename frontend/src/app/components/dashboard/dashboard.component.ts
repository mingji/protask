import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskListModalComponent } from './modal/taskListModal/taskListModal.component'
import { TaskModalComponent } from './modal/taskModal/taskModal.component'

import { TaskList } from '../../models/taskList';
import { Task } from '../../models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  error = '';

  constructor(
    private taskService: TaskService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.taskService.initTaskList();

  }

  openTaskListModal(task_list = new TaskList()) {
    const activeModal = this.modalService.open(TaskListModalComponent);
    activeModal.componentInstance.setTaskList(task_list);
  }

  deleteTaskList(task_list) {
    if (!confirm("Are you sure?")) return;

    const me = this;
    me.taskService.deleteTaskList(task_list).then(
      (res) => {
        if(!res) me.error = 'Delete Task List Error';
      }
    );
  }

  openTaskModal(task = new Task()) {
    const activeModal = this.modalService.open(TaskModalComponent);
    activeModal.componentInstance.setTask(task);
  }
  openNewTaskModal (task_list) {
    const task = new Task();
    task.list_id = task_list.id;
    const activeModal = this.modalService.open(TaskModalComponent);
    activeModal.componentInstance.setTask(task);
  }

  deleteTask(task) {
    event.stopPropagation();
    if (!confirm("Are you sure?")) return;
    const me = this;
    me.taskService.deleteTask(task).then(
      (res) => {
        if(!res) me.error = 'Delete Task List Error';
      }
    );
  }


}
