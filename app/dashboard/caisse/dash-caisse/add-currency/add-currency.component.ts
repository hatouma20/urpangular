import { Component, OnInit } from '@angular/core';
import {CurrencyRequestForm} from '../../../../shared/model/request-payload/caisse/currency-request-form';
import {CurrencyResult} from '../../../../shared/model/response-payload/caisse/currency-result';
import {CaisseService} from '../../../../shared/services/back-end/caisse/caisse.service';
import {Subject} from 'rxjs';
@Component({
  selector: 'wind-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.scss']
})
export class AddCurrencyComponent implements OnInit {
   currencies: Array<CurrencyResult> = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  currencyForm: CurrencyRequestForm = new CurrencyRequestForm(
    {value: '', dirty: false, class: '', error: ''},
    {value: '', dirty: false, class: '', error: ''},
    {value: 0, dirty: false, class: '', error: ''},
    true
  );
  constructor(private caisseservice: CaisseService) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.caisseservice.getAllCurrencies().subscribe(response => {
      this.currencies = response;
      this.dtTrigger.next();
    });

  }
  updateList(id: number, property: string, event: any) {
  }
  remove(uuid: any) {
    this.caisseservice.deletecurrency(uuid).subscribe(response =>
      window.location.reload()
    );
  }
  add() {}
  changeValue(id: number, property: string, event: any) {
  }
  private validateRequiredInputForm() {
    if (this.currencyForm.name.value === '') {
      this.currencyForm.name.dirty = true;
      this.currencyForm.name.class = 'invalid';
      this.currencyForm.name.error = 'Nom devise should not be empty';
    } else {
      this.currencyForm.name.dirty = false;
      this.currencyForm.name.class = 'valid';
      this.currencyForm.name.error = '';
    }
    if (this.currencyForm.label.value === '') {
      this.currencyForm.label.dirty = true;
      this.currencyForm.label.class = 'invalid';
      this.currencyForm.label.error = 'Label should not be empty';
    } else {
      this.currencyForm.label.dirty = false;
      this.currencyForm.label.class = 'valid';
      this.currencyForm.label.error = '';
    }
    if (this.currencyForm.exchangeRate.value === 0) {
      this.currencyForm.exchangeRate.dirty = true;
      this.currencyForm.exchangeRate.class = 'invalid';
      this.currencyForm.exchangeRate.error = 'Taux echange should not be empty';
    } else {
      this.currencyForm.exchangeRate.dirty = false;
      this.currencyForm.exchangeRate.class = 'valid';
      this.currencyForm.exchangeRate.error = '';
    }
  }
  private FormIsValid() {
    if (this.currencyForm.name.dirty) {
      this.currencyForm.isValid = false;
    } else {
      this.currencyForm.isValid = true;
    }
    if (this.currencyForm.name.dirty) {
      this.currencyForm.isValid = false;
    } else {
      this.currencyForm.isValid = true;
    }
    if (this.currencyForm.label.dirty) {
      this.currencyForm.isValid = false;
    } else {
      this.currencyForm.isValid = true;
    }
    if (this.currencyForm.exchangeRate.dirty) {
      this.currencyForm.isValid = false;
    } else {
      this.currencyForm.isValid = true;
    }
    if (this.currencyForm.isValid === true) {
      const shadesEl2 = document.querySelector('.alert-danger');
      shadesEl2.classList.remove('show');
    }
    return (this.currencyForm.isValid);
  }
  onFormSubmit() {
    this.validateRequiredInputForm();
    if (!this.FormIsValid()) {
      const shadesEl2 = document.querySelector('.alert-danger');
      shadesEl2.classList.add('show');
      return;
    } else {
      this.onAddcurrencyFormSubmit();
    }
  }
  onAddcurrencyFormSubmit() {
    this.validateRequiredInputForm();
    this.caisseservice.parametersAddCurrency = this.currencyForm;
    this.caisseservice.addcurrency().subscribe(() => {
      // this.router.navigateByUrl('/search/flights/result');
    });
    const shadesEl = document.querySelector('.alert-success');
    shadesEl.classList.add('show');
    const a = (document.getElementById('form1') as HTMLFormElement)
    a.reset();
    setTimeout(() => { shadesEl.classList.remove('show'); }, 3000);
  }
}
