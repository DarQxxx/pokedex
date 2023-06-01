import {Component, OnInit} from '@angular/core';
import {RequestsService} from "../../_requests/requests.service";
import {PokemonsService} from "../../_services/pokemons.service";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit{
  public pokemonArray: any;
  constructor(private pokemonsService: PokemonsService) {
  }

  ngOnInit() {
  this.pokemonsService.getPokemonsData(50, 0).subscribe(
    response => {
      this.pokemonArray = response
      console.log(response)
    },
    error => {
      console.error('Błąd podczas pobierania danych:', error);
      console.log("cos poszlo nie tak")
    }
  );
  }
}
