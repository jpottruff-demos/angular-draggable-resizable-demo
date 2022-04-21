import { Component, Input, OnInit } from '@angular/core';

export interface Item {
  id: number,
  width: number, 
  height: number,
  top: number, 
  left: number
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;

  constructor() { }

  ngOnInit(): void {
  }

}
