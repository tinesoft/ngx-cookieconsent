import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';


@Component({
  selector: 'ngc-demo-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss']
})
export class GettingStartedComponent implements OnInit {

  gettingStartedContent = '';
  constructor(private titleService:Title, private http: HttpClient) { }

  ngOnInit() {
    this.titleService.setTitle('Getting Started | ngx-cookieconsent');

    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    this.http.get('https://raw.githubusercontent.com/tinesoft/ngx-cookieconsent/master/README.md', {
      headers: headers,
      responseType: 'text'
    })
    .subscribe( data =>{
      this.gettingStartedContent = data.substring(data.indexOf('## Dependencies'))
    });
}

}
