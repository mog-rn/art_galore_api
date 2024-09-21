import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create some user entries if needed
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'securepassword123',
      role: 'ARTIST',
    },
  });

  // Add art entries with image URLs
  await prisma.art.createMany({
    data: [
      {
        art_name: 'Sunset Over the Mountains',
        image:
          'https://res.cloudinary.com/mogaka-dev/image/upload/v1726898616/f1hf9exwsxdz2ytqriab.jpg',
        price: 150.0,
        size: '40x50 cm',
        description: 'A beautiful sunset over the mountains.',
        category: 'Landscape',
        quantity: 5,
        userId: user1.id,
      },
      {
        art_name: 'Abstract Dream',
        image:
          'https://res.cloudinary.com/mogaka-dev/image/upload/v1726898746/pu0abzzzartmlqm8nhv1.jpg',
        price: 200.0,
        size: '50x60 cm',
        description: 'An abstract painting filled with vibrant colors.',
        category: 'Abstract',
        quantity: 3,
        userId: user1.id,
      },
      {
        art_name: 'Ocean Waves',
        image:
          'https://res.cloudinary.com/mogaka-dev/image/upload/v1726898871/povijvxb1w1mla7c2rmd.jpg',
        price: 180.0,
        size: '30x40 cm',
        description: 'Waves crashing on the shore.',
        category: 'Seascape',
        quantity: 4,
        userId: user1.id,
      },
    ],
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
