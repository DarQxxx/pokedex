import { Injectable } from '@angular/core';
import {catchError, concatMap, from, map, Observable, pluck, reduce, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Pokemon} from "../_interfaces/pokemon";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private apiUrl = "https://pokeapi.co/api/v2/"

  constructor(private httpClient: HttpClient
  ) {}

  public getPokemonList(limit: number, offset: number): Observable<Pokemon[]> {
    return this.getRequest(this.apiUrl + `pokemon/?limit=${limit}&offset=${offset}`).pipe(
      pluck('results'),
      // tap((element: any) => console.log(element)),
      concatMap((elements: {name: string, url: string}[]) =>
      from(elements).pipe(
        concatMap((element: { name: string, url: string }) =>
          this.getRequest(element.url)
      ))
      ),
      reduce((acc, curr) => acc.concat(curr), []),
      map((data: any[]) => {
        return data.map(item => ({
          name: item.name,
          id: item.id,
          image: item.sprites.front_default,
          // image: 'https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/' + item.id + '.svg',
          types: item.types,
          stats: item.stats
        }));
      })
    )
  }


  private getRequest(url: string, options?: any): Observable<any> {
    return this.httpClient.get<any[]>(url, options).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Wystąpił błąd.';
        if (error.error instanceof ErrorEvent) {
          // Błąd po stronie klienta
          errorMessage = `Wystąpił błąd: ${error.error.message}`;
        } else {
          // Błąd po stronie serwera
          errorMessage = `Kod błędu: ${error.status}, wiadomość: ${error.message}`;
        }
        return throwError(errorMessage);
      })
    )
  }
}
