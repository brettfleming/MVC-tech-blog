const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogdata = require('./blogdata.json');
const commentdata = require('./comment.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log(users)

  for (const blog of blogdata) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    console.log(blog);
    }
    for (const comment of commentdata) {
      await Comment.create({
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        blog_id: users[Math.floor(Math.random() * users.length)].id,
      });
  }
 
  process.exit(0);
  
};

seedDatabase();
