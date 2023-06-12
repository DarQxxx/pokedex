import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {RequestsService} from "../../_requests/requests.service";
import {PokemonsService} from "../../_services/pokemons.service";
import {Pokemon} from "../../_interfaces/pokemon";
import {Subject, switchMap, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit, OnDestroy{
  pokemonArray: Pokemon[] = [];
  page: number = 0;
  loading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private pokemonsService: PokemonsService) {
  }

  ngOnInit() {
  this.loadMorePokemons();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (!this.loading && windowHeight + scrollTop >= documentHeight) {
      this.loadMorePokemons();
    }
  }

  loadMorePokemons(){
    this.loading = true;
    this.pokemonsService.getPokemonsData(300, (this.page) * 300)
      .pipe(takeUntil(this.destroy$),
        tap((response: any[]) => {
          this.pokemonArray = [...this.pokemonArray, ...response];
        })
      )
      .subscribe(() => {
          this.loading = false;
          this.page++;
        },
        () => {
          this.loading = false
        });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
