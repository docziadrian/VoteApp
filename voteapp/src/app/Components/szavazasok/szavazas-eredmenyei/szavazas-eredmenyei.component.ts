import { Component, OnChanges, OnInit } from '@angular/core';
import { ApiService } from '../../../Services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-szavazas-eredmenyei',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './szavazas-eredmenyei.component.html',
  styleUrl: './szavazas-eredmenyei.component.css',
})
export class SzavazasEredmenyeiComponent implements OnInit {
  id: null | number = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  szavazasEredmenyei: any = [];

  osszesSzavazas = 0;

  ngOnInit(): void {
    // ID kiszedés
    const url = this.router.url;
    const id = url.split('/').pop();
    if (id) {
      const parseId = parseInt(id);
      this.id = parseId;
    }

    // EREDMÉNYEK LEKÉRDEZÉSE
    let adatok: number = 0;
    this.apiService.getPollStats(this.id!).subscribe({
      next: (data: any) => {
        this.szavazasEredmenyei = data;
        console.log(data);
        let data_length = data.length;
      },
      error: (error) => console.log(error), //TODO: ALERT!
    });

    console.log(adatok);
  }
}
