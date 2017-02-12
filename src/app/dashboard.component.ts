import { Component } from '@angular/core';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
  // styleUrls: ['./dashboard.component.css']
}) export class DashboardComponent {
  selectedHero: Hero;
  constructor(private heroService: HeroService) { }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.heroService.showDetail(hero);
  };
}
