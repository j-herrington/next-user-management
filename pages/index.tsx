import Account from '~/components/Account.tsx';
import Auth from '~/components/Auth.tsx';
import ColorMode from '~/components/ColorMode.tsx';
import UContainer from '../node_modules/@nuxt/ui/dist/runtime/components/layout/Container.vue';


export default ({
    setup() {
      const user = useSupabaseUser();
      return () =>
        h('div', [
          h(
            UContainer,
            { class: 'max-w-lg' },
            {
              default: () =>
                h(
                  'div',
                  {
                    class:
                      'border-b-2 border-secondary-500/50 rounded-tl-lg rounded-tr-lg p-2 flex mb-4',
                  },
                  [
                    h('h5', { class: 'flex-1 text-center' }, 'Nuxt Login Demo'),
                    h('div', { class: 'h-3 w-7 mb-6' }, [h(ColorMode)]),
                  ]
                ),
            }
          ),
          h(
            UContainer,
            { class: 'w-full max-w-lg' },
            {
              default: () => (user.value ? h(Account) : h(Auth)),
            }
          ),
        ]);
    },
  });