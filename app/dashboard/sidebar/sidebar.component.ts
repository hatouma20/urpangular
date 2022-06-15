import {ChangeDetectorRef, Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import {BehaviorSubject} from 'rxjs';
import {split} from 'ts-node';
import {ROLE_ADMIN, ROLE_USER, SELECTED_MENU, SELECTED_MENU_SHOWN} from '../../shared/constants/event';
import {AUTHENTICATION_KEY} from '../../shared/constants/local-storage-keys';
import {AuthService} from '../../shared/services/back-end/auth/auth.service';
import {CollaboratorService} from '../../shared/services/back-end/collaborator/collaborator.service';
import {LocalStorageService} from '../../shared/services/local-storage/local-storage.service';
import {MenuService} from '../../shared/services/menu/menu-service';

@Component({
  selector: 'wind-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../dash-main/dash-main.component.css', './sidebar.component.scss']
})
export class SideBarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  public menu = [];
  public currentuuid: any;
  public selectedItem: any;
  public selectedmenuShown: any  = {menu: '', submenu: ''};
  public collaboratorResult: any;
  private finished = new BehaviorSubject(null);
  constructor(private router: Router,
              private authService: AuthService,
              private sirhService: CollaboratorService,
              private localSt: LocalStorageService,
              private ref: ChangeDetectorRef,
              private menuService: MenuService,
              private logger: NGXLogger) {
    // this.localSt.getItem('SELECTED_MENU').subscribe(resp => {
    //     if (resp === undefined) {
    //       this.menuService.selectedItemMenu.next({
    //         label: 'Profil',
    //         icon: 'ni ni-single-02',
    //         url: '#/dashboard/admin/profile',
    //         role: ROLE_ADMIN,
    //         niveau: 2,
    //         children: []
    //       });
    //       this.menuService.selectedItemMenu.subscribe(_ => {
    //         this.selectedItem = this.menuService.selectedItemMenu.getValue();}
    //       );
    //     } else {console.log(resp);
    //             this.menuService.selectedItemMenu.next(resp);
    //             this.menuService.selectedItemMenu.subscribe(_ => {
    //             this.selectedItem = this.menuService.selectedItemMenu.getValue();}
    //       ); }
    //   }
    // );
    // this.localSt.getItem('SELECTED_MENU_SHOWN').subscribe(resp => {
    //     if (resp === undefined) {
    //       this.menuService.selectedmenuShownMenu.next( {menu: '', submenu: 'collapseExample0'});
    //       this.menuService.selectedmenuShownMenu.subscribe(_ => {
    //           this.selectedmenuShown = this.menuService.selectedmenuShownMenu.getValue();
    //         }
    //       );
    //       document.getElementById('' + this.selectedmenuShown.submenu).classList.add('show');
    //       document.getElementById('' + this.selectedmenuShown.menu).classList.add('show');
    //     } else {
    //       if (this.selectedItem.niveau > 1) {
    //         console.log(resp);
    //         this.menuService.selectedmenuShownMenu.next(resp);
    //         this.menuService.selectedmenuShownMenu.subscribe(_ => {
    //             this.selectedmenuShown = this.menuService.selectedmenuShownMenu.getValue();
    //           }
    //         );
    //         document.getElementById('' + this.selectedmenuShown.submenu).classList.add('show');
    //         document.getElementById('' + this.selectedmenuShown.menu).classList.add('show');
    //       }
    //     }
    //   }
    // );
  }

  ngOnInit() {
    this.finished.next(false);
    this.finished.subscribe(value => {
      if (value) {
        this.localSt.getItem('SELECTED_MENU').subscribe(resp => {
          if (resp === undefined) {
            this.menuService.selectedItemMenu.next({
              label: 'Profil',
              icon: 'ni ni-single-02',
              url: '#/dashboard/admin/profile',
              role: ROLE_ADMIN,
              niveau: 2,
              children: []
            });
            this.menuService.selectedItemMenu.subscribe(_ => {
              this.selectedItem = this.menuService.selectedItemMenu.getValue(); }
            );
          } else {console.log(resp);
                  this.menuService.selectedItemMenu.next(resp);
                  this.menuService.selectedItemMenu.subscribe(_ => {
              this.selectedItem = this.menuService.selectedItemMenu.getValue(); }
            );
          }
        }
      );
        this.localSt.getItem('SELECTED_MENU_SHOWN').subscribe(resp => {
            if (resp === undefined) {
              this.menuService.selectedmenuShownMenu.next( {menu: '', submenu: 'collapseExample0'});
              this.menuService.selectedmenuShownMenu.subscribe(_ => {
                  this.selectedmenuShown = this.menuService.selectedmenuShownMenu.getValue();
                }
              );
              document.getElementById('' + this.selectedmenuShown.submenu)?.classList.add('show');
              document.getElementById('' + this.selectedmenuShown.menu)?.classList.add('show');
            } else {
              if (this.selectedItem.niveau > 1) {
                console.log(resp);
                this.menuService.selectedmenuShownMenu.next(resp);
                this.menuService.selectedmenuShownMenu.subscribe(_ => {
                    this.selectedmenuShown = this.menuService.selectedmenuShownMenu.getValue();
                  }
                );
                document.getElementById('' + this.selectedmenuShown.submenu)?.classList.add('show');
                document.getElementById('' + this.selectedmenuShown.menu)?.classList.add('show');
              }
            }
          }
        ); }
    });
    if (this.authService.connectedUser != null) {
      this.currentuuid = this.authService.connectedUser.uuid;
    }
    if (this.sirhService.uuid != null) {
      this.currentuuid = this.sirhService.uuid.access_id;
    }
    this.sirhService.getCollaborator(this.currentuuid).subscribe(response => {
      this.collaboratorResult = response;
      this.menu = [];
      this.menuService.menu.forEach(elt => {
          if (elt.role === this.authService.role || (this.sirhService.uuid && this.sirhService.uuid.authorities === elt.role)) {
            this.menu.push(
              {
                label: elt.label,
                icon: elt.icon,
                url: elt.url,
                role: elt.role,
                niveau: elt.niveau,
                children: elt.children
              });
          }
        }
      );
      this.finished.next(true);
    });
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.ref.detectChanges();
  }

  logout() {
    this.authService.logout().subscribe(response => {
      this.logger.trace('logout');
    });
    this.localSt.setItem('SELECTED_MENU',  {
      label: 'Profil',
      icon: 'ni ni-single-02',
      url: '#/dashboard/admin/profile',
      role: ROLE_ADMIN,
      niveau: 2,
      children: []
    }).subscribe(_ => {
      });
    this.localSt.setItem('SELECTED_MENU_SHOWN', {menu: '', submenu: 'collapseExample0'}).subscribe(_ => {
        this.menuService.selectedmenuShownMenu.next({menu: '#/dashboard/admin/profile' +
            '' +
            '', submenu: '#/dashboard/admin/profile'});
        this.selectedmenuShown = this.menuService.selectedmenuShownMenu.getValue();
        document.getElementById('' + this.selectedmenuShown.submenu)?.classList.add('show');
        document.getElementById('' + this.selectedmenuShown.menu)?.classList.add('show');
      });
    this.sirhService.uuid = null;
    this.localSt.setItem( AUTHENTICATION_KEY, '' ).subscribe( _ => {
      this.router.navigateByUrl( '/auth' );
    });
  }
  listClick(newValue, id, j) {
    this.menuService.selectedItemMenu.next(newValue);
    this.selectedItem = this.menuService.selectedItemMenu.getValue();
    this.localSt.setItem( SELECTED_MENU, this.selectedItem ).subscribe( _ => {
      });
    if ( j === null) {
      this.menuService.selectedmenuShownMenu.next( {menu: '', submenu: 'collapseExample' + id});
      this.selectedmenuShown = this.menuService.selectedmenuShownMenu.getValue();
    } else if (j !== null) {
      this.menuService.selectedmenuShownMenu.next({menu: '2collapseExample' + id + '' + j, submenu:  'collapseExample' + id});
      this.selectedmenuShown = this.menuService.selectedmenuShownMenu.getValue();
    }
    this.localSt.setItem( SELECTED_MENU_SHOWN, this.selectedmenuShown ).subscribe( _ => {
    });
  }
}
