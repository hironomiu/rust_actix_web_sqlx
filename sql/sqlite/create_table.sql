create table sample(
 id integer not null primary key autoincrement,
 title varchar not null,
 body text not null,
 created_at bigint not null,
 updated_at bigint not null);