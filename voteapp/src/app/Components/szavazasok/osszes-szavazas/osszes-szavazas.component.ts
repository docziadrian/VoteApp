import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../Services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-osszes-szavazas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './osszes-szavazas.component.html',
  styleUrl: './osszes-szavazas.component.css',
})
export class OsszesSzavazasComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  allSzavazasok: any = [];

  ngOnInit(): void {
    this.apiService.getPolls().subscribe({
      next: (data) => {
        this.allSzavazasok = data;
        console.log(data);
      },
      error: (error) => console.log(error), //TODO: ALERT!
    });
  }

  megnyitas(id: number) {
    this.router.navigate([`/szavazas/${id}`]);
  }

  eredmenyek(id: number) {
    //szavazas/eredmenyek/:id
    this.router.navigate([`/szavazas/eredmenyek/${id}`]);
  }

  szavazasTorlese(id: number) {
    // Kitörönyöljük az adatot
    this.apiService.deletePoll(id).subscribe({
      next: (data: any) => {
        window.location.reload(); // a router atnavigalasa nem segit
      },
      error: (error) => console.log(error), //TODO: ALERT!
    });
  }
}
