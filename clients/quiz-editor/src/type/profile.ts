export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface Profile {
  id: number,
  email: string,
  username: string | undefined,
  locale: string,
  theme: Theme,
}