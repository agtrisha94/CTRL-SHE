import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.ingredient.createMany({
    data: [
      { name: 'Mango', category: 'Fruit', allergens: [] },
      { name: 'Guava', category: 'Fruit', allergens: [] },
      { name: 'Apple', category: 'Fruit', allergens: [] },
      { name: 'Tomato', category: 'Vegetable', allergens: [] },
      { name: 'Grape', category: 'Fruit', allergens: [] },
      { name: 'Strawberry', category: 'Berry', allergens: [] },
      { name: 'Apricot', category: 'Fruit', allergens: [] },
      { name: 'Cocoa', category: 'Seed', allergens: [] },
      { name: 'Passionfruit', category: 'Fruit', allergens: [] },
      { name: 'Orange', category: 'Fruit', allergens: [] },
      { name: 'Tea', category: 'Plant', allergens: [] },
    ],
    skipDuplicates: true,
  });

  console.log('Ingredients seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
