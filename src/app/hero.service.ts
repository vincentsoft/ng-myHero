import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { Subject } from 'rxjs/Subject';
import { Hero } from './hero';

@Injectable(
) export class HeroService {
  ws: any;
  heroes: Hero[];
  subjectHeroDetail = new Subject<Hero>();
  tabactive = 1;
  subjectTab = new Subject();
  constructor() {
    this.ws = WebSocketSubject.create('ws://127.0.0.1/jHeroes');
    this.ws.subscribe((o) => {
      // console.log('HeroService.recv: ' + JSON.stringify(o));
      if (o.result == null) { return; };
      switch (o.method) {
        case 'select':
          this.heroes = o.result as Hero[];
          break;
        case 'insert':
          this.heroes = this.heroes.concat(o.result as Hero[]);
          break;
        case 'update':
          const heroN = (o.result as Hero[])[0];
          const heroO = this.heroes.find((item: Hero) => item.id === heroN.id);
          if (heroO != null) { heroO.name = heroN.name; }
          break;
        case 'delete':
          const heroD = (o.result as Hero[])[0];
          this.heroes = this.heroes.filter((hero: Hero) => hero.id !== heroD.id);
          break;
        default:
      }
    });
    this.select();
  }
  send(text: string) {
    this.ws.next(text);
  }
  showDetail(hero: Hero) {
    this.subjectHeroDetail.next(hero);
  }
  select() {
    this.send(`{"jsonrpc":"2.0","method":"select","params":{},"id":1}`);
  }
  select_id(id: number) {
    this.send(`{"jsonrpc":"2.0","method":"select","params":{"id":${id}},"id":1}`);
  }
  insert(name: string) {
    this.send(`{"jsonrpc":"2.0","method":"insert","params":{"name":"${name}"},"id":1}`);
  }
  update(hero: Hero) {
    this.send(`{"jsonrpc":"2.0","method":"update","params":{"id":${hero.id},"name":"${hero.name}"},"id":1}`);
  }
  delete(hero: Hero) {
    this.send(`{"jsonrpc":"2.0","method":"delete","params":{"id":${hero.id}},"id":1}`);
  }
  // private handleError (error: Response | any) {
  //     // In a real world app, we might use a remote logging infrastructure
  //     let errMsg: string;
  //     if (error instanceof Response) {
  //         const body = error.json() || '';
  //         const err = body.error || JSON.stringify(body);
  //         errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //     } else {
  //         errMsg = error.message ? error.message : error.toString();
  //     }
  //     console.error(errMsg);
  //     return Observable.throw(errMsg);
  // }
}
