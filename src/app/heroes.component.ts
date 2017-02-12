import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  // styleUrls: ['./heroes.component.css'],
  styles: [`md-list-item:hover {background:#DDD;}`
  ]
}) export class HeroesComponent {
  selectedHero: Hero;
  constructor(private heroService: HeroService) {
  };
  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.heroService.showDetail(hero);
  };
}
