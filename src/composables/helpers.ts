export const isDesktop = () => {
  const desktopRes = window.matchMedia('(min-width: 1200px)');
  const mousePointer = window.matchMedia('(pointer: fine)');

  return desktopRes.matches && mousePointer.matches;
};

export const trimString = (value: string) => {
  return value.trimStart().trimEnd();
};
