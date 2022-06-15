import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalModule} from 'ng-uikit';
import {BehaviorSubject} from 'rxjs';
import {ClauseModel} from '../../../../shared/model/response-payload/collaborators/clause/clause-model';
import {CollaboratorService} from '../../../../shared/services/back-end/collaborator/collaborator.service';
import * as moment from 'moment';
@Component({
  selector: 'wind-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['create-template.component.css', '../../../../../assets/css/mystyle.css']
})
export class CreateTemplateComponent implements OnInit {
  private finished = new BehaviorSubject(null);

  private showingArticle = new BehaviorSubject(null);
  date = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a');
  clause: ClauseModel = new ClauseModel(
    '',
    '',
    null,
    [],
    '',
    ''
  );
  contractDocument = {
    clauses: [],
    documentRefderence: '',
    id: 0,
    uuid: ''
  };
constructor( private sirhService: CollaboratorService,
             private ref: ChangeDetectorRef,
             private modalService: NgbModal) {
}
   tags = [
     { name: '#salaire' },
     { name: '#periode d\'essai' },
     { name: '#salarier' },
     { name: '#contrat' },
     { name: '#durée de contrat' },
  ];
  public editor = ClassicEditor;
  contenteditable = true;
  reference = '';
  todo = [];
  ArticleList = [
    // {
    //   id: 0,
    //   content: []
    // }
  ];
  clauses = [];
  done = [];
  clauseAdded: any = {clauseNumber: '0',
    clauseText: this.clause.clauseText,
    parameter: [],
    id: 0,
    title: '',
    uuid: '',
  };
  data: any = '';
 ngOnInit(): void {
   this.sirhService.getAllClauses().subscribe( response => {
    response.forEach( elt => {
      this.clauses.push(elt);
    });
   });
 }

  drop(event: CdkDragDrop<string[]>, id: any, list: any) {
     if ( list !== null) {
      if (list.content.length === 0) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
      }
     } else if (list === null) {
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
        }
      }
    /*#region affect clauses >>> contract document*/
     this.ref.detectChanges();
     this.contractDocument.clauses = [];
     for (let i = 0; i < this.ArticleList.length; i++) {
      if ( this.ArticleList[i].content.length === 0) {
        this.ArticleList.splice(i, 1);
        // i--;
        break;
      }
      if (this.ArticleList.length > 0) {
        this.contractDocument.clauses.push(
          {
            uuid: this.ArticleList[i].content[0].uuid
          });
      }
    }
     this.ajouterArticle();
     this.ref.detectChanges();
     const element = document.getElementById((this.ArticleList.length - 1).toString());
     element.setAttribute('style', 'display:none');
     this.ref.detectChanges();

    /*#Endregion affect clauses >>> contract document*/
  }
  createContractDocument() {
    this.sirhService.createContractDocument(this.contractDocument).subscribe(response => { // window.location.reload()
        const shadesEl = document.querySelector('.alert-success');
        shadesEl.classList.add('show');
      const a = (document.getElementById('form1') as HTMLFormElement)
      a.reset();
        setTimeout(() => { shadesEl.classList.remove('show'); }, 3000);
      }
    );
  }
  hideTeam(divid: any) {
    const element: HTMLElement = document.getElementById(divid);
    this.clauses.push(this.ArticleList[divid].content[0]);
    this.ArticleList.splice(divid, 1);
    element.setAttribute('style', 'display:none');
    this.contractDocument.clauses = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.ArticleList.length; i++) {
      if (this.ArticleList.length > 0) {
        this.contractDocument.clauses.push(
          {
            uuid: this.ArticleList[i].content[0].uuid
          });
      }
    }
  }
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
  ajouter() {
    this.finished.next(false);
    this.clauseAdded.clauseText = this.clause.clauseText;
    this.sirhService.createClause(this.clauseAdded).subscribe( response => {
      console.log(response);
      // this.clauses.push(response.clauseText);
      this.finished.next(true);
    });
    this.finished.subscribe(value => {
      if (value) {
        this.sirhService.getAllClauses().subscribe( response => {
          this.clauses = [];
          response.forEach( elt => {
            this.clauses.push(elt);
          });
        });
      }
    });
  }

  drag(tag: any) {
    console.log(tag);
    if (this.clauseAdded.parameter.indexOf(tag.name) === -1) {
      this.clauseAdded.parameter.push(tag.name );
    }
  }


  cut(event: any) {
    const t = document.querySelector('.ck-editor__editable').textContent;
    this.clauseAdded.parameter.forEach((elt, index) => {
      if (t.search(elt) === -1 ) {
        this.clauseAdded.parameter.splice(index, 1);
        const str = elt.slice(0, -1);
        const replacedText = t.replace(str, '');
        console.log('Does not contain ' );
        const b = ( document.querySelector('.ck-editor__editable') as HTMLInputElement);
        // tslint:disable-next-line:no-unused-expression
        (b.childNodes.item(0) as HTMLParagraphElement).textContent = replacedText;
      }
    });
  }

  ajouterArticle() {
   this.ArticleList.push(
     {
       id: this.ArticleList.length,
       content: []
     }
   );
  }

  startdrag() {
    for (let i = 0; i < this.ArticleList.length; i++) {
      if ( this.ArticleList[i].content.length === 0) {
        this.ArticleList.splice(i, 1);
        i--;
      }
    }
    this.ajouterArticle();
    this.ArticleList.forEach((elt, index) => {
        const element0 = document.getElementById(index.toString());
        element0.setAttribute('style', 'display:block !important');
      });
    this.ref.detectChanges();
    }
  open(content) {
    this.modalService.open(content,  {size: 'xl'});
  }

  onPreview() {
    let printContents = '';
    let htmlData = '';
    const WindowObject = window.open('');
    // printContents += `<table class="table table-bordered table-responsive-md table-striped text-center" >
    //                <tr style="background: #9a9a9a">
    //                  <th class="text-center">Collaborator</th>
    //                  <th class="text-center">Date fin</th>
    //                  <th class="text-center">Date Debut</th>
    //                  <th class="text-center">Nombres des heures</th>
    //                  <th class="text-center">Raison</th>
    //                  <th class="text-center">Type</th>
    //                </tr>`;
    printContents = document.getElementById('modal-body').innerHTML;
    htmlData = `<html><body>${printContents}</body></html>`;
    WindowObject.document.write(htmlData);
    WindowObject.print();
    WindowObject.document.close();
  }
}

