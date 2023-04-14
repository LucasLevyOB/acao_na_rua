# :checkered_flag: Ação na Rua

O sistema é voltado para a temática de auxiliar as ONGs no atendimento a pessoas em situação de rua. Os seus objetivos estão voltados em ajudar as ONGs auxiliando na logística de distribuição de utensílios(comida, roupas, cobertores, água, produtos de higiene pessoal e etc), além disso, coordenar situações de extrema importância como o recebimento e repasse de doações.

## :technologist: Membros da equipe

Matrícula, nome e curso dos participantes.
508160 - Lucas Levy de Oliveira Barros - Engenharia de Software
510918 - Gabriel Ferreira Cruz Farias - Engenharia de Software

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

- Administrador: Tem acesso a todas as funcionalidades do sistema, além de poder gerenciar os voluntários que acessarão o sistema.
- Voluntário: Poder gerenciar as doações, recebimento de itens, as pessoas em situação de rua e os doadores.
- Visitante: Poderá ver informações sobre as ONGs cadastradas no sistema, além de poder fazer login no sistema e se cadastrar como administrador.
- Pessoa em situação de rua: Poderá receber ajuda de voluntários cadastrados no sistema, mas não poderá acessar o sistema. As pessoas em situação de rua poderão cadastradas pelos voluntários ou administradores.
- Doador: Poderá doar itens para as ONGs cadastradas no sistema, mas não poderá acessar o sistema. Os doadores poderão cadastrados pelos voluntários ou administradores.

## :spiral_calendar: Entidades ou tabelas do sistema

- ONG: Entidade que representa uma ONG, a ONG é gerenciada somente pelo administrador.
- Administrador: Entidade que representa um administrador.
- Voluntário: Entidade que representa um voluntário.
- Doação: Entidade que representa uma doação.
- Pessoa em situação de rua: Entidade que representa uma pessoa em situação de rua.
- Doador: Entidade que representa um doador.
- Item: Entidade que representa um item.
- Ajuda: Entidade que representa uma ajuda.

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

Descreve ou liste brevemente as principais funcionalidades da aplicação que será desenvolvida. Destaque a funcionalidades que serão acessévies a todos os usuários e aquelas restriras a usuários logados.

#### :lock: Funcionalidades restritas a usuários não logados
- Login: Os voluntários e administradores poderão fazer login no sistema.
- Cadastro: Administradores poderão se cadastrar no sistema.
- Ver ONGs: Visitantes poderão ver breve informações das ONGs cadastradas no sistema.

#### :lock: Funcionalidades restritas a usuários logados
- Logout: Os voluntários e administradores poderão fazer logout do sistema.
- Monitoramento de doações: Administradores poderão monitorar as doações cadastradas no sistema, através de gráficos e etc.
- Exportação de dados: Administradores poderão exportar os dados cadastrados no sistema.
- Cadastro de ONG: Administradores poderão cadastrar ONGs no sistema.
- Cadastro de Voluntário: Administradores poderão cadastrar voluntários no sistema.
- Listagem de Voluntário: Administradores poderão listar seus voluntários cadastrados no sistema.
- Edição de Voluntário: Administradores poderão editar seus voluntários cadastrados no sistema.
- Remoção de Voluntário: Administradores poderão remover seus voluntários cadastrados no sistema.
- Cadastro de Doação: Administradores e voluntários poderão cadastrar doações no sistema.
- Cadastro de Pessoa em situação de rua: Administradores e voluntários poderão cadastrar pessoas em situação de rua no sistema.
- Cadastro de Doador: Administradores e voluntários poderão cadastrar doadores no sistema.
- Cadastro de Item: Administradores e voluntários poderão cadastrar itens no sistema.
- Cadastro de Ajuda: Administradores e voluntários poderão cadastrar ajudas no sistema.
- Listagem de Ajuda: Administradores e voluntários poderão listar suas ajudas cadastradas no sistema.
- Edição de Ajuda: Administradores e voluntários poderão editar suas ajudas cadastradas no sistema.
- Remoção de Ajuda: Administradores e voluntários poderão remover suas ajudas cadastradas no sistema.
- Listagem de ONG: Administradores poderão listar suas ONGs cadastradas no sistema.
- Listagem de Doação: Administradores e voluntários poderão listar suas doações cadastradas no sistema.
- Listagem de Pessoa em situação de rua: Administradores e voluntários poderão listar suas pessoas em situação de rua cadastradas no sistema.
- Listagem de Doador: Administradores e voluntários poderão listar seus doadores cadastrados no sistema.
- Listagem de Item: Administradores e voluntários poderão listar seus itens cadastrados no sistema.
- Edição de ONG: Administradores poderão editar suas ONGs cadastradas no sistema.
- Edição de Doação: Administradores e voluntários poderão editar suas doações cadastradas no sistema.
- Edição de Pessoa em situação de rua: Administradores e voluntários poderão editar suas pessoas em situação de rua cadastradas no sistema.
- Edição de Doador: Administradores e voluntários poderão editar seus doadores cadastrados no sistema.
- Edição de Item: Administradores e voluntários poderão editar seus itens cadastrados no sistema.
- Remoção de ONG: Administradores poderão remover suas ONGs cadastradas no sistema.
- Remoção de Doação: Administradores e voluntários poderão remover suas doações cadastradas no sistema.

----

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:


----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

Lista as tecnologias, frameworks e bibliotecas utilizados.

**Backend:**

Lista as tecnologias, frameworks e bibliotecas utilizados.


## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Entidade 1 | X |  X  |  | X |
| Entidade 2 | X |    |  X | X |
| Entidade 3 | X |    |  |  |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET | api/entidade1/|
| POST | api/entidade2 |
