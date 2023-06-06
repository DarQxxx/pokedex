import {Component, OnInit} from '@angular/core';
import {RequestsService} from "../../_requests/requests.service";
import {PokemonsService} from "../../_services/pokemons.service";
import {Pokemon} from "../../_interfaces/pokemon";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit{
  public pokemonArray: Pokemon[];
  constructor(private pokemonsService: PokemonsService) {
  }

  ngOnInit() {
  this.pokemonsService.getPokemonsData(151, 0).subscribe(
    response => {
      this.pokemonArray = response;
      // console.log(response)
    },
    error => {
      console.error('Błąd podczas pobierania danych:', error);
      console.log("cos poszlo nie tak")
    }
  );
  }
}
