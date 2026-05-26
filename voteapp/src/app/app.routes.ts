import { Routes } from '@angular/router';
import { OsszesSzavazasComponent } from './Components/szavazasok/osszes-szavazas/osszes-szavazas.component';
import { ViewSzavazasComponent } from './Components/szavazasok/view-szavazas/view-szavazas.component';
import { NewSzavazasComponent } from './Components/szavazasok/new-szavazas/new-szavazas.component';
import { SzavazasEredmenyeiComponent } from './Components/szavazasok/szavazas-eredmenyei/szavazas-eredmenyei.component';

export const routes: Routes = [
  {
    path: '',
    component: OsszesSzavazasComponent,
  },
  {
    path: 'szavazas/:id',
    component: ViewSzavazasComponent,
  },
  {
    path: 'szavazas/eredmenyek/:id',
    component: SzavazasEredmenyeiComponent,
  },
  {
    path: 'ujszavazas',
    component: NewSzavazasComponent,
  },
];
