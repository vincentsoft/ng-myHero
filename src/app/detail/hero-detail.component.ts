import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  moduleId: module.id,
  selector: 'app-hero-detail',
  templateUrl: 'hero-detail.component.html'
}) export class HeroDetailComponent {
  @Input() heroX: Hero = { 'id': null, 'name': '' };
  constructor(private heroService: HeroService) {
    heroService.subjectHeroDetail.subscribe((phero: Hero) => { this.heroX = phero; });
  };
  select() {
    this.heroService.select();
  };
  insert() {
    this.heroService.insert(this.heroX.name);
  };
  update() {
    this.heroService.update(this.heroX);
  };
  delete() {
    this.heroService.delete(this.heroX);
  };
}
