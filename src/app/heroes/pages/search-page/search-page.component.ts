import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent implements OnInit  {

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public filteredOptions: Observable<Hero[]> | undefined;
  public selectedHero?: Hero;

  constructor( private heroesService: HeroesService){}

  ngOnInit(): void {
    this.filteredOptions = this.searchInput.valueChanges.pipe(
      startWith(''),
      map(value => {
        const filterValue = (typeof value === 'string')? value.toLowerCase(): '';
        return this.heroes.filter(option => option.superhero.toLowerCase().includes(filterValue));
      })
    );
  }

  searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions(value)
      .subscribe(heroes => this.heroes = heroes);

      this.filteredOptions = this.searchInput.valueChanges.pipe(
        startWith(this.searchInput.value),
        map(val => {
          const filterValue = (typeof val === 'string')? val.toLowerCase(): '';
          return this.heroes.filter(option => option.superhero.toLowerCase().includes(filterValue));
        })
      );

    console.log(this.heroes);
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent): void {
    if(!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;

  }

  clearSearch(): void {
    this.searchInput.setValue('');
    this.searchHero();
  }

}
