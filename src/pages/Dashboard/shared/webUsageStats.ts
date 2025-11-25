// Data derived from https://gs.statcounter.com/os-market-share/desktop/worldwide/2023
// And https://gs.statcounter.com/os-market-share/mobile/worldwide/2023
// And https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/worldwide/2023
// For the month of December 2023

export const desktopOS = [
  {
    id: "Apex",
    label: "Apex",
    value: 72.72,
  },
  {
    id: "Free",
    label: "Free",
    value: 16.38,
  },
  {
    id: "Spark",
    label: "Spark",
    value: 3.83,
  },
  {
    id: "Flow",
    label: "Flow",
    value: 2.42,
  },
  {
    id: "Welcome Pass",
    label: "Welcome Pass",
    value: 4.65,
  },
];

export const mobileOS = [
  {
    id: "Android",
    label: "Android",
    value: 70.48,
  },
  {
    id: "iOS",
    label: "iOS",
    value: 28.8,
  },
  {
    id: "Other",
    label: "Other",
    value: 0.71,
  },
];

export const platforms = [
  {
    id: "Mobile",
    label: "Mobile",
    value: 59.12,
  },
  {
    id: "Desktop",
    label: "Desktop",
    value: 40.88,
  },
];

const normalize = (v: number, v2: number) =>
  Number.parseFloat(((v * v2) / 100).toFixed(2));

export const mobileAndDesktopOS = [
  ...desktopOS.map((v) => ({
    ...v,
    label: v.label === "Other" ? "Other (Desktop)" : v.label,
    value: normalize(v.value, platforms[1].value),
  })),
];

export const valueFormatter = (item: { value: number }) => `${item.value}%`;
