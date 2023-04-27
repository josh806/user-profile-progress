function clickFirstAccordian() {
  const firstAccordian = cy.get('.accordian');
  firstAccordian.eq(0).click();
  return firstAccordian;
}

describe('Grouped Tasks', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should have title', () => {
    cy.get('.group-tasks__title').should('not.be.empty');
  });

  it('Should open Accordian and show checkbox', () => {
    const firstAccordian = clickFirstAccordian();

    const checkboxEl = firstAccordian.find('.checkbox');
    checkboxEl.should('be.visible');
  });

  it('Should check checkbox', () => {
    const firstAccordian = clickFirstAccordian();
    const checkboxEl = firstAccordian.find('.checkbox').eq(1);
    const checkbox = checkboxEl.find('input[type="checkbox"]');

    checkboxEl.click({ force: true });
    checkbox.should('be.checked');
  });

  it('Check 3rd Accordian is green (all checked)', () => {
    const thirdAccordian = cy.get('.accordian').eq(2);
    const accordianTitle = thirdAccordian.find('.accordian__title');

    accordianTitle.invoke('css', 'color').then((color) => {
      expect(color).to.eq('rgb(0, 183, 151)');
    });
  });
});
