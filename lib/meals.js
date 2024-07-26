import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'fs';

const db = new sql('meals.db');

export async function getMeals() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return db.prepare('SELECT * FROM meals').all();
}

export async function getMeal(slug) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);
    const extension = meal.image.name.split('.').pop();
    const imgUrl = `/images/${meal.slug}.${extension}`;
    const stream = fs.createWriteStream(`public${imgUrl}`);
    const buffer = await meal.image.arrayBuffer();
    stream.write(Buffer.from(buffer), (error) => {
        if (error) {
            throw new Error('Failed to save image');
        }
    });
    const stmt = db.prepare('INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) VALUES (?, ?, ?, ?, ?, ?, ?)');
    stmt.run(meal.title, meal.summary, meal.instructions, meal.creator, meal.creator_email, imgUrl, meal.slug);
}