import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent
  implements
    OnInit,
    AfterViewInit,
    AfterContentInit,
    AfterContentChecked,
    AfterViewChecked,
    DoCheck,
    OnDestroy
{
  ngAfterViewInit(): void {}
  ngAfterContentInit(): void {}
  ngAfterContentChecked(): void {}
  ngAfterViewChecked(): void {}
  ngDoCheck(): void {}
  ngOnDestroy(): void {}
  ngOnInit() {
    this.loadTasksFromLocalStorage();
  }

  tasks: { title: string; completed: boolean }[] = [];
  newTask: string = '';
  editedTask: any = null;
  editedTaskValue: string = '';
  saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }
  addTask() {
    if (this.newTask !== '') {
      this.tasks.push({ title: this.newTask, completed: false });
      this.newTask = '';
      this.saveTasksToLocalStorage();
    }
  }
  editTask(task: { title: string; completed: boolean }) {
    this.editedTask = task;
    this.editedTaskValue = task.title;
    this.saveTasksToLocalStorage();
  }

  taskEdited() {
    if (this.editedTaskValue) {
      const index = this.tasks.indexOf(this.editedTask);

      if (index !== -1) {
        this.tasks[index].title = this.editedTaskValue;
        this.editedTask = null;
        this.editedTaskValue = '';
      }
    }
    this.saveTasksToLocalStorage();
  }
  completeTask(task: { title: string; completed: boolean }) {
    task.completed = !task.completed;
    this.saveTasksToLocalStorage();
  }
  deleteTask(task: { title: string; completed: boolean }) {
    const index = this.tasks.indexOf(task);

    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasksToLocalStorage();
    }
  }
  completeAll() {
    const allCompleted = this.allCompleted();

    this.tasks.forEach((task) => {
      task.completed = !allCompleted;
    });
    this.saveTasksToLocalStorage();
  }

  allCompleted() {
    return this.tasks.every((task) => task.completed);
  }

  deleteAll() {
    this.tasks = [];
    this.saveTasksToLocalStorage();
  }
}
