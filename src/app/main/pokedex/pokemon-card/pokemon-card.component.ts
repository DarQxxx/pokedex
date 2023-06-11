import { Component, Input, OnChanges, SimpleChanges }  from '@angular/core';
import {Pokemon} from "../../../_interfaces/pokemon";
import {colors} from "../../../../assets/colors";
@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnChanges {
  @Input() pokemonData: Pokemon;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemonData']) {
    }
  }
  getGradientByType(types: any[]): any {
    // @ts-ignore
    console.log(colors[types[0].type.name]+ "00")
    if (types.length - 1)
      { // @ts-ignore
        return {'background': 'linear-gradient(to bottom,' + colors[types[0].type.name] + ' 28% ,' + colors[types[1].type.name] +')'};
      }
    else
      { // @ts-ignore
        return {'background': 'linear-gradient(to top,' + colors[types[0].type.name] + ' 26% ,' + colors[types[0].type.name]+ "88" +')'}
      }
  }

  getColorByType(type: string): string {
    return 'type--' + type;
  }
}
