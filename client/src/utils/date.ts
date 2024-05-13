export const weekDays = {
  short: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  full: [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ],
};

export const TODAY = new Date();
TODAY.setHours(0);
TODAY.setMinutes(0);
TODAY.setSeconds(0);
export const YESTERDAY = new Date(+TODAY - 3600 * 24 * 1000);
export const TOMMOROW = new Date(+TODAY + 3600 * 24 * 1000);
export const NEXT_WEEK = new Date(
  +TODAY + 86400000 * (TODAY.getDay() > 0 ? 8 - TODAY.getDay() : 1),
);

export const getHM = (date: Date) => {
  const h = appendZeroPrefix(date.getHours());
  const m = appendZeroPrefix(date.getMinutes());

  return `${h}:${m}`;
};

export const getDMY = (date: Date) => {
  const d = appendZeroPrefix(date.getDate());
  const m = appendZeroPrefix(date.getMonth() + 1);
  const y = appendZeroPrefix(date.getFullYear());

  return `${d}.${m}.${y}`;
};

export const getWeekDay = (date: Date, fullname: boolean = true) => {
  const day = date.getDay();

  return fullname ? weekDays.full[day] : weekDays.short[day];
};

export const getDialogString = (date: Date) => {
  if (+date < +TODAY - 7 * 24 * 3600 * 1000) {
    return getDMY(date);
  } else if (+date < +TODAY) {
    return getWeekDay(date, false);
  } else {
    return getHM(date);
  }
};

const appendZeroPrefix = (n: number | string) => {
  return +n < 10 ? `0${n}` : n.toString();
};
