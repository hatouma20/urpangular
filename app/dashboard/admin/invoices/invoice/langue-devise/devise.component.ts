import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Cmyk, ColorPickerService } from 'ngx-color-picker';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'wind-devise',
  templateUrl: './devise.component.html',
  styleUrls: ['devise.component.css'],
  styles:  [
` ::ng-deep ng-dropdown-panel {
       opacity: 1; background: white; border: 0.0625rem solid #e9ecef !important;
      }
    `
  ]
})

export class DeviseComponent implements OnInit {
  @Output() colorselected = new EventEmitter();
  @Output() devise = new EventEmitter();
  @Output() modele = new EventEmitter();
  cities4: any;
  modeleinvoice = [
    {id: 1, name: 'Modele 1', avatar: '../../../../../assets/img/invoice/invoice1.png'},
    {id: 2, name: 'Modele 2', avatar: '../../../../../assets/img/invoice/invoice2.png'}
  ];


 @Input() selectedCityName;
 @Input() deviseInvoice;
 @Input() colorInvoice;


  translate = 'fr';

  dateFromlivraison =  '';
  show = false;

  // ____________________color____________________
  public toggle = false;

  public rgbaText = 'rgba(165, 26, 214, 0.2)';

  public colorList = [
    { key: 'default', value: '#2270ba', friendlyName: 'Default' },
    {key: 'orange', value: '#fa761e', friendlyName: 'Orange' },
    {key: 'infrared',     value: '#ef486e', friendlyName: 'Infrared' },
    {key: 'male',       value: '#4488ff', friendlyName: 'Male Color' },
    {key: 'female',     value: '#ff44aa', friendlyName: 'Female Color' },
    {key: 'paleyellow',    value: '#ffd165', friendlyName: 'Pale Yellow' },
    {key: 'gargoylegas',  value: '#fde84e', friendlyName: 'Gargoyle Gas' },
    {key: 'androidgreen',   value: '#9ac53e', friendlyName: 'Android Green' },
    {key: 'carribeangreen',    value: '#05d59e', friendlyName: 'Carribean Green' },
    {key: 'bluejeans',    value: '#5bbfea', friendlyName: 'Blue Jeans' },
    {key: 'cyancornflower',    value: '#1089b1', friendlyName: 'Cyan Cornflower' },
    {key: 'warmblack',    value: '#06394a', friendlyName: 'Warm Black' },
  ];


  public presetValues: string[] = [];

  public selectedColor = 'color1';

  public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);
  // ____________________color____________________
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private ref: ChangeDetectorRef,
    public vcRef: ViewContainerRef,
    private cpService: ColorPickerService) {
    this.presetValues = this.getColorValues();
    this.create10kCities();
  }

  ngOnInit(): void {
    console.log(this.selectedCityName);
    this.colorselected.emit('#2270ba');
  }

  addCustomUser = (term) => ({id: term, name: term});
  private create10kCities() {
    this.cities4 = Array.from({length: 10000}, (value, key) => key)
      .map(val => ({
        id: val,
        name: `city ${val}`
      }));
  }

  getColorValues() {
    return this.colorList.map(c => c.value);
  }


  public onEventLog(event: string, data: any): void {
    console.log(event, data);
  }

  public onChangeColorCmyk(color: string): Cmyk {
    const hsva = this.cpService.stringToHsva(color);

    if (hsva) {
      const rgba = this.cpService.hsvaToRgba(hsva);

      return this.cpService.rgbaToCmyk(rgba);
    }

    return new Cmyk(0, 0, 0, 0);
  }

  public onChangeColorHex8(color: string): string {
    const hsva = this.cpService.stringToHsva(color, true);

    if (hsva) {
      return this.cpService.outputFormat(hsva, 'rgba', null);
    }

    return '';
  }
  setcolorvalue(id: any) {
    this.colorselected.emit(id);
  }

  changedevise(e: any) {
    this.devise.emit(e.target.value);
  }

  getmodel($event: any) {
    this.modele.emit($event.id);
  }
}
