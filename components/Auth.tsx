import { object, string, type InferType } from 'yup';
import { useNotification } from '~/composables/useNotification';
import UForm from '../node_modules/@nuxt/ui/dist/runtime/components/forms/Form.vue';
import UFormGroup from '../node_modules/@nuxt/ui/dist/runtime/components/forms/FormGroup.vue';
import UInput from '../node_modules/@nuxt/ui/dist/runtime/components/forms/Input.vue';
import UButton from '../node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue';
import type { FormSubmitEvent } from '#ui/types';


type Schema = InferType<typeof schema>;

const schema = object({
  email: string().email('Invalid email').required('Required'),
});

export default ({
  setup() {
    const supabase = useSupabaseClient();
    const loading = ref(false);
    const disabled = ref(false);
    const { showToast } = useNotification();
    const state = reactive({ email: '' });

    const handleLogin = async (event: FormSubmitEvent<Schema>) => {
      loading.value = true;
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email: event.data.email,
        });
        if (error) {
          if (error.status === 429) {
            showToast('Login Error', 'Too many requests. Please try again later.');
          } else {
            showToast('Error', error.message);
          }
        } else {
          disabled.value = true;
          showToast('Success', 'Check your email for the login link!');
        }
      } catch (e: unknown) {
        showToast('Login Error', (e as Error).message);
      } finally {
        loading.value = false;
      }
    };

    return () =>
      h(UForm, {
        schema,
        state,
        class: 'space-y-4',
        onSubmit: handleLogin,
      }, {
        default: () => [
          h(UFormGroup, { label: 'Email', name: 'email' }, {
            default: () =>
              h(UInput, {
                modelValue: state.email,
                'onUpdate:modelValue': (value: string) => (state.email = value),
                disabled: disabled.value,
                icon: 'i-heroicons-at-symbol-20-solid',
                trailing: false,
                placeholder: 'Enter your email',
              }),
          }),
          h(UButton, {
            loading: loading.value,
            disabled: disabled.value,
            type: 'submit',
          }, {
            default: () => 'Submit',
          }),
        ],
      });
  },
});