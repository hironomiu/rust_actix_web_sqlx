create table sample(
  id int not null auto_increment primary key,
  title varchar(255) not null,
  body text,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp
);