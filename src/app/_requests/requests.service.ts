import { Injectable } from '@angular/core';
import {catchError, concatMap, from, Observable, pluck, reduce, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private apiUrl = "https://pokeapi.co/api/v2/"

  constructor(private httpClient: HttpClient
  ) {}

  public getPokemonList(limit: number, offset: number) {
    return this.getRequest(this.apiUrl + `pokemon/?limit=${limit}&offset=${offset}`).pipe(
      pluck('results'),
      // tap((element: any) => console.log(element)),
      concatMap((elements: {name: string, url: string}[]) =>
      from(elements).pipe(
        concatMap((element: { name: string, url: string }) =>
          this.getRequest(element.url)
      ))
      ),
      reduce((acc, curr) => acc.concat(curr), [])
    )
  }

  private getRequest(url: string, options?: any): Observable<any> {
    return this.httpClient.get(url, options).pipe(
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
