import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({

  selector: 'wind-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['comment.component.css'],
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

export class CommentComponent implements OnInit {
  name = 'Angular 6';
  htmlContent = '';
  htmlContentWithoutStyles = '';
  @Input() line ;
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

  changeComment(event: any) {
    this.htmlContentWithoutStyles = document.getElementById('htmlDiv').innerHTML;
    this.line.descriptionproduct = this.htmlContent;


  }

}
