import { CdkDragEnd, CdkDragMove, Point } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { auditTime, Subject, withLatestFrom } from 'rxjs';

export enum Handle {
  NW = 'NW',
  NE = 'NE',
  SW = 'SW',
  SE = 'SE',
  N = 'N',
  E = 'E',
  S = 'S',
  W = 'W',
}

export interface Dimension {
  width: number;
  height: number;
}

export interface RelativePosition {
  top: number, 
  left: number
}

export interface ResizeData {
  rect: DOMRect,
  size: Dimension,
  position: RelativePosition,
  point: Point
}
@Component({
  selector: '[appResizable]',
  templateUrl: './resizable.component.html',
  styleUrls: ['./resizable.component.css']
})
export class ResizableComponent implements OnInit {
  @Output() resized = new EventEmitter<ResizeData>();

  public handle = Handle;

  private handleClicked$ = new Subject<Handle>();
  private startDimension$ = new Subject<Dimension>();
  private startPosition$ = new Subject<any>();
  private dragMove$ = new Subject<CdkDragMove>()

  private resizing$ = this.dragMove$.pipe(
    withLatestFrom(this.handleClicked$, this.startDimension$, this.startPosition$),
    auditTime(16)
  )

  
  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    this.resizing$.subscribe(([event, handle, startDimension, startPosition]) => {
      this.resize(event, handle, startDimension, startPosition);
    })
  }

  onDragStart(handle: Handle): void {
    this.handleClicked$.next(handle);
    this.startDimension$.next(this.getCurrentDimension());
    this.startPosition$.next(this.getCurrentRelativePosition());
  }
  
  onDragEnd($event: CdkDragEnd): void {
    $event.source._dragRef.reset();
    this.resized.emit(this.getResizeData());
  }

  onDragMoved($event: CdkDragMove): void {
    this.dragMove$.next($event);
  }

  private resize(
    event: CdkDragMove, 
    handle: Handle, 
    startDimension: Dimension, 
    startPosition: RelativePosition): void {

      switch(handle) {
        case (Handle.E):
          this.el.nativeElement.style.width = `${startDimension.width + event.distance.x}px`;
          break;
        case (Handle.S):
          this.el.nativeElement.style.height = `${startDimension.height + event.distance.y}px`;
          break;
        case (Handle.SE):
          this.el.nativeElement.style.width = `${startDimension.width + event.distance.x}px`;
          this.el.nativeElement.style.height = `${startDimension.height + event.distance.y}px`;
          break;
        
        case (Handle.W):
          this.el.nativeElement.style.width = `${startDimension.width - event.distance.x}px`;
          this.el.nativeElement.style.transform = `translate3d(${startPosition.left + event.distance.x}px, ${startPosition.top}px, 0px)`;
          break;
        case (Handle.N):
          this.el.nativeElement.style.height = `${startDimension.height - event.distance.y}px`;
          this.el.nativeElement.style.transform = `translate3d(${startPosition.left}px, ${startPosition.top + event.distance.y}px, 0px)`;
          break;
        case (Handle.NW):
          this.el.nativeElement.style.width = `${startDimension.width - event.distance.x}px`;
          this.el.nativeElement.style.height = `${startDimension.height - event.distance.y}px`;
          this.el.nativeElement.style.transform = `translate3d(${startPosition.left + event.distance.x}px, ${startPosition.top + event.distance.y}px, 0px)`;
          break;

        case (Handle.SW):
          this.el.nativeElement.style.width = `${startDimension.width - event.distance.x}px`;
          this.el.nativeElement.style.height = `${startDimension.height + event.distance.y}px`;
          this.el.nativeElement.style.transform = `translate3d(${startPosition.left + event.distance.x}px, ${startPosition.top}px, 0px)`;
          break;
        case (Handle.NE):
          this.el.nativeElement.style.width = `${startDimension.width + event.distance.x}px`;
          this.el.nativeElement.style.height = `${startDimension.height - event.distance.y}px`;
          this.el.nativeElement.style.transform = `translate3d(${startPosition.left}px, ${startPosition.top + event.distance.y}px, 0px)`;
          break;
      }
  }

  private getCurrentDimension(): Dimension {
    const rect = this.el.nativeElement.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
    };
  }

  private getCurrentRelativePosition(): RelativePosition {
    // https://stackoverflow.com/questions/26423335/elements-coordinates-relative-to-its-parent
    const childRect = this.el.nativeElement.getBoundingClientRect();
    const parentRect = this.el.nativeElement.parentElement?.getBoundingClientRect();

    return {
      top: childRect.top - (parentRect as DOMRect).top,
      left: childRect.left - (parentRect as DOMRect).left,
    }
  }

  private positionToPoint(position: RelativePosition): Point {
    return {
      x: position.left,
      y: position.top
    }
  }

  private getResizeData(): ResizeData {
    return {
      rect: this.el.nativeElement.getBoundingClientRect(),
      size: this.getCurrentDimension(),
      position: this.getCurrentRelativePosition(),
      point: this.positionToPoint(this.getCurrentRelativePosition())
    }
  }

}
