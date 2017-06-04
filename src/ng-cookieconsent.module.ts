
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


// add your angular components here (directives, components, filters, pipes ...)
export const MY_NG_COMPONENTS = [];

// add your services here
const MY_SERVICES = [];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [MY_NG_COMPONENTS],
  declarations: [MY_NG_COMPONENTS]
})
export class NgCookieconsentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgCookieconsentModule,
      providers: [MY_SERVICES]
    };
  }
}
