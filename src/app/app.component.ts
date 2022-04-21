import { Component } from '@angular/core';
import { Item } from './item/item.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Draggable Resizable Demo';

  items: Item[] = [
    {id: 1, height: 50, width: 50, top: 10, left: 10},
    {id: 2, height: 50, width: 50, top: 100, left: 100},
    {id: 3, height: 50, width: 50, top: 200, left: 300},
    {id: 4, height: 50, width: 50, top: 10, left: 350},
  ]
}
