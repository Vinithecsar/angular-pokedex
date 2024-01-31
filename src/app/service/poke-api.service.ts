import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface ApiPokemons {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string; status: ApiPokemonDetails }[];
}

export interface ApiPokemonDetails {
  id: number;
  types: { slot: number; type: { name: string; url: string } }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }[];
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  constructor(private http: HttpClient) {}

  private url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151';

  get apiListAllPokemons(): Observable<ApiPokemons> {
    return this.http.get<ApiPokemons>(this.url).pipe(
      tap((res) => res),
      tap((res) => {
        res.results.forEach((resPokemons) => {
          this.apiGetPokemons(resPokemons.url).subscribe({
            next: (res) => (resPokemons.status = res),
          });
        });
      })
    );
  }

  public apiGetPokemons(url: string) {
    return this.http.get<any>(url);
  }
}
