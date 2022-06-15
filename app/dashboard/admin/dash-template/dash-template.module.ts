import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {DashDefaultRoutingModule} from '../dash-default/dash-default-routing.module';
import {CreateTemplateComponent} from './create-document/create-template.component';
import {DashTemplateRoutingModule} from './dash-template.routing.module';

@NgModule({
  declarations: [CreateTemplateComponent],
    imports: [
        CommonModule,
        DashTemplateRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbDatepickerModule,
        DragDropModule,
        CKEditorModule
    ]
})
export class DashTemplateModule {
}
