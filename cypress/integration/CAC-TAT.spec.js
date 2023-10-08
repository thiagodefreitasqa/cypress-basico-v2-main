/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    it('verifica o título da aplicação', function() {
        cy.visit('./src/index.html')
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
describe('Nome campo obrigatório',function(){
    this.beforeEach
        it('informando o nome do usuario',function(){
            cy.get('#firstName').should('be.visible').type('Thiago').should('not.have.value','QA')
            cy.get('#lastName').should('be.visible').type('QA').should('have.value','QA')
            cy.get('#email').should('be.visible').type('thiagofreitasqatest@gmail.com')
            cy.get('#open-text-area').should('be.visible').
            type('O curso é  muito bom do TAT!! :)')
            cy.get('.button').click()
        })
    
  })
})