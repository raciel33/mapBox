import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaComponent } from './components/mapa/mapa.component';

//Para los sockets
import { SocketIoModule } from 'ngx-socket-io';
import { enviroment } from 'src/enviroments/enviroment';

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(enviroment.socketConfig),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
