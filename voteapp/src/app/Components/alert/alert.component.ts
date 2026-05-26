import { Component } from '@angular/core';
import { AlertService } from '../../Services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  alertString: string = '';
  alertType: string = '';
  constructor(private alertService: AlertService) {}

  get alertMSG(): string {
    return (this.alertString = this.alertService.alertMsg);
  }

  get typeMSG(): string {
    return (this.alertType = this.alertService.alertType);
  }
}
