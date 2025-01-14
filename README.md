# BrightHorizons
Automated tests written with Cypress

// Test Spec Flow (Steps)

// 1. Navigate to BH home page:

// https://www.brighthorizons.com/ 

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

To execute this file in VSCode either from the Terminal do:
$ npx cypress open
