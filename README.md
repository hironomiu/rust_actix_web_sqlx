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

```
create database sample;
use sample
```

#### create Table

```
create table sample
```

### Create sqlite DB & Table

```
create table sample(
  id int not null auto_increment primary key,
  title varchar(255) not null,
  body text,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp
);
```

#### insert Data

```
insert into sample(title,body) values("title1","body1");
insert into sample(title,body) values("title2","body2");
insert into sample(title,body) values("title3","body3");
insert into sample(title,body) values("title4","body4");
```

### Create sqlite DB & Table

#### cereate DB

```
mkdir sqlite_db
cd sqlite_db

sqlite3 sample.db
```

#### create Table

```
create table sample(
 id integer not null primary key autoincrement,
 title varchar not null,
 body text not null,
 created_at bigint not null,
 updated_at bigint not null);
```

#### insert Data

```
insert into sample(title,body,created_at,updated_at) values("title1","body1",1659407602051,1659407602051);
insert into sample(title,body,created_at,updated_at) values("title2","body2",1659407602051,1659407602051);
insert into sample(title,body,created_at,updated_at) values("title3","body3",1659407602051,1659407602051);
insert into sample(title,body,created_at,updated_at) values("title4","body4",1659407602051,1659407602051);
```

## Install Memo
```
cargo add actix-web
cargo add actix-cors
cargo add serde --features="derive"
cargo add sqlx --features="macros" --features="runtime-actix-rustls" --features="mysql" --features="sqlite"
cargo add thiserror
cargo add tracing
```