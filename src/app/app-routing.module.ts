import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PagesComponent } from './components/pages/pages.component';
import { CalendarioComponent } from './components/pages/calendario/calendario.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';
import { EventosComponent } from './components/pages/eventos/eventos.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { MisEventosComponent } from './components/pages/mis-eventos/mis-eventos.component';
import { EventoComponent } from './components/pages/evento/evento.component';
import { EditarEventoComponent } from './components/pages/editar-evento/editar-evento.component';
import { RestablecerPasswordComponent } from './components/restablecer-password/restablecer-password.component';
import { EventosMemoriaComponent } from './components/pages/eventos-memoria/eventos-memoria.component';

//GUARDS
import { LoginGuard } from './services/guards/login.guard';
import { EditorGuard } from './services/guards/editor.guard';
import { AdminGuard } from './services/guards/admin.guard';
import { EvidenciasComponent } from './components/pages/evidencias/evidencias.component';


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
          path: 'eventos/:id',
          component: EventosComponent
        },
        {
          path: 'evento/:id',
          component: EventoComponent
        },
        {
          path: 'usuarios',
          component: UsuariosComponent,
          canActivate: [LoginGuard, AdminGuard]
        },
        {
          path: 'eventos-en-memoria',
          component: EventosMemoriaComponent,
          canActivate: [LoginGuard, AdminGuard]
        },
        {
          path: 'perfil/:id',
          component: PerfilComponent,
          canActivate: [LoginGuard, EditorGuard]
        },
        {
          path: 'mis-eventos',
          component: MisEventosComponent,
          canActivate: [LoginGuard, EditorGuard]
        },
        {
          path: 'editar-evento/:id',
          component: EditarEventoComponent,
          canActivate: [LoginGuard, EditorGuard]
        },
        {
          path: 'evidencias/:id',
          component: EvidenciasComponent,
          canActivate: [LoginGuard, EditorGuard]
        },
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
    path: 'restablecer-password/:codigo',
    component: RestablecerPasswordComponent
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
