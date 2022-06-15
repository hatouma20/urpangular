import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {PayrollSettingRoutingModule} from './payroll-setting.routing.module';
import {PayrollSettingComponent} from './payroll-setting/payroll-setting.component';

@NgModule({
  declarations: [PayrollSettingComponent],
    imports: [
        CommonModule,
        PayrollSettingRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgbDatepickerModule,
        DragDropModule,
        CKEditorModule
    ]
})
export class PayrollSettingModule {
}
