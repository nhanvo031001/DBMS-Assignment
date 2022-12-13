-- Active: 1668347325267@@127.0.0.1@3306@dbms_221
DROP SCHEMA IF EXISTS DBMS_221;
CREATE SCHEMA DBMS_221;

USE
DBMS_221;

SET
default_storage_engine=INNODB;

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


-- CREATE TABLE COURSE (
-- 	COURSE_ID INT,
--     COURSE_NAME VARCHAR(40),
-- 	MAX_NUMBER INT
-- );

-- ALTER TABLE COURSE
--     ADD UNIQUE INDEX unique_index (COURSE_NAME);

alter table book add fulltext index fulltext_description_book (description);