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

```
curl -X POST -H 'Content-Type: application/json' -d '{"title" : "タイトル" , "body" : "ボディ"}' localhost:8686/api/v1/sample
```

## SetUp

### Create MySQL DB & Table

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


## Install Memo
```
cargo add actix-web
cargo add serde --features="derive"
cargo add sqlx --features="macros" --features="runtime-actix-rustls" --features="mysql" --features="sqlite"
cargo add thiserror
cargo add tracing
```