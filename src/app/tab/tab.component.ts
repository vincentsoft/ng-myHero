import { Component } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-live-tab',
  templateUrl: 'tab.component.html'
}) export class TabComponent {
  isActive = false;
  rows: any[] = [];
  cols: any = ['name', 'gender', 'company'];
  constructor(private heroService: HeroService) {
    this.fetch(
      (data) => {
        this.rows = data.map(
          (jAry) => {
            jAry.updated = Date.now();
            return jAry;
          }
        );
      }
    );
    heroService.subjectTab.subscribe(
      (idx) => { this.doActive(idx === 3); }
    );
  };
  fetch(cb: any): void {
    const req = new XMLHttpRequest();
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.open('GET', `assets/company.json`);
    req.send();
  };
  doActive(IsActive: boolean) {
    this.isActive = IsActive;
    if (IsActive) {
      setTimeout(this.updateRandom.bind(this), 50);
    }
  };
  randomNum(start: number, end: number): number {
    return Math.floor(Math.random() * end) + start;
  };
  updateRandom() {
    if (this.rows.length) {
      const prop = this.cols[this.randomNum(0, 3)];
      const row = this.rows[this.randomNum(0, 5)];
      row[prop] = this.rows[this.randomNum(0, 100)][prop];
      row.updated = Date.now();
      // console.log(row);
      if (this.isActive) {
        setTimeout(this.updateRandom.bind(this), 50);
      }
    }
  };
}
