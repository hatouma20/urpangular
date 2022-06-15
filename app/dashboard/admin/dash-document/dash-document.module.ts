import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DashDocumentRoutingModule} from './dash-document-routing.module';
import {DocumentComponent} from './document/document.component';
import {DragDropDirective} from './drag-drop.directive';

@NgModule({
  declarations: [DocumentComponent, DragDropDirective],
  imports: [
    CommonModule,
    DashDocumentRoutingModule
  ]
})
export class DashDocumentModule {
}
