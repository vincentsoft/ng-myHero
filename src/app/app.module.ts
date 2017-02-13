import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { HeroService } from './hero.service';
import { AppComponent } from './main/app.component';
import { HeroDetailComponent } from './detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnimationComponent } from './animation/animation.component';
import { TabComponent } from './tab/tab.component';

@NgModule({
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    NgxDatatableModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    AnimationComponent,
    TabComponent
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
}) export class AppModule {
};
