import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RoleGuardService } from 'src/app/shared/guards/roleGuard.service';
import { ProductosComponent } from './productos/productos.component';
import { AtencionColaComponent } from './atencion-cola/atencion-cola.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'atencionturno',
        pathMatch: 'full',
      },
      {
        path: 'atencionturno',
        component: AtencionColaComponent,
      },
      {
        path: 'usuarios',
        // canActivate: [RoleGuardService],
        // data: { expectedRole: 'ADMINISTRADOR' },
        component: UsuarioComponent,
      }
    ],
  },
  ,
  {
    path: '**',
    redirectTo: 'productos',
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
