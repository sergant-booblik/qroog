export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface Profile {
  id: number,
  email: string,
  username: string,
  imageUrl: string | undefined,
  isBLocked: boolean,
  locale: string,
  theme: Theme,
}