import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FournisseurResult} from '../../../../shared/model/response-payload/fournisseur/fournisseur-result';
import {FournisseurService} from '../../../../shared/services/back-end/fournisseur/fournisseur.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'wind-fournisseur-list',
  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.scss']
})
export class FournisseurListComponent implements OnInit {
   fournisseurList: Array<FournisseurResult> = [];
   dtOptions: DataTables.Settings = {};
   dtTrigger: Subject<any> = new Subject<any>();
   compteListcount = 0;
   constructor(private fournisseurService: FournisseurService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    console.log('____________________________________________    '+ this.fournisseurList.length);
    this.fournisseurService.getAllTiers().subscribe(response => {
        this.fournisseurList = response;
        this.compteListcount === 1;
        this.dtTrigger.next();
      }
      );
  }
  add() {
     this.router.navigateByUrl('/dashboard/fournisseur/fournisseur');
  }
  remove(uuid: any) {
     this.fournisseurService.deletetiers(uuid).subscribe(response =>
      window.location.reload()
    );
  }
  gettiers(uuid: any) {
      this.fournisseurService.gettiers(uuid).subscribe(tiers => {
      this.router.navigateByUrl('/dashboard/fournisseur/fournisseur/profile');
      return tiers;
      });
  }
}
