import { Component } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'ngc-demo-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [RouterLink, NgbCollapse, RouterLinkActive]
})
export class HeaderComponent {

  navbarCollapsed = true;
}
