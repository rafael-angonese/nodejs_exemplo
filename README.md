# ----------------- node ----------------
# npm init -y
# npm install express
# npm install -D nodemon

# npm install --save sequelize //orm
# npm install --save mysql2 //mysql para o sequelize
# npm install --save -D sequelize-cli  //migrations e seeders
# npx sequelize-cli init //inicia um novo projeto
# touch .sequelizerc //cria arquivo de configuração de caminhos do cli

# npx sequelize migration:create --name=create-users //criar migration
# npx sequelize-cli db:migrate //rodar as migration
# npx sequelize-cli db:migrate:undo //rollback das migration

# npm install --save body-parser //requisições json
# npm install --save bcryptjs //criptografia bycript
# npm install --save jsonwebtoken //jwt autenticação/autorização
# npm install --save dotenv //arquivo .env /variaves de ambiente