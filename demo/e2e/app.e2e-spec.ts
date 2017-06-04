import { NgCookieconsentDemoPage } from './app.po';

describe('ng-cookieconsent-demo App', () => {
  let page: NgCookieconsentDemoPage;

  beforeEach(() => {
    page = new NgCookieconsentDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
