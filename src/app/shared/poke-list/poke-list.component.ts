import { Component, OnInit } from '@angular/core';
import {
  ApiPokemonDetails,
  PokeApiService,
} from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  constructor(private pokeApiService: PokeApiService) {}

  private allPokemonsDisplay!: {
    name: string;
    url: string;
    status: ApiPokemonDetails;
  }[];
  public allPokemons!: {
    name: string;
    url: string;
    status: ApiPokemonDetails;
  }[];

  public apiError = false;

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe({
      next: (res) => {
        this.allPokemonsDisplay = res.results;
        this.allPokemons = this.allPokemonsDisplay;
      },
      error: (err) => (this.apiError = true),
    });
  }

  public search(value: string) {
    const filter = this.allPokemonsDisplay.filter((res) => {
      return res.name.indexOf(value.toLowerCase()) >= 0;
      //return !res.name.indexOf(value.toLowerCase());
    });

    this.allPokemons = filter;
  }
}
