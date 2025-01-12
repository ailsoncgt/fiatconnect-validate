import yargs from 'yargs'
import * as dotenv from 'dotenv'
import path from 'path'
import { MOCK_FIAT_ACCOUNTS } from './mock-data/fiat-account'
import { MOCK_KYC } from './mock-data/kyc'
import { Wallet } from 'ethers'
import { MOCK_QUOTE } from './mock-data/quote'

dotenv.config()

export const config = yargs
  .env('')
  .option('test-private-key', {
    description:
      'Private key to use for testing. Should be a dummy/unused value. ' +
      '(Do NOT use a private key for an account with real funds!!) Defaults to randomly generated.',
    type: 'string',
    default: Wallet.createRandom().privateKey,
  })
  .option('base-url', {
    description: 'Base URL for FiatConnect API',
    type: 'string',
    demandOption: true,
  })
  .option('openapi-spec', {
    description: 'OpenAPI 2.0 specification file to test against',
    type: 'string',
    demandOption: true,
    coerce: (arg) => path.resolve(arg),
  })
  .option('client-api-key', {
    description: 'Client API key',
    type: 'string',
    demandOption: false,
  })
  .option('provider-id', {
    description: 'Provider ID',
    type: 'string',
    demandOption: false,
  })
  .option('quote-in-mock', {
    description:
      'Mock data to use for a transfer in quote that should be offered',
    type: 'string',
    demandOption: true,
    example: 'quoteInNigeriaCUSD',
    options: Object.keys(MOCK_QUOTE),
    default: '',
  })
  .option('quote-out-mock', {
    description:
      'Mock data to use for a transfer out quote that should be offered',
    type: 'string',
    demandOption: true,
    example: 'quoteOutNigeriaCUSD',
    options: Object.keys(MOCK_QUOTE),
  })
  .option('fiat-account-mock', {
    description: 'Fiat account mock data to use',
    type: 'string',
    demandOption: true,
    example: 'accountNumberNigeria',
    options: Object.keys(MOCK_FIAT_ACCOUNTS),
  })
  .option('kyc-mock', {
    description: 'KYC mock data to use',
    type: 'string',
    demandOption: true,
    example: 'personalDataAndDocumentsNigeria',
    options: Object.keys(MOCK_KYC),
  })
  .help()
  .parseSync()
