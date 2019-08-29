CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users(
    user_uid UUID NOT NULL PRIMARY KEY,
    full_name VARCHAR(170) NOT NULL,
    username VARCHAR(170) NOT NULL,
    pass_word VARCHAR(200) NOT NULL,
    date_created DATE NOT NULL, 
    admin_status BOOLEAN NOT NULL,
    UNIQUE(username)
);

CREATE TABLE IF NOT EXISTS requests(
    req_uid UUID PRIMARY KEY NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(10000) NOT NULL,
    date_created TIMESTAMP NOT NULL,
    request_status VARCHAR(15) DEFAULT 'Pending' NOT NULL,
    admin_incharge VARCHAR(60) REFERENCES users(username),
    user_uid UUID REFERENCES users(user_uid)
);


