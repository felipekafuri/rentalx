import { IMailProvider } from '../IMailProvider'

class InMemoryMailProvider implements IMailProvider {
  private message: any[] = []

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.message.push({
      to,
      variables,
      path
    })
  }
}

export { InMemoryMailProvider }
