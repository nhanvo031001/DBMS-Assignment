-- Active: 1668347325267@@127.0.0.1@3306@dbms_221
DROP SCHEMA IF EXISTS DBMS_221;
CREATE SCHEMA DBMS_221;

USE
DBMS_221;

SET
default_storage_engine=INNODB;

DROP TABLE IF EXISTS BOOK;
CREATE TABLE BOOK
(
    BOOK_ID   INT AUTO_INCREMENT,
    BOOK_NAME TEXT,
    DESCRIPTION  TEXT,
    PRICE INT,
    PAGE_NUMBER INT,

    PRIMARY KEY (BOOK_ID)
);


DROP TABLE IF EXISTS CUSTOMER;
CREATE TABLE CUSTOMER
(
    CUSTOMER_ID   INT AUTO_INCREMENT,
    CUSTOMER_NAME TEXT,
    BIRTHDAY VARCHAR(20),
    PHONE_NUMBER VARCHAR(20),

    PRIMARY KEY (CUSTOMER_ID)
);


DROP TABLE IF EXISTS AUTHOR;
CREATE TABLE AUTHOR
(
    AUTHOR_ID   INT AUTO_INCREMENT,
    AUTHOR_NAME TEXT,

    PRIMARY KEY (AUTHOR_ID)
);


DROP TABLE IF EXISTS ORDERS;
CREATE TABLE ORDERS
(
    ORDERS_ID   INT AUTO_INCREMENT,
    TOTAL_PRICE INT,
    QUANTITY INT,
    CUSTOMER_ID INT,

    PRIMARY KEY (ORDERS_ID),
    FOREIGN KEY (CUSTOMER_ID) REFERENCES CUSTOMER(CUSTOMER_ID)
);


DROP TABLE IF EXISTS CONTAINS_ORDER_BOOK;
CREATE TABLE CONTAINS_ORDER_BOOK
(
    ORDER_ID   INT,
    BOOK_ID INT,
    QUANTITY INT,

    PRIMARY KEY (ORDER_ID, BOOK_ID),
    FOREIGN KEY (ORDER_ID) REFERENCES ORDERS(ORDERS_ID),
    FOREIGN KEY (BOOK_ID) REFERENCES BOOK(BOOK_ID)
);


DROP TABLE IF EXISTS BELONGS_BOOK_AUTHOR;
CREATE TABLE BELONGS_BOOK_AUTHOR
(
    AUTHOR_ID INT,
    BOOK_ID INT,

    PRIMARY KEY (AUTHOR_ID, BOOK_ID),
    FOREIGN KEY (AUTHOR_ID) REFERENCES AUTHOR(AUTHOR_ID),
    FOREIGN KEY (BOOK_ID) REFERENCES BOOK(BOOK_ID)
);

ALTER TABLE BOOK ADD FULLTEXT INDEX fulltext_description_book (DESCRIPTION);






-- DROP TABLE IF EXISTS COURSE;
-- CREATE TABLE COURSE (
-- 	COURSE_ID INT AUTO_INCREMENT,
--     COURSE_NAME VARCHAR(40),
-- 	MAX_NUMBER INT,
-- 	PRIMARY KEY (COURSE_ID)
-- );

-- DROP TABLE IF EXISTS COURSE;
-- CREATE TABLE COURSE
-- (
--     COURSE_ID   INT AUTO_INCREMENT,
--     COURSE_NAME TEXT,
--     DESCRIPTION  TEXT,
--     PRIMARY KEY (COURSE_ID)
-- );


-- CREATE TABLE COURSE (
-- 	COURSE_ID INT,
--     COURSE_NAME VARCHAR(40),
-- 	MAX_NUMBER INT
-- );

-- ALTER TABLE COURSE
--     ADD UNIQUE INDEX unique_index (COURSE_NAME);