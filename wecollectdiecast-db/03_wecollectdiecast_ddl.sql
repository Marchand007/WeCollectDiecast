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
  password_lost_timeout timestamptz NULL,
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
  item_brand varchar(255) NOT NULL REFERENCES diecastbrand(brand_name) ON DELETE CASCADE,
  car_brand varchar(255) NOT NULL REFERENCES carbrand(car_brand_name) ON DELETE CASCADE,
  car_model varchar(255) NOT NULL REFERENCES carmodel(car_model_name) ON DELETE CASCADE,
  car_year int4 NULL,
  color varchar(255) NOT NULL REFERENCES color(color) ON DELETE CASCADE,
  scale varchar(255) NOT NULL REFERENCES scale(scale_name) ON DELETE CASCADE,
  serie_name varchar(255) NOT NULL REFERENCES diecast_serie(serie_name) ON DELETE CASCADE,
  serie_number int4 NULL,
  serie_number_of int4 NULL,
  year_produced int4 NULL,
  limited_quantity_number int4 NULL,
  is_mainline boolean NOT NULL DEFAULT false,
  is_premium boolean NOT NULL DEFAULT false,
  is_monster boolean NOT NULL DEFAULT false,
  is_mystery_models boolean NOT NULL DEFAULT false,
  is_zamac boolean NOT NULL DEFAULT false,
  is_red_edition boolean NOT NULL DEFAULT false,
  is_motorcycle boolean NOT NULL DEFAULT false,
  is_exclusive boolean NOT NULL DEFAULT false,
  exclusive_location varchar(255) NOT NULL,
  is_chase_super_chase boolean NOT NULL DEFAULT false,
  is_treasure_hunt boolean NOT NULL DEFAULT false,
  is_super_treasure_hunt boolean NOT NULL DEFAULT false,
  is_rlc boolean NOT NULL DEFAULT false,
  rlc_year int4 NULL,
  is_mail_in boolean NOT NULL DEFAULT false,
  is_convention boolean NOT NULL DEFAULT false,
  convention_location varchar(255) NULL,
  convention_number varchar(255) NULL,
  convention_year int4 NULL,
  is_event_exclusive boolean NOT NULL DEFAULT false,
  event_location varchar(255) NULL,
  event_year int4 NULL,
  PRIMARY KEY (id)
);

CREATE TABLE user_diecast (
  id SERIAL NOT NULL,
  user_id int4 NOT NULL REFERENCES user("id") ON DELETE CASCADE,
  diecast_id int4 NOT NULL REFERENCES diecast("id") ON DELETE CASCADE,
  numbered_number int4 NULL,
  is_custom boolean NOT NULL,
  is_carded boolean NOT NULL,
  condition varchar(255) NOT NULL,
  buy_date date NULL,
  buy_price float4 NULL,
  sell_date date NULL,
  sell_price float4 NULL,
  PRIMARY KEY (id),
  UNIQUE (user_id, diecast_id)
);

CREATE TABLE diecast_serie (
  id SERIAL NOT NULL,
  diecast_brand varchar(255) NOT NULL REFERENCES diecastbrand(brand_name) ON DELETE CASCADE,
  serie_name varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (diecast_brand, serie_name)
);

CREATE TABLE matchbox (
  id SERIAL NOT NULL,
  is_super_chase boolean NOT NULL,
  is_red_edition boolean NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE diecastbrand (
  brand_name varchar(255) NOT NULL,
  PRIMARY KEY (brand_name)
);

CREATE TABLE diecastscale (
  scale_name varchar(255) NOT NULL,
  PRIMARY KEY (scale)
);

CREATE TABLE carbrand (
  car_brand_name varchar(255) NOT NULL,
  PRIMARY KEY (car_brand_name)
);

CREATE TABLE carmodel (
  car_model_name varchar(255) NOT NULL,
  PRIMARY KEY (car_model_name)
);

CREATE TABLE itemcondition (
  condition varchar(255) NOT NULL,
  PRIMARY KEY (condition)
);

CREATE TABLE color (
  color varchar(255) NOT NULL,
  PRIMARY KEY (color)
);