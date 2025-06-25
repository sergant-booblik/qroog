import { type Component, defineAsyncComponent, markRaw } from 'vue'

const Flag: Record<string, Component> = {
  'en-US': markRaw(defineAsyncComponent(() => import('./en-US.svg'))),
  'ru-RU': markRaw(defineAsyncComponent(() => import('./ru-RU.svg'))),
}

export default Flag;