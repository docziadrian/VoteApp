import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../Services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  ) {}

  pollOpciok: any = [];
  kerdes: any = null;

  newOptionName: string = '';

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
          window.location.reload();
        },
        error: (error) => console.log(error), //TODO: ALERT!
      });
    }
  }

  opcioTorles(id: number) {
    // Kitörönyöljük az adatot
    this.apiService.deleteOption(id).subscribe({
      next: (data: any) => {
        window.location.reload();
      },
      error: (error) => console.log(error), //TODO: ALERT!
    });
  }

  opcioVote(id: number) {
    // Küldjünk egy szavazatot a pullra
    var data = {
      option_id: id,
    };
    this.apiService.createVote(data).subscribe({
      next: (data: any) => {
        alert('Kösz.');
      },
      error: (error) => console.log(error), //TODO: ALERT!
    });
  }

  eredmenyekMegtekintese() {
    this.router.navigate([`/szavazas/eredmenyek/${this.id}`]);
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
      error: (error) => console.log(error), //TODO: ALERT!
    });

    this.apiService.getPollOptions(this.id!).subscribe({
      next: (data: any) => {
        this.pollOpciok = data;
        console.log(data.name);
      },
      error: (error) => console.log(error), //TODO: ALERT!
    });
  }
}
