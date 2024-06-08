drop database gallery_glimpse;
create database gallery_glimpse;
USE gallery_glimpse;

CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
INSERT INTO admins (username, password) VALUES 
('tahoor', '123456'),
('usmara', '456789');

create TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
INSERT INTO users (username, password) VALUES
    ('tahoor', '123'),
    ('usmara', '456');

CREATE TABLE shop (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    image_link VARCHAR(255),
    name VARCHAR(255) unique,
    artists VARCHAR(255),
    price DECIMAL(10, 2)
);
INSERT INTO shop (image_link, name, artists, price) VALUES 
    ('images/img/nature/n1.jpg', 'Golden Horizon: A Portrait of Dusk', 'Lily Isabella', 112.00),
    ('images/img/portrait/p1.jpg', 'Eternal Elegance: Portrait of Grace', 'William Alexander', 122.00),
    ('images/img/space/s2.jpg', 'Nebula''s Dream: Cosmic Elegance', 'Evelyn Oliver', 67.00),
    ('images/img/culture/c1.jpg', 'Cultural Mosaic: Threads of Tradition', 'William Alexander', 98.00),
    ('images/img/a7/la3.jpg', 'Majestic Monarch: The Ruler''s Regard', 'Liam Adam', 100.00),
    ('images/img/a3/eo2.jpg', 'Age Glamour: Opulence and Opportunity', 'Evelyn Oliver', 124.00),
    ('images/img/nature/n6.jpg', 'Sunset Sonata: A Symphony of Light', 'Mia Arthur', 104.00),
    ('images/img/portrait/p6.jpg', 'Innocence Unveiled: Portrait of Childhood', 'Aiden Joshua', 117.00),
    ('images/img/a3/eo7.jpg', 'Obsession: Windows to the soul', 'Willaim Alexander', 119.00),
    ('images/img/space/s8.jpg', 'Solar Synchrony: Symphony of Light', 'Mia Arthur', 128.00),
    ('images/img/culture/c6.jpg', 'Voices of Ancestors: Echoes of the Past', 'Lily Isabella', 97.00),
    ('images/img/culture/c7.jpg', 'Roots and Rituals: Nurturing Identity', 'Willaim Alexander', 106.00),
    ('images/img/nature/n8.jpg', 'Whispers of the Wind: Secrets of the Valley', 'Liam Adam', 113.00),
    ('images/img/portrait/p4.jpg', 'Timeless Beauty: A Study in Serenity', 'Evelyn Oliver', 129.00),
    ('images/img/a4/ma6.jpg', 'Blossom Peaks: A Symphony of Color', 'Mia Arthur', 117.00),
    ('images/img/portrait/p7.jpg', 'Resilience: Inner Strength Revealed', 'Willaim Alexander', 94.00);

CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    quantity INT,
    price DECIMAL(10,2)
);
INSERT INTO events (name, quantity, price) VALUES
    ('Bookworm: A Literary Journey Through Art', 3, 65),
    ('Ultra Flowers Festival: Wings of Art', 4, 65),
    ('Portraits: Feathers & Frames', 5, 65),
    ('Landscapes Fest: Horizon Explorations', 2, 65),
    ('WonderLand: A Journey Beyond Enchanted Realms', 0, 65),
    ('Let Canvas Roll: Brushstrokes Unleashed', 6, 65);