import {Component, Inject} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any) {
  }

}
