import { Component } from '@angular/core';
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
export class MainwindowComponent {

  showFiller = true;
  toggle1: boolean = true;
  toggle2: boolean = false;

  constructor(private router:Router,private ss:StorageService) {
  }

  logout() {
    this.ss.logout();
    this.router.navigateByUrl("login");
  }
}
