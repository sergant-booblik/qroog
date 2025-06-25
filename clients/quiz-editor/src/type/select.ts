import type { Component } from 'vue'

export interface SelectItem {
  icon?: Component,
  label: string,
  value: unknown,
}