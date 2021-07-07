import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngc-demo-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.scss']
})
export class ContentWrapperComponent{

  @Input()
  public component?: string;

}
