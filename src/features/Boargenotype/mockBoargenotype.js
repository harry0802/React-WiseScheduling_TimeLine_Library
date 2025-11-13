import {
  generateRandomDate,
  generateRandomNumber,
} from "../../utility/dataGeneratorUtils";

const buildings = ["A棟", "B棟", "C棟", "D棟"];
const columns = ["1", "2", "3", "4", "5"];
const breeds = ["大白豬", "杜洛克", "藍瑞斯", "漢普夏"];
const genotypes = ["AA", "AB", "BB", "CC"];
const coatColorGenes = ["白", "黑", "花"];
const booleanOptions = ["是", "否"];

export function generateMockBoarGenotype(index) {
  const earTag = `ET${String(generateRandomNumber(1000, 9999)).padStart(
    4,
    "0"
  )}`;

  return {
    id: `BG${String(index + 1).padStart(3, "0")}`,
    key: `${index + 1}`,
    building: buildings[generateRandomNumber(0, buildings.length - 1)],
    column: columns[generateRandomNumber(0, columns.length - 1)],
    breed: breeds[generateRandomNumber(0, breeds.length - 1)],
    earTag: earTag,
    birthDate: generateRandomDate(),
    genotype: genotypes[generateRandomNumber(0, genotypes.length - 1)],
    notes: `備註${generateRandomNumber(1, 100)}`,
    sire: `S${generateRandomNumber(100, 999)}`,
    dam: `D${generateRandomNumber(100, 999)}`,
    selection: booleanOptions[generateRandomNumber(0, 1)],
    coatColorGene:
      coatColorGenes[generateRandomNumber(0, coatColorGenes.length - 1)],
    swineFever: booleanOptions[generateRandomNumber(0, 1)],
    swineErysipelas: booleanOptions[generateRandomNumber(0, 1)],
    pseudoRabies: booleanOptions[generateRandomNumber(0, 1)],
    prrs: booleanOptions[generateRandomNumber(0, 1)],
  };
}

export function generateMockBoarGenotypes(count) {
  return Array.from({ length: count }, (_, index) =>
    generateMockBoarGenotype(index)
  );
}
