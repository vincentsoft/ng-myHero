import { Component } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-live-tab',
  templateUrl: 'tab.component.html',
  styles: [`
button:hover {
    background-color: #cfd8dc;
}
button:disabled {
    background-color: #eee;
    color: #ccc;
    cursor: auto;
}`]
}) export class TabComponent {
  active = false;
  btnXStart = true;
  btnXStop = false;
  rows: any[] = [];
  cols: any = ['name', 'gender', 'company'];

  constructor(private heroService: HeroService) {
    heroService.subjectTab.subscribe((idx) => {
      if (idx === 3) {
        this.start();
      } else {
        this.stop();
      }
    }
    );
    this.fetch((data) => {
      this.rows = data.map(jAry => {
        jAry.updated = Date.now();
        return jAry;
      });
    });
  }

  randomNum(start: number, end: number): number {
    return Math.floor(Math.random() * end) + start;
  }

  start() {
    this.btnXStart = true;
    this.btnXStop = false;
    this.active = true;
    setTimeout(this.updateRandom.bind(this), 50);
  }

  stop() {
    this.active = false;
    this.btnXStart = false;
    this.btnXStop = true;
  }

  updateRandom() {
    if (this.rows.length) {
      const prop = this.cols[this.randomNum(0, 3)];
      const row = this.rows[this.randomNum(0, 5)];
      row[prop] = this.rows[this.randomNum(0, 100)][prop];
      row.updated = Date.now();
      // console.log(row);
      if (this.active) {
        setTimeout(this.updateRandom.bind(this), 50);
      }
    }
  }

  fetch(cb: any): void {
    const req = new XMLHttpRequest();
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.open('GET', `assets/company.json`);
    req.send();
  }
}
