import {
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LineModel} from "../../../../../../shared/model/response-payload/invoice/line.model";

@Component({

  selector: 'wind-subtotal',
  templateUrl: './subtotal.component.html',
  styleUrls: ['subtotal.component.css'],
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

export class SubtotalComponent implements OnInit,  OnChanges  {
  name = 'Angular 6';
  htmlContent = '';
  htmlContentWithoutStyles = '';
  @Input('linestotallist') linestotallist: Array<LineModel>;
  @Input('line') line;
  @Input('lastIndex') lastIndex;
  @Input('startFrom') startFrom;
  @Input('endOf') endOf;
  @Input() devise;

  subtotallist: Array<any> = [{id: '', description: '', subtotal: 0}];
  subtotalline = 0;
  htmlContentold: any;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private ref: ChangeDetectorRef,
    private _formBuilder: FormBuilder) {
  }

  idsubtotal: any;
  idsubtotallast: any;
  subtotallistid: Array<any> = [0];
  lastlineid: any;
  lastlinevalue: any;
  sum = 0;

  ngOnInit(): void {
    console.log(this.line);
    this.htmlContent = this.htmlContentold ;
    // subtotalline = Number(subtotalline) + Number(tt);

    for (let i = this.startFrom; i <= this.endOf; i++ ) {
      this.sum = this.sum + Number(this.linestotallist[i].prixnet);
    }
  }


  showHTML() {
    this.htmlContentWithoutStyles = document.getElementById('htmlDiv').innerHTML;
    this.test();
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

  ngOnChanges(changes: SimpleChanges): void {
    this.linestotallist = changes.linestotallist.currentValue;
    this.ref.detectChanges();
  }
  test() {
    this.linestotallist[this.endOf + 1].subtotalprice = this.sum;
    this.linestotallist[this.endOf + 1].subtotaldesc = this.htmlContent;
  }
  getSum() {
    this.sum = 0;
    for (let i = this.startFrom; i <= this.endOf; i++ ) {
      this.sum = this.sum + Number(this.linestotallist[i].prixnet);
    }
    if ( this.line.productname === 'subtotal') {
      this.htmlContentold = this.line.subtotaldesc ;
    }
    this.test();
    return (this.sum).toFixed(3);
  }


}
