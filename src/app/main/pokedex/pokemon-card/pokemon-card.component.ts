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
    if (types.length - 1)
      {
        return {'background': 'linear-gradient(to bottom,' + colors[types[0].type.name as keyof typeof colors] + ' 28% ,' + colors[types[1].type.name as keyof typeof colors] +')'};
      }
    else
      { // @ts-ignore
        return {'background': 'linear-gradient(to top,' + colors[types[0].type.name] + ' 26% ,' + colors[types[0].type.name]+ "88" +')'}
      }
  }
  changeIdFormat(id:number){
    return '#' + id.toString().padStart(3, '0');
  }
  changeNameFormat(name:string){
    return name.split('-')[0];
}

  getColorByType(type: string): string {
    return 'type--' + type;
  }
}
