import { Component, Input, OnChanges, SimpleChanges }  from '@angular/core';
import {Pokemon} from "../../../_interfaces/pokemon";

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnChanges {
  @Input() pokemonData: Pokemon;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemonData']) {
      console.log(this.pokemonData);
    }
  }
  getColorByType(type: string): string {
    return 'type--' + type;
  }
}
