import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ROLE_ADMIN} from '../../shared/constants/event';
import {AUTHENTICATION_KEY} from '../../shared/constants/local-storage-keys';
import {Router} from '@angular/router';
import {MenuService} from '../../shared/services/menu/menu-service';
import {CollaboratorService} from '../../shared/services/back-end/collaborator/collaborator.service';
import {LocalStorageService} from '../../shared/services/local-storage/local-storage.service';
import {AuthService} from '../../shared/services/back-end/auth/auth.service';
import validate = WebAssembly.validate;

@Component({
  selector: 'wind-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../dash-main/dash-main.component.css']
})
export class NavBarComponent implements OnInit {
  public fineshed = new BehaviorSubject(null);
  public focus;
  public listTitles: any[];
  public location: Location;
  public currentuuid: any;
  public collaboratorResult: any;
  public selectedItem: any;
  constructor(private router: Router,
              private authService: AuthService,
              private sirhService: CollaboratorService,
              private localSt: LocalStorageService,
              private menuService: MenuService
              ) {
    // this.location = location;
  }

  ngOnInit() {
    if (this.authService.connectedUser != null ) {
      this.currentuuid = this.authService.connectedUser.uuid;
    }
    if (this.sirhService.uuid != null) { this.currentuuid = this.sirhService.uuid.access_id; }
    this.sirhService.getCollaborator( this.currentuuid).subscribe(response => {
      this.collaboratorResult = response;
    });  }

  getTitle() {
  }

  logout() {
    this.authService.logout();
    this.localSt.setItem('SELECTED_MENU',  {
      label: 'Profil',
      icon: 'ni ni-single-02',
      url: '#/dashboard/admin/profile',
      role: ROLE_ADMIN,
      niveau: 2,
      children: []
    }).subscribe(_ => {
      this.menuService.selectedItemMenu.next( {
        label: 'Profil',
        icon: 'ni ni-single-02',
        url: '#/dashboard/admin/profile',
        role: ROLE_ADMIN,
        niveau: 2,
        children: []
      });
    });
    this.localSt.setItem('SELECTED_MENU_SHOWN', {menu: '', submenu: 'collapseExample0'}).subscribe(_ => {
      this.menuService.selectedmenuShownMenu.next({menu: '#/dashboard/admin/profile' +
          '' +
          '', submenu: '#/dashboard/admin/profile'});
    });
    this.sirhService.uuid = null;
    this.localSt.setItem( AUTHENTICATION_KEY, '' ).subscribe( _ => {
      this.router.navigateByUrl( '/auth' );
    });
  }

  menuClick() {
    this.fineshed.next(false);
    this.localSt.setItem('SELECTED_MENU',  {
      label: 'Profil',
      icon: 'ni ni-single-02',
      url: '#/dashboard/admin/profile',
      role: ROLE_ADMIN,
      niveau: 2,
      children: []
    }).subscribe(resp => {
      this.menuService.selectedItemMenu.next( {
        label: 'Profil',
        icon: 'ni ni-single-02',
        url: '#/dashboard/admin/profile',
        role: ROLE_ADMIN,
        niveau: 2,
        children: []
      });
      this.fineshed.next(true);
    });
    this.fineshed.subscribe(value => {
        if (value) {
          this.localSt.setItem('SELECTED_MENU_SHOWN', {menu: '', submenu: 'collapseExample0'}).subscribe(resp => {
            this.menuService.selectedmenuShownMenu.next({
              menu: '#/dashboard/admin/profile' +
                '' +
                '', submenu: '#/dashboard/admin/profile'
            });
            this.router.navigateByUrl('/dashboard/admin/profile');
          });
        }
      }
    );
   }
}
