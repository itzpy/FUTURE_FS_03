-- Create the products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  rating DECIMAL(3, 1),
  image_url TEXT,
  badges TEXT[],
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create stored procedures
CREATE OR REPLACE FUNCTION create_products_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    rating DECIMAL(3, 1),
    image_url TEXT,
    badges TEXT[],
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_contact_submissions_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
END;
$$ LANGUAGE plpgsql;
