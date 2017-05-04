import { RowPermitCalculatorPage } from './app.po';

describe('row-permit-calculator App', () => {
  let page: RowPermitCalculatorPage;

  beforeEach(() => {
    page = new RowPermitCalculatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
