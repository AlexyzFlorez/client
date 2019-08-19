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


//GUARDS
import { LoginGuard } from './services/guards/login.guard';
import { EditorGuard } from './services/guards/editor.guard';
import { AdminGuard } from './services/guards/admin.guard';

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
        component: RegistrarEventoComponent,
        canActivate:[LoginGuard,EditorGuard]
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate:[LoginGuard,AdminGuard]
      },
      {
        path: 'evento',
        component: EventoComponent,
        canActivate:[LoginGuard,EditorGuard]
      },
      {
        path: 'eventos',
        component: EventosComponent
      },
      {
        path: 'perfil/:id',
        component: PerfilComponent,
        canActivate:[LoginGuard,EditorGuard]
      },
      {
        path: 'mis-eventos',
        component: MisEventosComponent,
        canActivate:[LoginGuard,EditorGuard]
      },
        {
        path: 'editar-evento',
        component: EditarEventoComponent,
        canActivate:[LoginGuard,EditorGuard]
      },
      {
        path: 'evidencias',
        component: EvidenciasComponent,
        canActivate:[LoginGuard,EditorGuard]
      },
      {
        path: 'subir-evidencias',
        component: SubirEvidenciasComponent,
        canActivate:[LoginGuard,EditorGuard]
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
