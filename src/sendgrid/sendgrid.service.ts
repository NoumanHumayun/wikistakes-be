import { Injectable } from '@nestjs/common';
import { setApiKey, send } from '@sendgrid/mail';
import { getTemplateIdByName } from './templates.helper';

@Injectable()
export class SendgridService {
  constructor() {
    setApiKey(
      'SENDGRID_KEY'
    );
  }

  sendEmail(template: string, to: string[], payload?: any) {
    const from = template.includes('invite')
      ? 'no-reply@kwikisweeps.com'
      : 'no-reply@kwikisweeps.com';
      
    const msg = {
      to: to,
      from: from,
      templateId: getTemplateIdByName(template),
      dynamicTemplateData: payload
    };
    send(msg)
      .then(() => {
        return 'Invites Sent Succesfully!';
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
