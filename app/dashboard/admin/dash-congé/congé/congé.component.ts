import {Component, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'wind-conge',
  templateUrl: './congé.component.html',
  styleUrls: ['./congé.component.css']
})
export class CongeComponent implements OnInit {
  constructor(private logger: NGXLogger) {
  }

  ngOnInit(): void {
  }
}
