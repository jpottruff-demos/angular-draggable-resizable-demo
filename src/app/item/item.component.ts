import { CdkDragEnd, CdkDragMove, Point } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ResizeData } from '../resizable/resizable.component';

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

  /** Class name of the bounding container */
  dragBoundary: string = '.dragContainer'
  dragPosition: Point = {x: 0, y: 0}

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    this.updateDragPosition(this.item)
  }

  onDragMoved($event: CdkDragMove): void {
    this.updatePosition($event.source.getFreeDragPosition());
  }
  
  onDragEnd($event: CdkDragEnd): void {
    this.updatePosition($event.source.getFreeDragPosition());
  }

  onResized($event: ResizeData): void {
    console.log($event)
  }

  private updatePosition(point: Point): void {
    this.item.left = point.x;
    this.item.top = point.y
  }

  private updateDragPosition(item: Item): void {
    this.dragPosition.x = item.left;
    this.dragPosition.y = item.top;
  }

}
