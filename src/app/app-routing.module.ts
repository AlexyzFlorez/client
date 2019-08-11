import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PagesComponent } from './components/pages/pages.component';
import { CalendarioComponent } from './components/pages/calendario/calendario.component';
import { RegistrarEventoComponent } from './components/pages/registrar-evento/registrar-evento.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';
import { EventosComponent } from './components/pages/eventos/eventos.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { MisEventosComponent } from './components/pages/mis-eventos/mis-eventos.component';
import { EvidenciasComponent } from './components/pages/evidencias/evidencias.component';
import { SubirEvidenciasComponent } from './components/pages/subir-evidencias/subir-evidencias.component';
import { EventoComponent } from './components/pages/evento/evento.component';
import { EditarEventoComponent } from './components/pages/editar-evento/editar-evento.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/calendario',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PagesComponent,
    children:
    [
      {
        path: 'calendario',
        component: CalendarioComponent
      },
      {
        path: 'registrar-evento',
        component: RegistrarEventoComponent
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'evento',
        component: EventoComponent
      },
      {
        path: 'eventos',
        component: EventosComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'mis-eventos',
        component: MisEventosComponent
      },
        {
        path: 'editar-evento',
        component: EditarEventoComponent
      },
      {
        path: 'evidencias',
        component: EvidenciasComponent
      },
      {
        path: 'subir-evidencias',
        component: SubirEvidenciasComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'page-not-found',
    component: NopagefoundComponent
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
