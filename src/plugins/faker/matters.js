// ESM
import { faker } from '@faker-js/faker'

const generator = () => {
  return {
    id: faker.string.uuid(),
    createdTime: faker.date.past(),
    fields: {
      'Escalations Comments': [faker.string.uuid()],
      'Escalation ID': faker.number.int(),
      'Matter ID': faker.number.int(),
      'Proposed Markup': faker.commerce.productDescription(),
      'PB Issue': [faker.string.uuid()],
      'PB/Contract Part': [faker.string.uuid()],
      'Status': [faker.helpers.arrayElement(['Open', 'Closed'])],
      'Clients': [faker.string.uuid()],
      'Recommendation': faker.commerce.productDescription(),
      'Escalation Description': faker.commerce.productDescription(),
      'Short Description': faker.commerce.productDescription(),
      'Urgent': faker.helpers.arrayElement(['Yes', 'No']),
      'Counterparty Markup': faker.commerce.productDescription(),
      'Date Raised': faker.date.past(),
      'PB/Contract': [faker.string.uuid()],
      'Inhouse Legal Advisor': [faker.string.uuid()],
      'Work': [faker.string.uuid()],
      'Matter context': faker.commerce.productDescription(),
      'Clause Secondary': [faker.string.uuid()],
      'Work ID (from Work)': [String(faker.number.int())],
      'Work Filter': [String(faker.number.int())],
      'Days Open': faker.number.int(),
      'Clause Primary (from Clause Secondary) (from PB Issue)': [faker.string.uuid()],
      'Related Clause Description (from PB Issue)': [faker.commerce.productName()],
      'Clause Primary Name (from Clause Primary) (from Clause Secondary) (from PB Issue)': [faker.commerce.productName()],
      'Client ID (from Clients)': [faker.number.int()],
      'Client Filter': [faker.number.int()]
    }
  }
}

export default function (count) {
  return {
    records: faker.helpers.multiple(generator, { count })
  }
}