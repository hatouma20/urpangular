import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'wind-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  focus: any;
  focus1: any;
  images: string[] = ['assets/img/slider1.png', 'assets/img/slider2.png'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
