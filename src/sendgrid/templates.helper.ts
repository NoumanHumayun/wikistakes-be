export function getTemplateIdByName(template: string) {
  switch (template) {
    case 'invite':
      return 'TEMPLATE_ID';
    case 'reschedule':
      return 'TEMPLATE_ID';
    case 'cancelled':
      return 'TEMPLATE_ID';
    case 'appointment':
      return 'TEMPLATE_ID';
    case 'appointmentAdmin':
      return 'TEMPLATE_ID';
    case 'verify':
      return 'TEMPLATE_ID';
    default:
      break;
  }
}
