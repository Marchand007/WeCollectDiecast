DROP TABLE IF EXISTS user;

DROP TABLE IF EXISTS diecast;

CREATE TABLE "user" (
  id SERIAL NOT NULL,
  username varchar(255) NOT NULL UNIQUE,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  birthdate date NULL,
  city varchar(255) NULL,
  state varchar(255) NULL,
  country varchar(255) NULL,
  want_newsletter boolean NOT NULL,
  is_active boolean NOT NULL,
  is_admin boolean NOT NULL,
  is_new_user boolean NOT NULL,
  created_date date NOT NULL,
  password_hash varchar(255) NOT NULL,
  password_salt varchar(255) NOT NULL,
  had_lost_password boolean NOT NULL,
  password_lost_timeout date NULL,
  PRIMARY KEY (id)
);

CREATE TABLE user_rating (
  id SERIAL NOT NULL,
  rated_user_id int4 NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  rated_by_user_username varchar(255) NOT NULL,
  rating int4 NOT NULL,
  rating_note varchar(255) NOT NULL,
  rating_date date NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (rated_user_id, rated_by_user_username)
);

CREATE TABLE diecast (
  id SERIAL NOT NULL,
  owner_id int4 NOT NULL REFERENCES user("id") ON DELETE CASCADE,
  item_brand varchar(255) NOT NULL,
  car_brand varchar(255) NOT NULL,
  car_model varchar(255) NOT NULL,
  color varchar(255) NOT NULL,
  scale varchar(255) NOT NULL,
  numbered_number int4 NULL,
  limited_quantity int4 NULL,
  is_custom boolean NOT NULL,
  is_carded boolean NOT NULL,
  is_zamac boolean NOT NULL,
  is_red_edition boolean NOT NULL,
  is_exclusive boolean NOT NULL,
  exclusive_location boolean NOT NULL,
  is_chase_super_chase boolean NOT NULL,
  is_treasure_hunt boolean NOT NULL,
  is_super_treasure_hunt boolean NOT NULL,
  is_rlc boolean NOT NULL,
  rlc_year int4 NULL is_mail_in boolean NOT NULL,
  is_convention boolean NOT NULL,
  convention_location varchar(255) NULL,
  convention_number varchar(255) NULL,
  condition varchar(255) NOT NULL buy_date date NULL,
  buy_price float4 NULL,
  sell_date date NULL,
  sell_price float4 NULL,
  PRIMARY KEY (id)
);