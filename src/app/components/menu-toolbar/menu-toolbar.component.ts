import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menu-item'
import * as global from 'src/global';
import { TokenStorageService } from 'src/app/services/auth/token-storage.service';

@Component({
  selector: 'app-menu-toolbar',
  templateUrl: './menu-toolbar.component.html',
  styleUrls: ['./menu-toolbar.component.scss']
})
export class MenuToolbarComponent implements OnInit {

  title: string;
  roles: string[];
  isLoggedIn: boolean = false;
  showAdminBoard: boolean = false;
  username: string;

  menuItems: MenuItem[] = [
    {
      label: 'Baza produktów',
      icon: 'fastfood',
      href: '/products',
      routerLink: 'products',
      alwaysShow: true,
      onlyForLogged: false,
      onlyForAdmin: false
    },
    {
      label: 'Baza sklepów',
      icon: 'store',
      href: '/shops',
      routerLink: 'shops',
      alwaysShow: true,
      onlyForLogged: false,
      onlyForAdmin: false
    },
    {
      label: 'Listy zakupów',
      icon: 'list_alt',
      href: '/shoppingListsMenu',
      routerLink: 'shoppingListsMenu',
      alwaysShow: true,
      onlyForLogged: false,
      onlyForAdmin: false
    },
    {
      label: 'Rejestracja',
      icon: 'person_add',
      href: '/register',
      routerLink: 'register',
      alwaysShow: false,
      onlyForLogged: false,
      onlyForAdmin: false
    },
    {
      label: 'Zaloguj',
      icon: 'login',
      href: '/login',
      routerLink: 'login',
      alwaysShow: false,
      onlyForLogged: false,
      onlyForAdmin: false
    },
    {
      label: 'Panel administracyjny',
      icon: 'admin_panel_settings',
      href: '/admin',
      routerLink: 'admin',
      alwaysShow: false,
      onlyForLogged: true,
      onlyForAdmin: true
    },
    {
      label: 'Profil',
      icon: 'person',
      href: '/profile',
      routerLink: 'profile',
      alwaysShow: false,
      onlyForLogged: true,
      onlyForAdmin: false
    }
  ];

  constructor(private tokenStorageService: TokenStorageService) {
    this.title = global.APP_TITLE;

   }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
    }
  }
  
  logout(): void {
    console.log('wpadlem tu');
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}

// icons https://material.io/resources/icons/?icon=person_add&style=baseline
// tut: https://medium.com/javascript-in-plain-english/create-a-responsive-toolbar-in-angular-using-flex-layout-c6d83ff8258e
