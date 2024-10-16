import { object, string, type InferType } from 'yup';
import { useNotification } from '~/composables/useNotification';
import UCard from '../node_modules/@nuxt/ui/dist/runtime/components/layout/Card.vue';
import UForm from '../node_modules/@nuxt/ui/dist/runtime/components/forms/Form.vue';
import UFormGroup from '../node_modules/@nuxt/ui/dist/runtime/components/forms/FormGroup.vue';
import UInput from '../node_modules/@nuxt/ui/dist/runtime/components/forms/Input.vue';
import UButton from '../node_modules/@nuxt/ui/dist/runtime/components/elements/Button.vue';
import Avatar from '~/components/Avatar.tsx';
import type { FormSubmitEvent } from '#ui/types';

type Schema = InferType<typeof schema>;

const schema = object({
  username: string().required('Required'),
  website: string().url('Must be a valid URL').required('Required'),
});

export default ({
  setup() {
    const { showToast } = useNotification();
    const user = useSupabaseUser();
    const supabase = useSupabaseClient();
    const loading = ref(false);

    const state = reactive({
      email: '',
      username: '',
      website: '',
      avatar_url: '',
    });

    const initialState = reactive({
      username: '',
      website: '',
    });

    const isChanged = computed(() => {
      return state.username !== initialState.username || state.website !== initialState.website;
    });

    onMounted(async () => {
      loading.value = true;
      if (user.value) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('username, website, avatar_url')
            .eq('id', user.value.id)
            .single();

          if (error) {
            showToast('Error fetching profile', error.message);
            if (error.details === 'The result contains 0 rows') {
              showToast('Error', 'Profile not found for the user.');
            } else {
              showToast('Error', error.message || 'Unknown error');
            }
          } else {
            state.email = user.value.email || '';
            state.username = data.username || '';
            state.website = data.website || '';
            state.avatar_url = data.avatar_url || '';
            initialState.username = data.username || '';
            initialState.website = data.website || '';
          }
        } catch (e) {
          showToast('Error', (e as Error).message);
        }
      } else {
        showToast('Error', 'No user found');
      }

      loading.value = false;
    });

    const updateProfile = async (event: FormSubmitEvent<Schema>) => {
      loading.value = true;

      if (!user.value) {
        showToast('Error', 'User not logged in');
        loading.value = false;
        return;
      }

      if (!state.username || !state.website) {
        showToast('Error', 'Username and Website fields cannot be empty');
        loading.value = false;
        return;
      }

      const updates = {
        id: user.value.id,
        username: state.username,
        website: state.website,
        avatar_url: state.avatar_url,
        updated_at: new Date(),
      };

      try {
        let { error } = await supabase
          .from('profiles')
          .upsert(updates, { returning: 'minimal' });
        if (error) {
          showToast('Error', error.message);
        } else {
          showToast('Profile updated', 'Your profile has been updated successfully');
          initialState.username = state.username;
          initialState.website = state.website;
        }
      } catch (e) {
        showToast('Error', (e as Error).message);
      } finally {
        loading.value = false;
      }
    };

    const signOut = async () => {
      try {
        loading.value = true;
        const { error } = await supabase.auth.signOut();
        if (error) {
          showToast('Error', error.message);
        } else {
          showToast('Success', 'Signed out successfully');
        }
      } catch (e) {
        showToast('Error', (e as Error).message);
      } finally {
        loading.value = false;
      }
    };

    return () =>
      h(UCard, { class: 'mt-2' }, {
        default: () => [
          h(UForm, {
            schema,
            state,
            class: 'space-y-4',
            onSubmit: updateProfile,
          }, {
            default: () => [
              h(Avatar, {
                path: state.avatar_url,
                'onUpdate:path': (value: string) => (state.avatar_url = value),
                onUpload: updateProfile,
              }),
              h(UFormGroup, { label: 'Email', name: 'email' }, {
                default: () =>
                  h(UInput, {
                    disabled: true,
                    trailing: false,
                    icon: 'i-heroicons-at-symbol-20-solid',
                    modelValue: state.email,
                  }),
              }),
              h(UFormGroup, { label: 'Username', name: 'username' }, {
                default: () =>
                  h(UInput, {
                    modelValue: state.username,
                    'onUpdate:modelValue': (value: string) => (state.username = value),
                    trailing: false,
                    icon: 'i-heroicons-user-circle-20-solid',
                  }),
              }),
              h(UFormGroup, { label: 'Website', name: 'website' }, {
                default: () =>
                  h(UInput, {
                    modelValue: state.website,
                    'onUpdate:modelValue': (value: string) => (state.website = value),
                    type: 'url',
                    trailing: false,
                    icon: 'i-heroicons-link-20-solid',
                  }),
              }),
              h(UButton, {
                loading: loading.value,
                disabled: !isChanged.value,
                type: 'submit',
                variant: 'outline',
              }, {
                default: () => (loading.value ? 'Loading ...' : 'Update'),
              }),
              h(UButton, {
                variant: 'ghost',
                color: 'rose',
                class: 'mt-4 ml-2',
                onClick: signOut,
                disabled: loading.value,
              }, {
                default: () => 'Sign Out',
              }),
            ],
          }),
        ],
      });
  },
});