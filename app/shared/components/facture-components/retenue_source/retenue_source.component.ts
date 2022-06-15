import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'wind-retenue_source',
  templateUrl: './retenue_source.component.html',
  styleUrls: ['retenue_source.component.css', '../../../../../assets/css/mystyle.css']
})
export class Retenue_sourceComponent implements OnInit {
  @Input() RS_model ;
  constructor() {
  }
  ngOnInit(): void {
    console.log(this.RS_model);

  }
}


