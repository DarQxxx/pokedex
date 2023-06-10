import {Injectable, Input, OnInit} from '@angular/core';
import {RequestsService} from "../_requests/requests.service";

@Injectable({
  providedIn: 'root'
})
export class PokemonsService implements OnInit{
  constructor(private requests : RequestsService) {

  }

  ngOnInit() {

  }

  getPokemonsData(limit: number, offset: number){
    return this.requests.getPokemonList(limit, offset)
  }
}
