describe("accessability", () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('can query the app', () => {
    const input = "American"
    cy.get('.text-field')
      .type(input)
      .should('have.value', input)
  })

  it('displays a list of restaurants', () => {
    cy.get('tr')
      .should('have.length', 11)
  })

  it('shows results from query', () => {
    const input = "kitchen"
    cy.get('.text-field')
      .type(input)
      .get('tr')
      .should('have.length', 2)
  })

  it('can set state filter', () => {
    cy.get('select').first()
      .select('AZ')
      .get('tr')
      .should('have.length', 2)
  })

  it('returns no result message', () => {
    const input = "In N Out Burger"
    cy.get('.text-field')
    .type(input)
    .get('tr')
    .should('have.length', 2)
    .get('td')
    .should('have.text', 'No Results Were Found')
  })

  it('can set genre filter', () => {
    cy.get('select').last()
      .select('American')
      .get('tr')
      .should('have.length', 11)
  })

  it('should show pagination at the bottom of the page', () => {
    cy.get('a')
    .should('have.length', 4)
  })

  it('can have both state and genre filter on', () => {
    cy.get('select').first()
    .select('AZ')
    .get('select').last()
    .select('American')
    .get('tr')
    .should('have.length', 2)
    .get('a')
    .should('have.length', 1)
  })

  it('should be able to search with filters on', () => {
    const input = 'asdf'
    cy.get('select').first()
    .select('AZ')
    .get('select').last()
    .select('American')
    .get('.text-field')
    .type(input)
    .get('tr')
    .should('have.length', 2)
    .get('td')
    .should('have.text', "No Results Were Found")
  })

  it('shows the next page data when pagination is clicked on', () => {
    cy.get('a').last()
      .click()
      .get('tr')
      .eq(1)
      .contains('The Boulders')
  })
})
