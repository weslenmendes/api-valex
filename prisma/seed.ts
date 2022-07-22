import prisma from "./migrations/prisma.js";

const main = async () => {
  const companies = [
    {
      name: "Driven",
      apiKey: "zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0",
    },
  ];

  const employees = [
    {
      fullName: "Fulano Rubens da Silva",
      cpf: "47100935741",
      email: "fulano.silva@gmail.com",
      companyId: 1,
    },
    {
      fullName: "Ciclana de Jesus Alves",
      cpf: "08434681895",
      email: "ciclaninho@gmail.com",
      companyId: 1,
    },
  ];

  const businesses = [
    {
      name: "Responde Aí",
      type: "education" as const,
    },
    {
      name: "Extra",
      type: "groceries" as const,
    },
    {
      name: "Driven Eats",
      type: "restaurant" as const,
    },
    {
      name: "Uber",
      type: "transport" as const,
    },
    {
      name: "Unimed",
      type: "health" as const,
    },
  ];

  await prisma.companies.createMany({ data: companies });
  await prisma.employees.createMany({ data: employees });
  await prisma.businesses.createMany({ data: businesses });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
