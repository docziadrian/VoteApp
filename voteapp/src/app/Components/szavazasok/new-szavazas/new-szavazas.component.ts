import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../Services/api.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../Services/alert.service';

@Component({
  selector: 'app-new-szavazas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-szavazas.component.html',
  styleUrl: './new-szavazas.component.css',
})
export class NewSzavazasComponent {
  newVoteName: string = '';

  ujSzavazas() {
    // Validáljunk
    if (this.newVoteName.length > 1) {
      // Adat eloallitasa
      var data = {
        title: this.newVoteName,
      };
      this.api.createPoll(data).subscribe({
        next: (data: any) => {
          this.alertService.setAlert('Sikeres létrehozás!', 'success');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        },
        error: (error) => console.log(error), //TODO: ALERT!
      });
    }
  }

  constructor(
    private api: ApiService,
    private router: Router,
    private alertService: AlertService,
  ) {}
}
