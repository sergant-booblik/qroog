import { type Component } from 'vue'

// Import SVG files directly as Vue components using vite-svg-loader
import EnUSFlag from './en-US.svg'
import RuRUFlag from './ru-RU.svg'

const Flag: Record<string, Component> = {
  'en-US': EnUSFlag as unknown as Component,
  'ru-RU': RuRUFlag as unknown as Component,
}

export default Flag;