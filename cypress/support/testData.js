import { faker } from '@faker-js/faker'

export const validPassword = '!@#Qwe789'

const generateEmail = () => {
  const emailSuffix = faker.string.alphanumeric(12).toLowerCase()

  return `oleksi.lantuh.${emailSuffix}@example.com`
}

export const validUser = () => {
  return {
    name: 'Oleksi',
    lastName: 'Lantuh',
    email: generateEmail(),
    password: validPassword,
  }
}

export const invalidRegistrationData = {
  name: {
    invalidFormat: '123',
    tooShort: 'A',
    tooLong: 'A'.repeat(21),
  },
  lastName: {
    invalidFormat: '123',
    tooShort: 'B',
    tooLong: 'B'.repeat(21),
  },
  email: {
    invalidFormat: 'wrong-email',
  },
  password: {
    tooShort: 'qwerty',
    withoutNumberAndCapital: 'qwertyui',
    withoutSmallLetter: 'QWERTY123',
    tooLong: 'Qwerty1234567890',
  },
  repeatPassword: {
    mismatch: 'Qwerty321',
  },
}
