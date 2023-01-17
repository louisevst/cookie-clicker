import mongoose from 'mongoose';

export async function connect() {
  const url =
    'mongodb+srv://becode:pkB6O07uH25rGLkq@cookieclicker.5jazhna.mongodb.net/clicker';

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(url);
  } catch (e) {
    console.error(e);
  }
}
