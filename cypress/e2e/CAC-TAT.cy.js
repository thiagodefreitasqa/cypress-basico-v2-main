/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    const longtext ='Teste teste, digitando texto longo dentro do para comentário'
    const emailcorreto ='thiagofreitasqatest@gmail.com'
    const emailincorreto ='thiagofreitasqatest#$00gmail.com'
    const nome ='Thiago'
    const sobrenome ='Freitas'

    it('1- verifica o título da aplicação', function() {
        cy.title()
            .should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('2 - Preenche campos obrigatorios e envia formulario Sucesso',function(){
            cy.get('#firstName')
                .should('be.visible')
                .type(nome)
            cy.get('#lastName')
                .should('be.visible')
                .type(sobrenome)
            cy.get('#email')
                .should('be.visible')
                .type(emailcorreto)
            cy.get('#open-text-area')
                .should('be.visible')
                .type(longtext,{delay:0})          
            cy.contains('button','Enviar').click()
        //ao final é mostrado a mensagem de sucesso no envio das informações
            cy.get('.success')
                .should('be.visible')
        })
    it('3 - Exibe mensagem de erro ao Submeter o formulario com E-mail Incorreto',function(){
        cy.get('#firstName')
            .should('be.visible')
            .type('Thiago')
            .should('not.have.value','QA')
        cy.get('#lastName')
        .should('be.visible').type('Freitas')
        cy.get('#email')
            .should('be.visible')
            .type(emailincorreto)
        cy.get('#open-text-area')
            .should('be.visible')
            .type(longtext,{delay:0})
        cy.contains('button','Enviar').click()
        //ao final é mostrado mensagem de erro, pedindo para validar as informações
        cy.get('.error')
            .should('be.visible')
    })
    it('4 - Verifica se campo telefone continua vazio com valor não-numérico',function(){
        //o campo #phone aceita somente valores numericos, em type é passado um valor não numerico, em should valida se o input esta vazio.
        cy.get('#phone')
            .type('abcdefgghghg')
            .should('have.text','')
    })
    it('5 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio',function(){
        cy.get('#firstName')
            .should('be.visible')
            .type(nome)
        cy.get('#lastName')
            .should('be.visible')
            .type(sobrenome)
        cy.get('#email')
            .should('be.visible')
            .type(emailcorreto)
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area')
            .type(longtext,{delay:0})
        cy.get('#phone-checkbox')
            .should('be.visible')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it('6 - Preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName')
            .type('Thiago')
            .should('have.value',nome)
            .clear()
            .should('have.value','')
        cy.get('#lastName')
            .type(sobrenome)
            .should('have.value',sobrenome)
            .clear().should('have.value','')
        cy.get('#email')
            .should('be.visible')
            .type(emailcorreto)
            .should('have.value',emailcorreto)
            .clear()
            .should('have.value','')
        cy.get('#phone')
            .type('113245558820')
            .should('have.value','113245558820')
            .clear()
            .should('have.value','')
    })
    it('7 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

    })
    it('8 - Envia o formuário com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        //o comando customizado esta escrito no arquivo support/commands.js
    })
  it('9 - Seleciona um produto (YouTube) por seu texto',function(){
    cy.get('#product')
        .select('YouTube')
        .should('have.value','youtube')
  })
  it('10 - seleciona um produto (Mentoria) por seu valor (value)',function(){
    cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
  })
  it('11 - seleciona um produto (Blog) por seu índice',function(){
    cy.get('#product')
        .select(1)
        .should('have.value','blog')
  })
  it('12 - marca o tipo de atendimento "Feedback"',function(){
    cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value','feedback')
    
  })
  it('13 - marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')

    })
  })
  it('14 - marca ambos checkboxes, depois desmarca o último',function(){
    cy.get('#check input[type="checkbox"]')
        .as('checkboxes').check()
    cy.get('@checkboxes')
        .each(checkboxe =>{
            expect(checkboxe[0].checked).to.equal(true)
        })//a seguir faz o uncheck da caixa de seleção e retorna au usuario
    cy.get('#check input[type="checkbox"]').uncheck()
    cy.get('@checkboxes')
        .each(checkboxesno =>{
            expect(checkboxesno[0].checked).to.equal(false)
        })
  })
  it('15 - seleciona um arquivo da pasta fixtures',function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
    })
    it('16 - seleciona um arquivo simulando um drag-and-drop',function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json',{action:'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('17 - verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
    })//o valor attr - atribute, possui o atributo
    it('18 - acessa a página de política de privadade removendo o target e então clicando no link',function(){
        cy.get('#privacy a')
            .invoke('removeAttr','target')
            .click()
    })
})