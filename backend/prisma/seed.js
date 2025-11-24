import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.assetCategory.createMany({
    data: [
      { name: "Electrical" },
      { name: "Mechanical" },
      { name: "IT Equipment" },
      { name: "Furniture" },
    ],
  });

  await prisma.asset.createMany({
    data: [
      {
        name: "Main Distribution Panel",
        category_id: 1,
        location: "Main Building",
        status: "ACTIVE",
        purchase_date: new Date("2025-01-01"),
        description:
          "The central electrical distribution point in the main building that receives the incoming electrical power from the utility service",
      },
      {
        name: "Air Compressor",
        category_id: 2,
        location: "Workshop",
        status: "ACTIVE",
        purchase_date: new Date("2025-02-01"),
        description:
          "The machine that takes in air from the surroundings and squeezes (compresses) it into a much smaller volume",
      },
      {
        name: "Server",
        category_id: 3,
        location: "Server Room",
        status: "ACTIVE",
        purchase_date: new Date("2025-03-01"),
        description:
          "The powerful computer designed to run 24/7 and “serve” data, applications, or services to other devices over a network",
      },
      {
        name: "Office Desk",
        category_id: 4,
        location: "Office Room",
        status: "ACTIVE",
        purchase_date: new Date("2025-04-01"),
        description:
          "The workstation table specifically designed for office or administrative work",
      },
    ],
  });
}

seed()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
