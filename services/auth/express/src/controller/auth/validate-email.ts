import { type ErrorDetail } from '@libs/shared-types';

const REGEX_HAS_SPACE = new RegExp('\\s');

export function validateEmail(email: string): ErrorDetail[] {
  const emailErrors: ErrorDetail[] = [];

  if (!email) {
    emailErrors.push({ label: 'Error.Auth.Email.Validate.empty' });
    return emailErrors;
  }

  if (REGEX_HAS_SPACE.test(email)) {
    emailErrors.push({ label: 'Error.Auth.Email.Validate.space' });
  }

  if (!email.includes('@')) {
    emailErrors.push({ label: 'Error.Auth.Email.Validate.at' });
  } else {
    const [localPart, domainPart] = email.split('@');

    if (!localPart) {
      emailErrors.push({ label: 'Error.Auth.Email.Validate.localPart' });
    }

    if (!domainPart) {
      emailErrors.push({ label: 'Error.Auth.Email.Validate.domainPart' });
    } else if (!domainPart.includes('.')) {
      emailErrors.push({ label: 'Error.Auth.Email.Validate.point' });
    } else {
      const domainParts = domainPart.split('.');
      if (domainParts.some(part => part.length === 0) && domainParts.length > 2) {
        emailErrors.push({ label: 'Error.Auth.Email.Validate.empties' });
      }
      const tld = domainParts[domainParts.length - 1];
      if (tld.length < 2) {
        emailErrors.push({ label: 'Error.Auth.Email.Validate.highLevelDomain' });
      }
    }
  }

  return emailErrors;
}