import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../../../../services/task.service';


@Component({
  selector: 'app-modal-tasklist',
  templateUrl: './taskListModal.component.html',
  styleUrls: ['./taskListModal.component.scss']
})
export class TaskListModalComponent implements OnInit {
  task_list;
  error = '';

  constructor(
    private activeModal: NgbActiveModal,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.error = '';
  }

  public setTaskList(task_list) {
    this.task_list = Object.assign({}, task_list);
  }

  submit() {
    const me = this;
    me.taskService.postTaskList(this.task_list).then(
      (res) => {
        if(res) {
          me.activeModal.close();
        } else {
           me.error = 'Network Error';
        }
      }
    );
    
  }

}
