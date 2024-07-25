// ESM
import { faker } from '@faker-js/faker'

const generator = () => {
  return {
    id: faker.string.uuid(),
    createdTime: faker.date.past(),
    fields: {
      'Name': faker.person.firstName() + ' ' + faker.person.lastName(),
      'Work': [faker.string.uuid()],
      'Escalations': [
          faker.string.uuid()
      ],
      'Work Filter': faker.commerce.productName()
    }
  }
}

export default function (count) {
  return {
    records: faker.helpers.multiple(generator, { count })
  }
}