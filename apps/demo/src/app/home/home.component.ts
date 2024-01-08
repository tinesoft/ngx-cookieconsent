import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import sdk from '@stackblitz/sdk';
import { PlaygroundComponent } from './playground/playground.component';

@Component({
    selector: 'ngc-demo-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [PlaygroundComponent]
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
