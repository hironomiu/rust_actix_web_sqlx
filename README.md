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

## Install Memo
```
cargo add actix-web
cargo add serde --features="derive"
```