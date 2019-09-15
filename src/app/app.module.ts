import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiSisEventService } from './services/api-sis-event.service';

//GUARDS
import { LoginGuard } from './services/guards/login.guard';
import { EditorGuard } from './services/guards/editor.guard';
import { AdminGuard } from './services/guards/admin.guard';

//COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { PagesComponent } from './components/pages/pages.component';
import { CalendarioComponent } from './components/pages/calendario/calendario.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';
import { EventosComponent } from './components/pages/eventos/eventos.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { MisEventosComponent } from './components/pages/mis-eventos/mis-eventos.component';
import { EventoComponent } from './components/pages/evento/evento.component';
import { EditarEventoComponent } from './components/pages/editar-evento/editar-evento.component';
import { EvidenciasComponent } from './components/pages/evidencias/evidencias.component';
import { SubirEvidenciasComponent } from './components/pages/subir-evidencias/subir-evidencias.component';
import { RestablecerPasswordComponent } from './components/restablecer-password/restablecer-password.component';

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
    UsuariosComponent,
    EventosComponent,
    PerfilComponent,
    MisEventosComponent,
    EventoComponent,
    EditarEventoComponent,
    EvidenciasComponent,
    SubirEvidenciasComponent,
    RestablecerPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiSisEventService,
    LoginGuard,
    AdminGuard,
    EditorGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
