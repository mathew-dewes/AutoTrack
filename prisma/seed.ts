import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const serviceLogs: Prisma.ServiceLogsCreateInput[] = [
  {
    date: new Date("2025-01-15"),
    odometer: 123500,
    machanic: "Mike's Auto",
    notes: "Oil and filter change",
    renewalDate: new Date("2025-07-15"),
    type: "Oil Change",
    cost: 120,
    User: { connect: { id: "cmedrw5ly0000uhfgosukjm4x" } },
    vehicle: { connect: { id: "cmedu09r30000uh2ofdpvg516" } },
  },
  {
    date: new Date("2025-02-10"),
    odometer: 88050,
    machanic: "Toyota Service",
    notes: "Brake pad replacement",
    renewalDate: new Date("2026-02-10"),
    type: "Brake Service",
    cost: 350,
    User: { connect: { id: "cmedrw5ly0000uhfgosukjm4x" } },
    vehicle: { connect: { id: "cmedu09rx0001uh2o7pj8z8tb" } },
  },
  {
    date: new Date("2025-03-05"),
    odometer: 150500,
    machanic: "Rotorua Mazda Specialists",
    notes: "Clutch replacement",
    renewalDate: new Date("2030-03-05"),
    type: "Clutch",
    cost: 1200,
    User: { connect: { id: "cmedrw5ly0000uhfgosukjm4x" } },
    vehicle: { connect: { id: "cmedu09s90002uh2obtfffap2" } },
  },
  {
    date: new Date("2025-04-01"),
    odometer: 67800,
    machanic: "Honda Service Center",
    notes: "WOF inspection passed",
    renewalDate: new Date("2026-04-01"),
    type: "WOF",
    cost: 60,
    User: { connect: { id: "cmedrw5ly0000uhfgosukjm4x" } },
    vehicle: { connect: { id: "cmedu09sk0003uh2o2q3nfc2z" } },
  },
  {
    date: new Date("2025-05-20"),
    odometer: 92100,
    machanic: "Ford Workshop",
    notes: "Battery replacement",
    renewalDate: new Date("2028-05-20"),
    type: "Battery",
    cost: 280,
    User: { connect: { id: "cmedrw5ly0000uhfgosukjm4x" } },
    vehicle: { connect: { id: "cmedu09sv0004uh2oq1q7mjko" } },
  },
  {
    date: new Date("2025-06-15"),
    odometer: 130500,
    machanic: "Subaru Dealership",
    notes: "Timing belt replacement",
    renewalDate: new Date("2035-06-15"),
    type: "Timing Belt",
    cost: 900,
    User: { connect: { id: "cmedrw5ly0000uhfgosukjm4x" } },
    vehicle: { connect: { id: "cmedu09t70005uh2odu22q26r" } },
  },
  {
    date: new Date("2025-07-12"),
    odometer: 98200,
    machanic: "BMW Service Center",
    notes: "Air filter + spark plugs",
    renewalDate: new Date("2026-07-12"),
    type: "Major Service",
    cost: 600,
    User: { connect: { id: "cmedrw5ly0000uhfgosukjm4x" } },
    vehicle: { connect: { id: "cmedu09tj0006uh2og9znrxo8" } },
  },
  {
    date: new Date("2025-08-05"),
    odometer: 60500,
    machanic: "Hyundai Service",
    notes: "Transmission flush",
    renewalDate: new Date("2030-08-05"),
    type: "Transmission",
    cost: 750,
    User: { connect: { id: "cmedrw5ly0000uhfgosukjm4x" } },
    vehicle: { connect: { id: "cmedu09tu0007uh2otugtxvct" } },
  },
  {
    date: new Date("2025-09-09"),
    odometer: 145500,
    machanic: "Mitsubishi Workshop",
    notes: "Radiator replacement",
    renewalDate: new Date("2030-09-09"),
    type: "Cooling System",
    cost: 500,
    User: { connect: { id: "cmedrw5ly0000uhfgosukjm4x" } },
    vehicle: { connect: { id: "cmedu09u60008uh2oqjkm0hea" } },
  },
  {
    date: new Date("2025-10-01"),
    odometer: 102500,
    machanic: "Nissan Dealer",
    notes: "Suspension bushes replaced",
    renewalDate: new Date("2032-10-01"),
    type: "Suspension",
    cost: 650,
    User: { connect: { id: "cmedrw5ly0000uhfgosukjm4x" } },
    vehicle: { connect: { id: "cmedu09uh0009uh2okm3w4fst" } },
  },
];


  
async function main() {

  console.log("Start seeding...");

  for (const log of serviceLogs){
    const newLog = await prisma.serviceLogs.create({
      data: log
    });
    console.log(`Created service log with id: ${newLog.id} `);
    
  }
  

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })