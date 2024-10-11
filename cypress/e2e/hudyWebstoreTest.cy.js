const addressData = new Map([
	['Jméno', 'Ján'],
	['Příjmení', 'Novák'],
	['Telefon', '+420123456789'],
	['E-mail', 'test@test.com'],
	['Ulice a číslo popisné', 'Radnická 6'],
	['Město', 'Brno'],
	['PSČ', '60200']
])

function fillAddressField(fieldData, fieldLabel) {
	cy.log('Entering value for address field ' + fieldLabel)
	cy.contains('fieldset', 'Fakturační údaje').within(() => {
		cy.contains('p', fieldLabel)
			.within(() => {
				cy.get('input').focus()
				cy.get('input').clear()
				cy.get('input').type(fieldData)
				cy.get('input').blur()
				})
			.should('not.have.class', 'pdforms-error')
	})
	cy.log('Field value entered without an error')
}

describe('Hudy webstore test', () => {
	it('Buys jackets from Hudy webstore', () => {
		cy.viewport(1920, 1080)
		
		cy.visit('https://www.hudy.cz/')
		cy.log('Navigating to home page')
		
		cy.get('div[class="std-box std-box--padding-cookie std-box--white u-mb-0"]').within(() => {
			cy.get('button[name="reject"]').should('be.visible')
			cy.get('button[name="reject"]').click()
		})
		cy.log('Closing the cookies pop-up window')
		cy.get('div[class="std-box std-box--padding-cookie std-box--white u-mb-0"]').should('not.exist')
		
		cy.get('nav[id="main-menu"]').within(() => {
			cy.get('li[id="ca-uid-5"]').click()
			cy.contains('li', 'Větruodolné bundy').click()
		})
		cy.log('Navigating to "Větruodolné bundy" product category')
		
		cy.get('section[class="category-crossroad"]').within(() => {
			cy.contains('a', 'Pánské větruodolné bundy').click()
		})
		cy.log('Navigating to "Pánské větruodolné bundy" sub-category')
		
		cy.get('div[id="param-filter"]').within(() => {
			cy.get('div[class*="sizes-list"]').within(() => {
				cy.contains('li', 'L').click()
			})
		})
		cy.log('Filtering results to only include products available in L size')
		
		cy.get('div[class="active-filters"]').within(() => {
			cy.get('section[class="active-filters__filters"]').within(() => {
				cy.contains('li', 'Velikost').should('be.visible')
				cy.get('strong[class*="active-filters__value"]').should('contain', 'L')
			})
			cy.log('Size filter is present, with a correct value')
			
			cy.get('section[class*="active-filters__sort"]').within(() => {
				cy.get('a[aria-controls="snippet--sortingValues"]').click()
				cy.contains('li', 'Od nejdražšího').click()
				cy.get('strong[class*="active-filters__value"]').should('contain', 'Od nejdražšího')
			})
			cy.log('Items are correctly sorted by price, in descending order')
		})
		
		cy.contains('section', 'Produkty').within(() => {
			cy.get('section[class*="product-list__item"]').eq(0).click()
		})
		cy.log('Viewing the most expensive item')
		
		cy.contains('span', 'Vložit do košíku').click()
		cy.log('Adding the first item to shopping cart')
		
		cy.get('div[class="pdbox__content"]').within(() => {
			cy.contains('a', 'Zavřít').click()
		})
		cy.log('Closing the confirmation pop-up window')
		
		cy.get('div[class="pdbox__content"]').should('not.exist')
		cy.go('back')
		cy.log('Navigating back to the previous page')
		
		cy.contains('section', 'Produkty').within(() => {
			cy.get('section[class*="product-list__item"]').eq(1).click()
		})
		cy.log('Viewing the second most expensive item')
		
		cy.contains('span', 'Vložit do košíku').click()
		cy.log('Adding the second item to shopping cart')
		
		cy.get('div[class="pdbox__content"]').within(() => {
			cy.contains('a', 'Přejít do košíku').click()
		})
		cy.log('Navigating to the shopping cart')
		
		cy.get('tbody[class*="basket-list__items--products"]').find('tr').should('have.length', 2)
		cy.log('The shopping cart does contain the correct number of items')
		
		cy.get('form[class*="basket-list"]').within(() => {
			cy.contains('button', 'Pokračovat k dopravě a platbě').click()
		})
		cy.log('Navigating to shipping and payment')
		
		cy.get('form[id="frm-deliveryForm"]').within(() => {
			cy.contains('label', 'Balíkovna - na adresu').within(() => {
				cy.get('i[class*="method__mark"]').click()
			})
			.parents('div[class*="method--active"]').should('exist')
			cy.log('Shipping method is selected')
			
			cy.contains('label', 'Online kartou').within(() => {
				cy.get('i[class*="method__mark"]').click()
			})
			.parents('div[class*="method--active"]').should('exist')
			cy.log('Payment option is selected')
			
			cy.get('button[name="next"]').click()
		})
		cy.log('Navigating to personal information')
		
		addressData.forEach((value, key) => {
			fillAddressField(value, key)
		})
	})
})
