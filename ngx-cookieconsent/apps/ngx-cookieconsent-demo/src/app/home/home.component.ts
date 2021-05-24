import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import sdk from '@stackblitz/sdk';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleService:Title) { }

  ngOnInit() {
    this.titleService.setTitle('Home | ngx-cookieconsent');
  }

  editOnStackBlitz() {
    sdk.openGithubProject('tinesoft/ngx-cookieconsent/tree/master/demo');
  }
}
