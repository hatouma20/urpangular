import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LineModel} from "../../../../../../shared/model/response-payload/invoice/line.model";

@Component({

  selector: 'wind-outputline',
  templateUrl: './outputline.component.html',
  styleUrls: ['outputline.component.css'],
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
      ::ng-deep .angular-editor-textarea{ border:none !important; padding: 0px  !important; padding-left: 0.9rem !important;height: 3.2em !important;}
      ::ng-deep .angular-editor-placeholder { padding: 0rem 0rem 0rem 0.9rem !important;}
      ::ng-deep .select-font-size { display:none !important; }
      ::ng-deep #insertHorizontalRule-{ display:none !important; }
    `
  ]

})

export class OutputlineComponent implements OnInit {
  name = 'Angular 6';
  htmlContent = '';
  htmlContentWithoutStyles = '';

  @Output() totalchange = new EventEmitter();
  @Input() line ;
  @Input() devise;
  @Input() assujtva;
  @Input("index") index;
  total = 0;
  tva: any;


  constructor(
    private router: Router,
    private modalService: NgbModal,
    private ref: ChangeDetectorRef,
    private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.htmlContent = this.line.descriptionproduct ;
  }

  showHTML() {
    this.htmlContentWithoutStyles = document.getElementById('htmlDiv').innerHTML;
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



  calcultotal(property: string, event: any) {
    this.htmlContentWithoutStyles = document.getElementById('htmlDiv').innerHTML;
    if (property === 'descriptionproduct') {
      this.line.descriptionproduct = this.htmlContent;
    }
    if (property === 'quantite') {
      this.line.quantite = event.target.value;
    }
    if (property === 'prixunitaire') {
      this.line.prixunitaire = event.target.value;
    }
    if (property === 'tva') {
      this.line.tva = event.target.value;
    }

    this.total = Number((this.line.quantite *  this.line.prixunitaire).toFixed(3));
    this.tva =  Number(((this.total * this.line.tva) / 100).toFixed(3));
    this.line.prixtotal = Number(this.total.toFixed(3));
    this.line.prixnet = Number((this.total + this.tva).toFixed(3));

    // this.totalchange.emit(this.line.prixnet);
  }


}
