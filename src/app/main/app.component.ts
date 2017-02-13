import { Component } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  moduleId: module.id,
  selector: 'app-hero',
  templateUrl: 'app.component.html',
  // styleUrls: ['./app.component.css']
}) export class AppComponent {
  title = 'Tour of Heroes';
  constructor(private heroService: HeroService) {
  };
  selectChange($event) {
    this.heroService.subjectTab.next($event.index);
  };
};
