import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LineModel} from '../../../../../../shared/model/response-payload/invoice/line.model';
import {PageModel} from '../../../../../../shared/model/response-payload/invoice/page.model';




@Component({

  selector: 'wind-modele2',
  templateUrl: './modele2.component.html',
  styleUrls: ['modele2.component.css'],
  styles: [
    ` ::ng-deep @media print {
          ::ng-deep .page {
          padding-left: 0em !important;
      }
          ::ng-deep .page-style{
          width: 900px  !important;
          height:1300px !important;
          background: #fff !important;
          border: 0px solid !important;
      }
      }
    `
  ]
})


export class Modele2Component implements OnInit {

  @Input('clientModel') clientModel;
  @Input('idInvoice') idInvoice;
  @Input('facturenumber') facturenumber;
  @Input('color') color;
  @Input('invoiceAction') invoiceAction;
  @Input('invoiceType') invoiceType;
  @Input('invoiceCategory') invoiceCategory;
  @Input('uuidInvoice') uuidInvoice;
  @Input('note') note;
  @Input('devise') devise;
  @Input('linestotallist') linestotallist: Array<LineModel>;
  @Input('listsubtotal') listsubtotal;
  @Input('payementype') payementype;
  @Input('patternResult') patternResult;
  @Input('clientimage') clientimage;
  @Input('partnerDefaulRib') partnerDefaulRib;
  @Input('partnerDefaulAddress') partnerDefaulAddress;
  @Input('checkboxValue') checkboxValue;
  @Input('purchaseType') purchaseType;
  @Input('translatee') translatee;

  @Input('dateinvoice') dateinvoice;
  @Input('dateLivraison') dateLivraison;
  @Input('dateEchec') dateEchec;

  @Input('SelectAddress') SelectAddress;

  dateFrom =  '';
  myStyles: string;
  sumht = 0
  sumtva = 0;
  totalLetter = '';



 invoiceModel: any = {
  color : '',
  customer : '',
  customerAdress : '',
  customerRib : '',
  deliveryDate : '',
  devise : '',
  dueDate : '',
  invoiceDate : '',
  invoiceNumber : '',
  invoicetype : '',
  isdeleted : false,
  langue : '',
  left_to_pay : 0,
  lineModels : this.linestotallist,
  model : 1,
  note : '',
  partner : '',
  partnerAdress : '',
  partnerRIB : '',
  purchaseType : null,
  timbre : 0,
  total_htt : 0,
  total_ttc : 0,
  tva : false,
  status : '',
  uuid: '',
  id: null
  };

  contentofpage: Array<PageModel> = [];
  tableofpage: Array< any > = [0];
  lenght: number;
  show: boolean;
  distinctArray: any[];


  tvaListResume: Array<any> = [];
   totalsumPrixTotal: number;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private buillingService: BuillingService,
    private ref: ChangeDetectorRef) {
  }



  ngOnInit(): void {
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const moth = new Date().getMonth() + 1;

    if (moth < 10) {
      this.dateFrom = day  + '-0' + moth + '-' + year;
    } else {
      this.dateFrom = day + '-' + moth + '-' + year;
    }

    this.myStyles = this.color;

    this.breackpage();
    this.show = false;
  }


  getSumht() {
    this.sumht = 0;
    for (let i = 0; i < this.linestotallist.length; i++ ) {
      if (this.linestotallist[i].productname === 'line') {
      this.sumht = this.sumht + Number(this.linestotallist[i].prixtotal);
      }
    }
    return this.sumht;
  }
  getSumtva() {
    this.sumtva = 0;
    for (let i = 0; i < this.linestotallist.length; i++ ) {
      if (this.linestotallist[i].productname === 'line') {
        this.sumtva = this.sumtva + Number(this.linestotallist[i].prixnet);
      }
    }

    const word = (this.sumtva + 0.600).toFixed(3);

    const wordtnd = word.toString().split('.')[0];
    const wordmil = word.toString().split('.')[1];

    const writtenNumber = require('written-number');
    const wordentnd = writtenNumber(wordtnd, {lang: 'fr'}); // => 'mille deux cent trente-quatre'
    const wordenmil = writtenNumber(wordmil, {lang: 'fr'}); // => 'mille deux cent trente-quatre'

    if (this.devise === '$') {
      this.totalLetter = wordentnd + ' Dollars et ' + wordenmil + ' Cents ';
    } else if (this.devise === '€') {
      this.totalLetter = wordentnd + ' Euro et ' + wordenmil + ' Centimes ';
    }  else {
      this.totalLetter = wordentnd + ' Dinars et ' + wordenmil + ' Millimes ';
    }


    return (this.sumtva + 0.600).toFixed(3);
  }

   breackpage() {
    setTimeout(function () {
    });
  }

  getTvaList() {
    this.tvaListResume = [];
    this.totalsumPrixTotal = 0;
    const arrayWithDuplicates = [];
    console.dir(this.linestotallist);
    for (let i = 0; i < this.linestotallist.length; i++ ) {
      arrayWithDuplicates.push(this.linestotallist[i].tva);
    }

    this.distinctArray = arrayWithDuplicates.filter((n, i) => arrayWithDuplicates.indexOf(n) === i);
    console.dir(this.distinctArray);

    this.distinctArray.forEach( item => {
      let sumMontantHt = 0;

      let sumPrixTotal = 0;
      let sumTVA = 0;

      if (item !== '') {
      this.linestotallist.forEach( listitem => {
        if ((listitem.tva === item) && (listitem.tva !== '')) {
          sumMontantHt = sumMontantHt + listitem.prixtotal;
          sumTVA = sumTVA + listitem.prixnet;
        }
      });
      sumPrixTotal =  Number((sumTVA - sumMontantHt).toFixed(3));
      this.totalsumPrixTotal = this.totalsumPrixTotal + sumPrixTotal;
      this.tvaListResume.push({item, sumMontantHt, sumPrixTotal});
    }
    });
    console.dir(this.tvaListResume);
  }

  changeshowlist() {

    //  start : element  height
    const logoheight = document.getElementById('logo').scrollHeight;
    const clientdetailheight = document.getElementById('clientdetail').scrollHeight;
    const facturenumberheight = document.getElementById('facturenumber').scrollHeight;
    const metaWrapperHeight = clientdetailheight + facturenumberheight;

    const tablelineheight = document.getElementById('tableline').scrollHeight;

    const tabletotalheight = document.getElementById('tabletotal').scrollHeight;
    const noteheight = document.getElementById('note').scrollHeight;
    const sommelettreheight = document.getElementById('sommelettre').scrollHeight;

    const footerheight = document.getElementById('footer').scrollHeight;

    const totalsHeight = tabletotalheight + noteheight + sommelettreheight ;

    this.tableofpage = [];

    // let height = 0;
    let i = 0;


    const itemsHeights = {};
    for ( i; i < this.linestotallist.length; i++) {
      const elmnt = document.getElementById( 'trid_' + this.linestotallist[i].id) as HTMLInputElement;
      itemsHeights[this.linestotallist[i].id] = elmnt.scrollHeight;
    }
    this.tableofpage = makeGroups({
      headerHeight: logoheight,
      metaWrapperHeight,
      totalsHeight,
      itemsHeights,
      totalItems: this.linestotallist,
    }).filter((x) => x.length);
    this.lenght = this.tableofpage.length - 1;

    console.log('tableofpage   ', this.tableofpage);

  }


  saveInvoice() {

    this.invoiceModel.color = this.color;
    this.invoiceModel.customer = this.clientModel.uuid;
    this.invoiceModel.customerAdress = this.SelectAddress.item_id;
    this.invoiceModel.customerRib = null;
    this.invoiceModel.deliveryDate = this.dateLivraison;
    this.invoiceModel.devise = this.devise;
    this.invoiceModel.dueDate = this.dateEchec;
    this.invoiceModel.invoiceDate = this.dateinvoice;
    this.invoiceModel.invoiceNumber = this.facturenumber;
    this.invoiceModel.invoicetype = this.invoiceType;
    this.invoiceModel.isdeleted = false;
    this.invoiceModel.langue = this.translatee;
    // this.invoiceModel.langue = 'fr';
    this.invoiceModel.left_to_pay = this.getSumtva();
    this.invoiceModel.lineModels = this.linestotallist;
    this.invoiceModel.model = 2;
    this.invoiceModel.note = this.note;
    this.invoiceModel.partner = this.patternResult.uuid;
    this.invoiceModel.partnerAdress = this.partnerDefaulAddress;
    this.invoiceModel.partnerRIB = this.partnerDefaulRib;
    this.invoiceModel.purchaseType = this.purchaseType;
    this.invoiceModel.timbre = 0.600;
    this.invoiceModel.total_htt = this.getSumht();
    this.invoiceModel.total_ttc = this.getSumtva();
    this.invoiceModel.tva = this.checkboxValue;
   // this.invoiceModel.tva = null;
    this.invoiceModel.status = 'CREE';
    this.invoiceModel.uuid = this.uuidInvoice;
    this.invoiceModel.id = this.idInvoice;

    if (this.invoiceAction === 'CREATE') {
      if ( this.invoiceCategory === 'CommandeFournisseur') {
        this.buillingService.createBonCommande(this.invoiceModel).subscribe(response => {
            this.ref.detectChanges();
            document.querySelector('.alert-success-create').classList.add('show');
            setTimeout(() => {  document.querySelector('.alert-success-create').classList.remove('show'); }, 3000);
           }
        );
      } else if ( this.invoiceCategory === 'FactureFournisseur') {
        this.invoiceModel.status = 'NON_PAYE';
        this.buillingService.createInvoice(this.invoiceModel).subscribe(response => {
          this.ref.detectChanges();
          document.querySelector('.alert-success-create').classList.add('show');
          setTimeout(() => {  document.querySelector('.alert-success-create').classList.remove('show'); }, 3000);          }
        );
      } else if ( this.invoiceCategory === 'BonReception') {
        this.invoiceModel.status = 'NON_RECU';
        this.buillingService.createBonRecept(this.invoiceModel).subscribe(response => {
          this.ref.detectChanges();
          document.querySelector('.alert-success-create').classList.add('show');
          setTimeout(() => {  document.querySelector('.alert-success-create').classList.remove('show'); }, 3000);          }
        );
      }
    } else if (this.invoiceAction === 'UPDATE') {
      this.buillingService.updateBonCommande(this.invoiceModel).subscribe(response => {
        this.ref.detectChanges();
        document.querySelector('.alert-success-update').classList.add('show');
        setTimeout(() => {  document.querySelector('.alert-success-update').classList.remove('show'); }, 3000);
        }
      );
    }

  }

}
import head from 'lodash/head';
import tail from 'lodash/tail';
import {BuillingService} from "../../../../../../shared/services/back-end/builling/builling.service";

function makeGroups({
                      headerHeight,
                      metaWrapperHeight,
                      totalsHeight,
                      itemsHeights,
                      totalItems,
                    }) {
  console.log({
    headerHeight,
    metaWrapperHeight,
    totalsHeight,
    itemsHeights,
    totalItems,
  })
  const maxPageHeight = 900;

  function work(items, groups, groupIndex) {
    // base case
    if (items.length === 0) {
      return groups;
    }

    const item = head(items);
    const rest = tail(items);
    const theLastItem = rest.length === 0;
    const currentGroup = groups[groupIndex] || [];



    if (theLastItem && currentGroup.length === 0) {
      // add the last item without testing its height

      // eslint-disable-next-line no-param-reassign
      groups[groupIndex] = currentGroup.concat(item);
      return work(rest, groups, groupIndex);
    }

    const groupItemsHeight = currentGroup.reduce(
      (mem, i) => mem + itemsHeights[i.id],
      0,
    );
    const itemHeight = itemsHeights[item.id];

    const baseHeight =
      groupIndex === 0
        ? headerHeight + metaWrapperHeight + groupItemsHeight + itemHeight
        : headerHeight + groupItemsHeight + itemHeight;
    const extendedHeight = baseHeight + totalsHeight;

    const itemOnItsOwnWithHeaderHeight = itemHeight + headerHeight;

    if (
      currentGroup.length === 0 &&
      itemOnItsOwnWithHeaderHeight > maxPageHeight
    ) {
      // eslint-disable-next-line no-param-reassign
      groups[groupIndex] = currentGroup.concat(item);
      return work(rest, groups, groupIndex + 1);
    }

    if (theLastItem && extendedHeight > maxPageHeight) {
      // create a new page for the last item
      return work(items, groups, groupIndex + 1);
    }

    if (extendedHeight > maxPageHeight && baseHeight > maxPageHeight) {
      // create a new page
      return work(items, groups, groupIndex + 1);
    }
    // okay
    // eslint-disable-next-line no-param-reassign
    groups[groupIndex] = currentGroup.concat(item);
    return work(rest, groups, groupIndex);
  }

  return work(totalItems, [], 0);
}

