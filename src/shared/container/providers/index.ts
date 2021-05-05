import { container } from 'tsyringe'
import { IDateProvider } from './DateProvider/IDateProvider'
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'
import { SESMailProvider } from './MailProvider/implementations/SESMailProvider'

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider)

const mailProvider = {
  ses: SESMailProvider,
  ethereal: EtherealMailProvider
}

container.registerSingleton<IMailProvider>(
  'MailProvider',
  process.env.MAIL_PROVIDER === 'ses' ? SESMailProvider : EtherealMailProvider
)
