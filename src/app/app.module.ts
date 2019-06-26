import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { PagesComponent } from './components/pages/pages.component';
import { CalendarioComponent } from './components/pages/calendario/calendario.component';
import { RegistrarEventoComponent } from './components/pages/registrar-evento/registrar-evento.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';
import { EventosComponent } from './components/pages/eventos/eventos.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { MisEventosComponent } from './components/pages/mis-eventos/mis-eventos.component';
import { EventoComponent } from './components/pages/evento/evento.component';
import { EditarEventoComponent } from './components/pages/editar-evento/editar-evento.component';
import { EvidenciasComponent } from './components/pages/evidencias/evidencias.component';
import { SubirEvidenciasComponent } from './components/pages/subir-evidencias/subir-evidencias.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NopagefoundComponent,
    SidebarComponent,
    HeaderComponent,
    PagesComponent,
    CalendarioComponent,
    RegistrarEventoComponent,
    UsuariosComponent,
    EventosComponent,
    PerfilComponent,
    MisEventosComponent,
    EventoComponent,
    EditarEventoComponent,
    EvidenciasComponent,
    SubirEvidenciasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
