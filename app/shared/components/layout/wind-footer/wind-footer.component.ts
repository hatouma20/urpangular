import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'wind-footer',
  templateUrl: './wind-footer.component.html',
  styleUrls: ['./wind-footer.component.scss']
})
export class WindFooterComponent implements OnInit {

  test: Date = new Date();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  getPath() {
    return this.router.url;
  }
}
