// Test Flow Steps
// 1. Navigate to BH home page:
// https://www.brighthorizons.com/ - Done
// 2. Click on Find a Center option (top header)
// 3. Verify that newly open page contains: 
// /child-care-locator
//  as a part of its URL 
// 4. Type 
// New York
// into search box and press Enter
// 5. verify if a number of found centers is the same as a number of centers displayed on the below list
// 6. Click on the first center on the list
// 7. Verify if center name and address are the same (on the list and on the popup)
describe('Test Suite', () => {
  it('BH Test Case 1',() => {
    cy.log('Verify the number of centers in New York')

    cy.visit('https://www.brighthorizons.com/', {
      onBeforeLoad (win) {
        // forced geolocation
        const latitude = 18.5204;
        const longitude = 73.8567;
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
          return cb({ coords: { latitude, longitude } });
        });
      },
    });

    cy.get('#onetrust-accept-btn-handler').click({force:true})
    cy.get("a[class='btn-nav btn btn-large btn-hollow color-nileblue global_header_findcenter track_cta_click']").last().click({force: true})
    
    cy.url().should('include','/child-care-locator')

    // cy.get('#onetrust-accept-btn-handler').click({force:true})
    cy.get("input#addressInput").type("New York").trigger('keydown', {key: 'Enter',});
    cy.wait(2000)
    cy.get('input#addressInput.pac-target-input').type('{enter}');

    cy.wait(2000)

    let textFromLabel
    cy.get('span.resultsNumber',{force: true}).then(($label) => {
      // Extract the text
      let count = $label.text(); 
      textFromLabel = count
      
    });

    let divCount
    cy.get('#centerLocator_list > div.centerDetails.results > span').its('length').then((len) => {
      divCount = len
    });
    
    if(divCount === textFromLabel) {
      cy.log('BH Test Case 1 : List Validation : Passed')
    } else {
      cy.log('BH Test Case 1 : List Validation : Failed')
    }
    
    let centerListName = cy.get("h3.centerResult__name").text
    let centerListAddr = cy.get("span.centerResult__address").text

    cy.get("div.description-wrapper > div.heading-section > h3").first().click()

    let centerPopupName = cy.get("span.mapTooltip__headline").text
    let centerPopupAddr = cy.get("div.mapTooltip__address").text

    if(centerListName === centerPopupName) {
      cy.log('BH Test Case 1 : Popup Name Validation : Passed')
    } else {
      cy.log('BH Test Case 1 : Popup Name Validation : Failed')
    }
    
    if(centerListAddr === centerPopupAddr) {
      cy.log('BH Test Case 1 : Popup Address Validation : Passed')
      cy.log('BH Test Case 1 : Passed')
    } else {
      cy.log('BH Test Case 1 : Popup Address Validation : Failed')
      cy.log('BH Test Case 1 : Failed')
    }

  })
})