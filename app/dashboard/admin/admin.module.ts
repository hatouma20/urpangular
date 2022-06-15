import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {AdminRoutingModule} from './admin.routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CKEditorModule,
  ]
})
export class AdminModule {
}

