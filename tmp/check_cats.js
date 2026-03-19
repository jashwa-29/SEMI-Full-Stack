const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../server/.env') });
const ChatSetting = require('../server/models/ChatSetting');

async function test() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const settings = await ChatSetting.findOne({ key: 'visitor_faqs' });
    if (!settings) {
      console.log('No visitor_faqs found');
    } else {
      console.log('Settings found, length:', settings.value.length);
      const cats = [];
      const extract = (items) => {
        items.forEach(item => {
          if (item.category) cats.push(item.category);
          if (item.followUps) extract(item.followUps);
        });
      };
      extract(settings.value);
      console.log('Categories extracted:', [...new Set(cats)]);
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

test();
