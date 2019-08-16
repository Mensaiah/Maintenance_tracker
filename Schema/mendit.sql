CREATE TABLE admins(
    admin_uid  UUID NOT NULL PRIMARY KEY,
    full_name VARCHAR(170) NOT NULL,
    username VARCHAR(170) NOT NULL,
    pass_word VARCHAR(200) NOT NULL,
    date_created DATE NOT NULL, 
    UNIQUE(username)
);


CREATE TABLE users(
    user_uid UUID NOT NULL PRIMARY KEY,
    full_name VARCHAR(170) NOT NULL,
    username VARCHAR(170) NOT NULL,
    pass_word VARCHAR(200) NOT NULL,
    date_created DATE NOT NULL, 
    admin_uid UUID REFERENCES admins(admin_uid),
    UNIQUE(username)
);

CREATE TABLE requests(
    req_uid UUID PRIMARY KEY NOT NULL,
    title VARCHAR(50) NOT NULL,
    desription VARCHAR(500) NOT NULL,
    date_created DATE NOT NULL,
    request_status VARCHAR(15) DEFAULT 'Pending' NOT NULL,
    user_uid UUID REFERENCES users(user_uid)
);


