import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexComponent } from './main/pokedex/pokedex.component';
import {HttpClientModule} from "@angular/common/http";
import { PokemonComponent } from './main/pokedex/pokemon/pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    PokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
