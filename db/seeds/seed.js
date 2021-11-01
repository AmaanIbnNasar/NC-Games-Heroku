const db = require("../connection");
const format = require("pg-format");

const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables
  // 2. insert data
  await db.query(`DROP TABLE IF EXISTS categories CASCADE;
                  DROP TABLE IF EXISTS users CASCADE;
                  DROP TABLE IF EXISTS reviews CASCADE;
                  DROP TABLE IF EXISTS comments;`);
  await db.query(`CREATE TABLE categories (
    slug TEXT PRIMARY KEY,
    description TEXT
  );`);
  await db.query(`CREATE TABLE users (
    username VARCHAR(20) PRIMARY KEY,
    avatar_url VARCHAR(500),
    name VARCHAR(100)
  )`);
  await db.query(`CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    review_body TEXT NOT NULL,
    designer VARCHAR(100) NOT NULL,
    review_img_url VARCHAR(500) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    votes INT DEFAULT 0,
    category TEXT NOT NULL REFERENCES categories(slug) ON DELETE CASCADE,
    owner VARCHAR(100) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`);
  await db.query(`CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR(100) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    review_id INT NOT NULL REFERENCES reviews(review_id) ON DELETE CASCADE,
    votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    body TEXT NOT NULL
  );`);
  const categoryQuery = format(
    `INSERT INTO categories 
    (slug, description) 
    VALUES 
    %L RETURNING *;`,
    categoryData.map((category) => {
      return [category.slug, category.description];
    })
  );
  const userQuery = format(
    `INSERT INTO users 
    (username, avatar_url, name) 
    VALUES
    %L RETURNING *;`,
    userData.map((user) => {
      return [user.username, user.avatar_url, user.name];
    })
  );
  const reviewQuery = format(
    `INSERT INTO reviews 
    (title, designer, owner, review_img_url, review_body, category, created_at, votes) 
    VALUES
    %L RETURNING *;`,
    reviewData.map((review) => {
      return [
        review.title,
        review.designer,
        review.owner,
        review.review_img_url,
        review.review_body,
        review.category,
        review.created_at,
        review.votes,
      ];
    })
  );
  const commentQuery = format(
    `INSERT INTO comments 
    (author, review_id, votes, created_at, body)
    VALUES 
    %L RETURNING *;`,
    commentData.map((comment) => {
      return [
        comment.author,
        comment.review_id,
        comment.votes,
        comment.created_at,
        comment.body,
      ];
    })
  );
  await db.query(categoryQuery);
  await db.query(userQuery);
  await db.query(reviewQuery);
  await db.query(commentQuery);
};

module.exports = seed;
