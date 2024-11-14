import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatDrawer, MatDrawerContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatTreeModule} from "@angular/material/tree";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatBadgeModule} from "@angular/material/badge";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {StorageService} from "../../core/service/auth/storage.service";
import {User} from "../../core/entity/user";

@Component({
  selector: 'app-mainwindow',
  standalone: true,
  imports: [
    MatDrawerContainer,
    MatButton,
    MatDrawer,
    RouterLink,
    RouterOutlet

  ],
  templateUrl: './mainwindow.component.html',
  styleUrl: './mainwindow.component.scss'
})
export class MainwindowComponent implements OnInit{

  showFiller = true;
  toggle1: boolean = true;
  toggle2: boolean = false;

  protected user = <User><unknown>({username: '', employee: {photo: ''}});

  ngOnInit(): void {
    const user = this.ss.getUser();
    if(user.id) this.user = user;
  }

  constructor(private router:Router,private ss:StorageService) {
  }

  logout() {
    this.ss.logout();
    this.router.navigateByUrl("login");
  }

}
