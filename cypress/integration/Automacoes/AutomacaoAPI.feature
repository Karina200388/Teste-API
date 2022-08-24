Feature: Realizar cadastros com sucesso na API

  Scenario: Criar um usuario
   Given Crio um usuario
   When valido que o usuario foi cadastrado com sucesso
   Then deleto o cadastro

  Scenario: Atualiza o cadastro do usuario
   Given Crio um usuario
   When valido que o usuario foi cadastrado com sucesso
   And atualizo o usuario
   Then deleto o cadastro

  Scenario: Adicionar um cartao para o usuario
   Given Crio um usuario
   When Adiciono um cartao para o usuario
   When valido que o usuario foi cadastrado com sucesso
   Then deleto o cadastro