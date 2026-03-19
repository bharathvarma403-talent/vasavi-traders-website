const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // Create Brands
  const asianPaints = await prisma.brand.upsert({
    where: { name: 'Asian Paints' },
    update: {},
    create: { name: 'Asian Paints' },
  });

  const berger = await prisma.brand.upsert({
    where: { name: 'Berger' },
    update: {},
    create: { name: 'Berger' },
  });

  const nagarjuna = await prisma.brand.upsert({
    where: { name: 'Nagarjuna Cement' },
    update: {},
    create: { name: 'Nagarjuna Cement' },
  });

  const ultratech = await prisma.brand.upsert({
    where: { name: 'UltraTech' },
    update: {},
    create: { name: 'UltraTech' },
  });
  
  const ramco = await prisma.brand.upsert({
    where: { name: 'Ramco' },
    update: {},
    create: { name: 'Ramco' },
  });

  const supreme = await prisma.brand.upsert({
    where: { name: 'Supreme' },
    update: {},
    create: { name: 'Supreme' },
  });

  const ashirvad = await prisma.brand.upsert({
    where: { name: 'Ashirvad' },
    update: {},
    create: { name: 'Ashirvad' },
  });

  const finolex = await prisma.brand.upsert({
    where: { name: 'Finolex' },
    update: {},
    create: { name: 'Finolex' },
  });

  // Create Products
  const productCount = await prisma.product.count();
  if (productCount > 0) {
    console.log('Products already seeded. Skipping product creation.');
    return;
  }

  const products = [
    {
      name: 'OPC 53 Grade',
      category: 'Cement',
      description: 'High strength cement for critical applications.',
      priceMin: 410,
      priceMax: 430,
      brandId: nagarjuna.id,
      rating: 4
    },
    {
      name: 'PPC',
      category: 'Cement',
      description: 'Portland Pozzolana Cement for durable construction.',
      priceMin: 400,
      priceMax: 420,
      brandId: ultratech.id,
      rating: 5
    },
    {
      name: 'OPC',
      category: 'Cement',
      description: 'Ordinary Portland Cement.',
      priceMin: 390,
      priceMax: 410,
      brandId: ramco.id,
      rating: 4
    },
    {
      name: 'PVC Pipe',
      category: 'Pipes',
      description: 'Durable PVC pipe for general use.',
      priceMin: 200,
      priceMax: 800,
      brandId: supreme.id,
      rating: 5
    },
    {
      name: 'CPVC Pipe',
      category: 'Pipes',
      description: 'Chlorinated PVC for hot and cold water distribution.',
      priceMin: 250,
      priceMax: 900,
      brandId: ashirvad.id,
      rating: 4
    },
    {
      name: 'Plumbing Pipe',
      category: 'Pipes',
      description: 'Standard plumbing pipe.',
      priceMin: 200,
      priceMax: 750,
      brandId: finolex.id,
      rating: 4
    },
    {
      name: 'Interior Paint',
      category: 'Paint',
      description: 'Smooth finish interior paint per liter.',
      priceMin: 300,
      priceMax: 600,
      brandId: asianPaints.id,
      rating: 5
    },
    {
      name: 'Exterior Paint',
      category: 'Paint',
      description: 'Weather resistant exterior paint per liter.',
      priceMin: 350,
      priceMax: 700,
      brandId: berger.id,
      rating: 4
    }
  ];

  for (const p of products) {
    const createdProduct = await prisma.product.create({
      data: {
        name: p.name,
        category: p.category,
        description: p.description,
        priceMin: p.priceMin,
        priceMax: p.priceMax,
        brandId: p.brandId,
      }
    });

    // Add a dummy rating
    await prisma.productRating.create({
      data: {
        rating: p.rating,
        productId: createdProduct.id
      }
    });
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
