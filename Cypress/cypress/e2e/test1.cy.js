// Test Spec Flow (Steps)
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

    // Handling the Geolocation pop-up
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

    // Handling the manage cookies pop-up
    cy.get('#onetrust-accept-btn-handler').click({force:true})
    cy.get("a[class='btn-nav btn btn-large btn-hollow color-nileblue global_header_findcenter track_cta_click']").last().click({force: true})
    
    // Verified that newly opened page contains:  /child-care-locator
    cy.url().should('include','/child-care-locator')

    // cy.get('#onetrust-accept-btn-handler').click({force:true})
    cy.get("input#addressInput").type("New York").trigger('keydown', {key: 'Enter',});
    cy.wait(2000)
    cy.get('input#addressInput.pac-target-input').type('{enter}');

    // Wait required here
    cy.wait(2000)

    cy.get('span.resultsNumber').then(($label) => {
      // Extract the text
      let count = $label.text(); 
      cy.log(count)
      expect(Number(count)).to.equal(20)
    });

    cy.get('div.centerResult').its('length').then((len) => {
      expect(len).to.equal(20)
    });
    
    // Clicked on the first center on the list
    cy.get("div.description-wrapper > div.heading-section > h3").first().click()
    
    let name = "Bright Horizons at TriBeCa"
    let addr = "129 Hudson Street New York, NY 10013"

    cy.get("div.description-wrapper > div.heading-section > h3").first().then((e)=>{
      expect(e.text().trimEnd()).to.eql(name) 
    })

    cy.get("div.description-wrapper > div.heading-section > span.centerResult__address").first().then((e)=>{
      cy.log(e.text().trimEnd())
      cy.log('equals ' + addr)
      
    })

    cy.get("span.mapTooltip__headline").then((e)=>{
      expect(e.text().trimEnd()).to.eql(name) 
    })

    cy.get("div.mapTooltip__directions > div.mapTooltip__address").then((e)=>{
      cy.log(e.text().replace(/(\r\n|\n|\r)/gm, ""))
      cy.log('equals ' + addr)
      
    })
    
    })

// Test Spec Flow (Steps)
// 1. Navigate to BH home page:
https://www.brighthorizons.com/
// 2. Click on search/loop icon (top, right corner)
// 3. Verify if search field is visible on the page
// 4. Type:
// Employee Education in 2018: Strategies to Watch into the search field and click on Search button
// 5. Verify if the first search result is exact match to what you typed into search 
  it('BH Test Case 2',() => {
  cy.log('Verify the search functionality')

    // Handling the Geolocation pop-up
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

    // Handling the manage cookies pop-up
    cy.get('#onetrust-accept-btn-handler').click({force:true})

      // cy.get('body > nav > div.nav-primary-wrap.js-nav-primary-wrap > ul > li:nth-child(10) > a > span').click({force: true})
    cy.get('body > nav > div:nth-child(2) > button').click()
    cy.get('a.txt-nav-link.nav-link.track_nav_interact',{timeout:2000}).should('be.visible')
    
    cy.wait(2000)
    cy.get('body > nav > div.nav-primary-wrap.js-nav-primary-wrap.active > ul > li:nth-child(5) > a').click()
    cy.wait(2000)
    let searchStr = "Employee Education in 2018: Strategies to Watch"
    cy.get('input#siteSearchBox').type(searchStr)
    cy.get('#siteSearchButton').click()

    cy.wait(2000)
    cy.get('#mainContent > section.search-results > div.results.container > a:nth-child(1) > div > h3').then((e)=>{
      expect(e.text().trimEnd()).to.eql(searchStr) 
    })
})

})
