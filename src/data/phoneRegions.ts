export interface ContactPhoneRegion {
  code: string;
  label: string;
  digitCounts: readonly number[];
}

export const CONTACT_PHONE_REGIONS: readonly ContactPhoneRegion[] = [
  { code: '+91', label: 'India', digitCounts: [10] },
  { code: '+1', label: 'US / Canada', digitCounts: [10] },
  { code: '+44', label: 'UK', digitCounts: [10] },
  { code: '+61', label: 'Australia', digitCounts: [9] },
  { code: '+64', label: 'New Zealand', digitCounts: [8, 9, 10] },
  { code: '+971', label: 'UAE', digitCounts: [9] },
  { code: '+966', label: 'Saudi Arabia', digitCounts: [9] },
  { code: '+974', label: 'Qatar', digitCounts: [8] },
  { code: '+92', label: 'Pakistan', digitCounts: [10] },
  { code: '+880', label: 'Bangladesh', digitCounts: [10] },
  { code: '+977', label: 'Nepal', digitCounts: [10] },
  { code: '+94', label: 'Sri Lanka', digitCounts: [9] },
  { code: '+65', label: 'Singapore', digitCounts: [8] },
  { code: '+60', label: 'Malaysia', digitCounts: [9, 10] },
  { code: '+62', label: 'Indonesia', digitCounts: [9, 10, 11, 12] },
  { code: '+63', label: 'Philippines', digitCounts: [10] },
  { code: '+66', label: 'Thailand', digitCounts: [9] },
  { code: '+81', label: 'Japan', digitCounts: [10] },
  { code: '+86', label: 'China', digitCounts: [11] },
  { code: '+49', label: 'Germany', digitCounts: [7, 8, 9, 10, 11] },
  { code: '+33', label: 'France', digitCounts: [9] },
  { code: '+353', label: 'Ireland', digitCounts: [7, 8, 9] },
  { code: '+31', label: 'Netherlands', digitCounts: [9] },
  { code: '+34', label: 'Spain', digitCounts: [9] },
  { code: '+39', label: 'Italy', digitCounts: [6, 7, 8, 9, 10, 11] },
  { code: '+55', label: 'Brazil', digitCounts: [10, 11] },
  { code: '+52', label: 'Mexico', digitCounts: [10] },
  { code: '+27', label: 'South Africa', digitCounts: [9] },
  { code: '+234', label: 'Nigeria', digitCounts: [10] },
  { code: '+254', label: 'Kenya', digitCounts: [9] },
];

export function isValidContactPhone(phone: string, regionCode: string): boolean {
  const region = CONTACT_PHONE_REGIONS.find(({ code }) => code === regionCode);
  const digitCount = phone.replace(/\D/g, '').length;
  return Boolean(region?.digitCounts.includes(digitCount));
}

export function getContactPhoneLengthHint(regionCode: string): string {
  const region = CONTACT_PHONE_REGIONS.find(({ code }) => code === regionCode);
  if (!region) return '';

  const counts = region.digitCounts;
  const countText = counts.length === 1
    ? `${counts[0]} digits`
    : `${counts.slice(0, -1).join(', ')} or ${counts[counts.length - 1]} digits`;
  return `${region.label} mobile numbers should have ${countText}.`;
}
