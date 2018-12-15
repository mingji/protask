import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../../../../services/task.service';


@Component({
  selector: 'app-modal-task',
  templateUrl: './taskModal.component.html',
  styleUrls: ['./taskModal.component.scss']
})
export class TaskModalComponent implements OnInit {
  task;
  error = '';

  constructor(
    private activeModal: NgbActiveModal,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.error = '';
  }

  public setTask(task) {
    this.task = Object.assign({}, task);
  }

  submit() {
    const me = this;
    me.taskService.postTask(this.task).then(
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
