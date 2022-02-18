import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ToDoList';
  // define list of items
  items = ['Task 1', 'Task 2', 'Task 3'];
  counter = 0;
  newItem = '';
  valid = false;

  // Write code to push new item
  submitNewItem() {
    if (this.newItem !== '') {

      this.items.push(this.newItem); 
      this.newItem = '';
    }

    document.getElementById('addItem').focus();
  }

  // Write code to complete item
  completeItem(item: any, i: any) {

    document.getElementById(i).innerHTML = '<del>'  + item + '</del>';

  }

  // Write code to delete item
  deleteItem(i: any) {

    this.items.splice(i,1);
    
  }

}
