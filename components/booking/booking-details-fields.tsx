"use client";

import { BookingField } from "@/components/booking/booking-field";
import type { BookingFormValues } from "@/lib/booking-client";

type Props = {
  idPrefix?: string;
  values: BookingFormValues;
  onChange: (patch: Partial<BookingFormValues>) => void;
  labelClassName?: string;
};

export function BookingDetailsFields({
  idPrefix = "bk",
  values,
  onChange,
  labelClassName,
}: Props) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <BookingField
          label="Full name"
          htmlFor={`${idPrefix}-name`}
          labelClassName={labelClassName}
        >
          <input
            id={`${idPrefix}-name`}
            autoComplete="name"
            value={values.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="field-input"
            required
          />
        </BookingField>
        <BookingField
          label="Email"
          htmlFor={`${idPrefix}-email`}
          labelClassName={labelClassName}
        >
          <input
            id={`${idPrefix}-email`}
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className="field-input"
            required
          />
        </BookingField>
        <BookingField
          label="Phone / WhatsApp"
          htmlFor={`${idPrefix}-phone`}
          labelClassName={labelClassName}
        >
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className="field-input"
            required
          />
        </BookingField>
        <BookingField
          label="Business / brand name"
          htmlFor={`${idPrefix}-biz`}
          labelClassName={labelClassName}
        >
          <input
            id={`${idPrefix}-biz`}
            value={values.businessName}
            onChange={(e) => onChange({ businessName: e.target.value })}
            className="field-input"
            required
          />
        </BookingField>
      </div>
      <BookingField
        label="What would you like to focus on?"
        htmlFor={`${idPrefix}-topic`}
        labelClassName={labelClassName}
      >
        <textarea
          id={`${idPrefix}-topic`}
          rows={4}
          value={values.topic}
          onChange={(e) => onChange({ topic: e.target.value })}
          className="field-input resize-y"
          required
        />
      </BookingField>
    </>
  );
}
