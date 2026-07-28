/**
 * Inquiry form submission against `POST gramo/v1/inquiry`, with the Guard
 * fields the backend expects: `_gramo_t` (epoch seconds at mount — bots that
 * submit in under three seconds are rejected) and the `_gramo_hp` honeypot.
 */

import * as React from 'react';

import { postJson } from '@/lib/api';
import type { Locale } from '@/i18n/routes';

export type InquiryStatus = 'idle' | 'sending' | 'success' | 'error';

export interface InquiryFields {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  honeypot: string;
}

interface UseInquiryResult {
  status: InquiryStatus;
  submit: (fields: InquiryFields) => Promise<void>;
}

export function useInquiry(formType: string, locale: Locale): UseInquiryResult {
  const [status, setStatus] = React.useState<InquiryStatus>('idle');
  const mountedAt = React.useRef(Math.floor(Date.now() / 1000));

  const submit = React.useCallback(
    async (fields: InquiryFields) => {
      setStatus('sending');
      try {
        await postJson<{ ok: boolean }>('/inquiry', {
          type: formType,
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          company: fields.company,
          message: fields.message,
          locale,
          _gramo_t: mountedAt.current,
          _gramo_hp: fields.honeypot,
        });
        setStatus('success');
      } catch {
        setStatus('error');
      }
    },
    [formType, locale]
  );

  return { status, submit };
}
