import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PlaygroundComponent } from './playground/playground.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HomeRoutingModule,
        NgbAccordionModule.forRoot(), 
        NgbDropdownModule.forRoot(),
        TranslateModule,
        ColorPickerModule,
        ClipboardModule],
    declarations: [HomeComponent, PlaygroundComponent],
})
export class HomeModule { }
