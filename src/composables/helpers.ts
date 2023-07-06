export const capitalize = (string: string) => {
  return string[0].toUpperCase() + string.substring(1).toLowerCase();
};

export const isDesktop = () => {
  const desktopRes = window.matchMedia('(min-width: 1200px)');
  const mousePointer = window.matchMedia('(pointer: fine)');

  return desktopRes.matches && mousePointer.matches;
};

export const trimString = (value: string) => {
  return value.trimStart().trimEnd();
};
