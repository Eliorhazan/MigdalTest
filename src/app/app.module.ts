import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { GarageService } from './services/garage.service';
import { HttpClientModule } from '@angular/common/http';

import { loaderComponent } from './components/loader.component';
import { HebalphabeticallyPipe } from './pipes/Hebalphabetically.pipe';
import { AreaComboComponent } from './components/area-combo.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    loaderComponent,
    AreaComboComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [GarageService,HebalphabeticallyPipe],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule { }
