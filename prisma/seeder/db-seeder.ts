//Prisma
import { PrismaClient } from '@prisma/client';
//Bcrypt
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('Test123.', 10);

    const user = await prisma.user.create({
      data: {
        email: 'test_user@example.com',
        name: 'Test User',
        password: hashedPassword,
      },
    });

    await prisma.recipe.createMany({
      data: [
        {
          title: 'Spaghetti Bolognese',
          description: 'Classic Italian pasta with rich, meaty sauce.',
          ingredients: [
            'spaghetti',
            'ground beef',
            'tomato',
            'onion',
            'garlic',
            'basil',
          ],
          categories: ['Italian', 'Pasta'],
          authorId: user.id,
        },
        {
          title: 'Chicken Curry',
          description: 'Spicy and flavorful curry with tender chicken pieces.',
          ingredients: [
            'chicken',
            'curry powder',
            'onion',
            'coconut milk',
            'garlic',
            'ginger',
          ],
          categories: ['Indian', 'Spicy'],
          authorId: user.id,
        },
        {
          title: 'Caesar Salad',
          description: 'Crispy lettuce with Caesar dressing and croutons.',
          ingredients: [
            'lettuce',
            'croutons',
            'caesar dressing',
            'parmesan cheese',
          ],
          categories: ['Salad', 'Healthy'],
          authorId: user.id,
        },
      ],
    });

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
