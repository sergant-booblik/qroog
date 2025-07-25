import type { Component } from 'vue'

export interface SelectItem {
  icon?: Component | string,
  label: string,
  value: unknown,
}
export enum SelectColor {
  SECONDARY = 'secondary',
  GHOST = 'ghost',
}
