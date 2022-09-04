const { PrismaClient } = require("@prisma/client");
const countries = require("./seeds/country.json");

const prisma = new PrismaClient();

async function seed() {
  console.log("👩‍🌾 Seeding...");
  await prisma.country.createMany({
    data: countries,
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
