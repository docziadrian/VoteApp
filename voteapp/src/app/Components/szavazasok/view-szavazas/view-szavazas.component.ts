import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../Services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../Services/alert.service';

@Component({
  selector: 'app-view-szavazas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-szavazas.component.html',
  styleUrl: './view-szavazas.component.css',
})
export class ViewSzavazasComponent implements OnInit {
  id: null | number = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService,
  ) {}

  pollOpciok: any = [];
  kerdes: any = null;

  newOptionName: string = '';

  // SLIDERHEZ
  adatokSzama = 0;

  ujOpcio() {
    // VALIDÁCIÓ
    if (this.newOptionName.length >= 2) {
      // DATA ELŐÁLLÍTÁSA
      /*
      "poll_id": 3,
      "name": "Igen :)"
    */
      var data = {
        poll_id: this.id,
        name: this.newOptionName,
      };
      this.apiService.createOption(data).subscribe({
        next: (data: any) => {
          setTimeout(() => {
            this.alertService.setAlert('Sikeresen létrehoztad!', 'success');
          }, 2000);
          window.location.reload();
        },
        error: (error) => {
          this.alertService.setAlert(
            'Hiba lépett fel a szavazás közben!',
            'error',
          );
        },
      });
    }
  }

  opcioTorles(id: number) {
    // Kitörönyöljük az adatot
    this.apiService.deleteOption(id).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          this.alertService.setAlert('Sikeresen törölted!', 'success');
        }, 2000);
        window.location.reload();
      },
      error: (error) => {
        this.alertService.setAlert(
          'Hiba lépett fel a szavazás közben!',
          'error',
        );
      },
    });
  }

  opcioVote(id: number) {
    // Küldjünk egy szavazatot a pullra
    var data = {
      option_id: id,
    };
    this.apiService.createVote(data).subscribe({
      next: (data: any) => {
        this.alertService.setAlert('Sikeresen szavaztál!', 'success');
        alert('Sikeresen szavaztáll.');
      },
      error: (error) => {
        this.alertService.setAlert(
          'Hiba lépett fel a szavazás közben!',
          'error',
        );
      },
    });
  }

  eredmenyekMegtekintese() {
    this.router.navigate([`/szavazas/eredmenyek/${this.id}`]);
  }

  sliderLekerdezes() {
    // Kérjük le, hogy ehhez az ID -hoz tartozva mennyi options van!
    this.apiService.getPollOptions(this.id!).subscribe({
      next: (data: any) => {
        this.adatokSzama = data.length;
        console.log('?');
        console.log(this.adatokSzama);
      },
    });
  }

  ngOnInit(): void {
    // ID kiszedés
    const url = this.router.url;
    const id = url.split('/').pop();
    if (id) {
      const parseId = parseInt(id);
      this.id = parseId;
    }

    // KÉRDÉS LESZEDÉSE
    this.apiService.getPoll(this.id!).subscribe({
      next: (data: any) => {
        this.kerdes = data[0].title;
      },
      error: (error) => {
        this.alertService.setAlert(
          'Hiba lépett fel a szavazás közben!',
          'error',
        );
      },
    });

    this.apiService.getPollOptions(this.id!).subscribe({
      next: (data: any) => {
        this.pollOpciok = data;
        this.adatokSzama = data.length;
        console.log(data.name);
      },
      error: (error) => {
        this.alertService.setAlert(
          'Hiba lépett fel a szavazás közben!',
          'error',
        );
      },
    });
  }
}
