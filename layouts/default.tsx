import UContainer from '../node_modules/@nuxt/ui/dist/runtime/components/layout/Container.vue';

export default defineComponent({
  setup(_, { slots }) {
    return () => [
      slots.default ? slots.default() : null,
      h(UContainer, { class: 'w-full max-w-md relative inset-x-0 pt-5' }, {
        default: () =>
          h('p', { class: 'note text-s' }, [
            'Demo based on ',
            h('a', { href: 'https://color-mode.nuxtjs.org' }, '@nuxtjs/color-mode'),
            ', ',
            h('a', { href: 'https://nuxt.com/modules/supabase' }, '@nuxtjs/supabase'),
            ', and ',
            h('a', { href: 'https://ui.nuxt.com/' }, '@nuxt/ui'),
            ' modules.',
          ]),
      }),
    ];
  },
});

