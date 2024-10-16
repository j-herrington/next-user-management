import UTooltip from '../node_modules/@nuxt/ui/dist/runtime/components/overlays/Tooltip.vue';
import UButton from '../node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue';

export default ({
  setup() {
    const colorMode = useColorMode();
    
    const setColorMode = () => {
      colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
    };

    const toolTip = computed<string>(() =>
      colorMode.value === 'light' ? 'dark mode' : 'light mode'
    );

    const btnIcon = computed(() =>
      colorMode.value === 'light' ? 'i-heroicons-moon-solid' : 'i-heroicons-sun-solid'
    );

    return () =>
      h(UTooltip, { text: toolTip.value }, {
        default: () =>
          h(UButton, {
            variant: 'soft',
            icon: btnIcon.value,
            onClick: setColorMode,
            size: 'md'
          })
      });
  }
});
