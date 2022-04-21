import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop'; 

import { AppComponent } from './app.component';
import { ResizableComponent } from './resizable/resizable.component';
import { ItemComponent } from './item/item.component';
@NgModule({
  declarations: [
    AppComponent,
    ResizableComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
