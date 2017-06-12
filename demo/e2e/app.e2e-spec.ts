import { NgxCookieconsentDemoPage } from './app.po';

describe('ngx-cookieconsent-demo App', () => {
  let page: NgxCookieconsentDemoPage;

  beforeEach(() => {
    page = new NgxCookieconsentDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
