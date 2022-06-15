import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PayrollService} from "../../../../../shared/services/back-end/payroll/payroll.service";
import {AngularEditorConfig} from "@kolkov/angular-editor";



@Component({

  selector: 'wind-taxe',
  templateUrl: './taxe.component.html',
  styleUrls: ['taxe.component.css'],
  styles: [
    ` ::ng-deep [title~=Undo]{ display:none !important; }
      ::ng-deep [title~=Redo]{ display:none !important; }
      ::ng-deep [title~=Strikethrough]{ display:none !important; }
      ::ng-deep #insertLink{ display:none !important; }
      ::ng-deep [title~=Unlink]{ display:none !important; }
      ::ng-deep #insertImage{ display:none !important; }
      ::ng-deep #insertVideo{ display:none !important; }
      ::ng-deep #textColor{ display:none !important; }
      ::ng-deep #backgroundColor{ display:none !important; }
      ::ng-deep #foregroundColorPicker-{ display:none !important; }
      ::ng-deep #backgroundColorPicker-{ display:none !important; }
      ::ng-deep #insertImage-{ display:none !important; }
      ::ng-deep #insertVideo-{ display:none !important; }
      ::ng-deep #toggleEditorMode-{ display:none !important; }
      ::ng-deep #clearFormatting-{ display:none !important; }
      ::ng-deep #link-{ display:none !important; }
      ::ng-deep #subscript-{ display:none !important; }
      ::ng-deep #superscript-{ display:none !important; }
      ::ng-deep #indent-{ display:none !important; }
      ::ng-deep #outdent-{ display:none !important; }
      ::ng-deep .select-custom-style{ display:none !important; }
      ::ng-deep #justifyFull-{ display:none !important; }
      ::ng-deep .select-font{ display:none !important; }
      ::ng-deep .angular-editor-textarea{ border:none !important; padding: 0px  !important; padding-left: 0.9rem !important;height: 4.5em !important;}
      ::ng-deep .angular-editor-placeholder { padding: 0rem 0rem 0rem 0.9rem !important;}
      ::ng-deep .select-font-size { display:none !important; }
    `
  ]

})

export class TaxeComponent implements OnInit {

  name = 'Angular 6';
  @Input() htmlContent ;
  htmlContentWithoutStyles = '';

  @Input('facturenumber') facturenumber;
  @Output() note = new EventEmitter();
  dateFrom =  '';
  dateFromlivraison =  '';
  dateFromeche =  '';
  constructor(
    private payrollService: PayrollService,
    private router: Router,
    private modalService: NgbModal,
    private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    console.log(this.facturenumber);
    this.note.emit(this.htmlContent);
  }

  showHTML() {
    this.htmlContentWithoutStyles = document.getElementById('htmlDiv').innerHTML;
    this.note.emit(this.htmlContent);
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: 'auto',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  getnote() {

  }

}
