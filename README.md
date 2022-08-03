# rust_actix_web_sqlx

## Run

```
cargo run
```

## Watch

```
cargo watch -x run
```

## curl

### POST

```
curl -X POST -H 'Content-Type: application/json' -d '{"title" : "タイトル" , "body" : "ボディ"}' localhost:8686/api/v1/sample
```

### CORS

Success

```
curl -H "Origin: http://localhost:3000"  localhost:8686/api/v1/sample
```

Failure

```
curl -H "Origin: http://localhost:3001"  localhost:8686/api/v1/sample
```

## SetUp

### .env

|変数|設定値|
|:-|:-|
|SERVER_ADDRESS|localhost:5555|
|CORS_ALLOWED_ORIGIN|http://localhost:3000|
|MYSQL_DATABASE_HOST|MySQLの接続ホスト|
|MYSQL_DATABASE_PORT|MySQLの接続ポート|
|MYSQL_DATABASE_USER|MySQLの接続ユーザ|
|MYSQL_DATABASE_PASS|MySQLの接続パスワード|
|MYSQL_DATABASE_NAME|MySQLの接続DB|
|MYSQL_DATABASE_POOL_SIZE|MySQLの接続プールサイズ|

### Create MySQL DB & Table

#### cereate DB

[sql/mysql/create_database](./sql/mysql/create_database.sql) 

実行後移動

```
use sample
```

#### create Table

[sql/mysql/create_table](./sql/mysql/create_table.sql)

#### insert Data

[sql/mysql//insert_data](./sql/mysql//insert_data.sql)

### Create sqlite DB & Table

#### cereate DB

```
mkdir sqlite_db
cd sqlite_db

sqlite3 sample.db
```

#### create Table

[sql/sqlite/create_table](./sql/sqlite/create_table.sql)

#### insert Data

[sql/sqlite/insert_data](./sql/sqlite/insert_data.sql)

## Install Memo
```
cargo add actix-web
cargo add actix-cors
cargo add serde --features="derive"
cargo add sqlx --features="macros" --features="runtime-actix-rustls" --features="mysql" --features="sqlite"
cargo add thiserror
cargo add tracing
cargo add dotenv
```