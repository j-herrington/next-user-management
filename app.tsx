import  UNotifications  from "./node_modules/@nuxt/ui/dist/runtime/components/overlays/Notifications.vue"
import NuxtLayout from "./node_modules/nuxt/dist/app/components/nuxt-layout"
import NuxtPage from "./node_modules/nuxt/dist/pages/runtime/page"

export default ({
  setup() {
    return () => [
      h(NuxtLayout, null, {
        default: () => h(NuxtPage),
      }),
      h(UNotifications),
    ];
  },
});
