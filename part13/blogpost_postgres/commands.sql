-- CREATED TABLE
CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text);

-- ADDED COLUMNS
ALTER TABLE blogs
ADD COLUMN url text NOT NULL;

ALTER TABLE blogs
ADD COLUMN title text NOT NULL,
ADD COLUMN likes integer DEFAULT 0;

-- ADDED BLOGS
insert into blogs (author, url, title, likes)
values ('Peter Pan', 'www.peter.com', 'How Peter learnd to fly', 5);

insert into blogs (author, url, title, likes) 
values ('Arnold Schwarzenegger', 'www.pump.com', 'How to pump iron', 988);