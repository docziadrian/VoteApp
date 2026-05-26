import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alertMsg = '';
  alertType: 'error' | 'success' = 'success';

  setAlert(uzenet: string, type: 'success' | 'error') {
    this.alertMsg = uzenet;
    this.alertType = type;
    setTimeout(() => {
      this.alertMsg = '';
    }, 2000);
  }

  constructor() {}
}
