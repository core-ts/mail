import { EmailData } from './EmailData';
import { MailData } from './MailData';

export * from './AttachmentData';
export * from './TrackingSettings';
export * from './EmailData';
export * from './MailData';
export * from './MailContent';
export * from './PersonalizationData';
export * from './MailSettings';
export * from './ASMOptions';

export interface MailConfig {
  provider?: string;
  from: EmailData;
  key: string;
  smtp?: SmtpConfig;
}
export interface Address {
  name: string;
  address: string;
}
export interface SmtpConfig {
  host: string;
  port: number;
  secure?: boolean;
  auth: Auth;
}
export interface Auth {
  user: string;
  pass: string;
}
export type Send = (mailData: MailData) => Promise<boolean>;
export type SendMail = Send;
export class MailService {
  constructor(public transporter: any) {
    this.send = this.send.bind(this);
  }
  send(m: MailData): Promise<boolean> {
    const mail = {
      from: getAddress(m.from),
      to: getToAddress(m.to),
      cc: getToAddress(m.cc),
      bcc: getToAddress(m.bcc),
      subject: m.subject,
      text: m.text,
      html: m.html,
    };
    return this.transporter.sendMail(mail).then(() => {
      return true;
    });
  }
}
export interface Address {
  name: string;
  address: string;
}
export function getAddress(mail: EmailData): Address | string {
  if (typeof mail === 'string') {
    return mail;
  } else {
    if (mail.name && mail.name.length > 0) {
      return { name: mail.name, address: mail.email };
    } else {
      return mail.email;
    }
  }
}
export function getAddressOnly(mail: EmailData): Address {
  if (typeof mail === 'string') {
    return { name: mail, address: mail };
  } else {
    if (mail.name && mail.name.length > 0) {
      return { name: mail.name, address: mail.email };
    } else {
      return { name: mail.email, address: mail.email };
    }
  }
}
export function getToAddress(mail?: EmailData | EmailData[]): Address | Address[] | string | undefined {
  if (!mail) {
    return undefined;
  }
  if (Array.isArray(mail)) {
    if (mail.length === 1) {
      return getAddress(mail[0]);
    } else if (mail.length === 0) {
      return undefined;
    } else {
      const arr: Address[] = [];
      for (const obj of mail) {
        const m = getAddressOnly(obj);
        arr.push(m);
      }
      return arr;
    }
  } else {
    return getAddress(mail);
  }
}
