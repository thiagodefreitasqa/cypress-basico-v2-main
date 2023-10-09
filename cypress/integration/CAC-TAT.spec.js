/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it.only('preenche campos obrigatorios e envia formulario',function(){
            cy.get('#firstName').should('be.visible').type('Thiago').should('not.have.value','QA')
            cy.get('#lastName').should('be.visible').type('Freitas')
            cy.get('#email').should('be.visible').type('thiagofreitasqatest@gmail.com')
            cy.get('#open-text-area').should('be.visible').
            type('{de},O curso é  muito bom do TAT!! :)')
            cy.get('button[type="submit"]').click()

            cy.get('.success').should('be.visible')
        })
    
  })
