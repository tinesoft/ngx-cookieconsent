import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import sdk from '@stackblitz/sdk';
import { PlaygroundComponent } from './playground/playground.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'ngc-demo-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [PlaygroundComponent, FaIconComponent]
})
export class HomeComponent implements OnInit {

  constructor(private titleService:Title) { }

  ngOnInit() {
    this.titleService.setTitle('Home | ngx-cookieconsent');
  }

  editOnStackBlitz() {
    sdk.openGithubProject('tinesoft/ngx-cookieconsent/tree/develop/apps/demo');
  }
}
