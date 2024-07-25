// ESM
import { faker } from '@faker-js/faker'

const generator = () => {
  return {
    id: faker.string.uuid(),
    createdTime: faker.date.past(),
    fields: {
      'Name': faker.commerce.productName(),
      'Flow Work Ref': faker.number.int(),
      'Flow Account ID': faker.number.int()
    }
  }
}

export default function (count) {
  return {
    records: faker.helpers.multiple(generator, { count })
  }
}