import { useNotification } from '~/composables/useNotification';
import UAvatar from '../node_modules/@nuxt/ui/dist/runtime/components/elements/Avatar.vue';

export default ({
  props: {
    path: {
      type: String,
      required: true
    }
  },
  emits: ['update:path', 'upload'],
  setup(props, { emit }) {
    const { path } = toRefs(props);
    const supabase = useSupabaseClient();
    const uploading = ref(false);
    const src = ref('');
    const { showToast } = useNotification();

    const downloadImage = async () => {
      if (!path.value) return;
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path.value);
        if (error) {
          showToast('Error', error.message);
        } else {
          src.value = URL.createObjectURL(data as Blob | MediaSource);
        }
      } catch (e: unknown) {
        showToast('Error' + (e as Error).name, (e as Error).message);
      }
    };

    const uploadAvatar = async (evt: Event) => {
      const input = evt.target as HTMLInputElement;
      const file_input = input.files;
      try {
        uploading.value = true;

        if (!file_input || file_input.length === 0) {
          showToast('Error', 'You must select an image to upload.');
          return;
        }

        const file = file_input[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        emit('update:path', filePath);
        emit('upload');
      } catch (e: unknown) {
        showToast('Error' + (e as Error).name, (e as Error).message);
      } finally {
        uploading.value = false;
      }
    };

    downloadImage();

    watch(path, () => {
      if (path.value) {
        downloadImage();
      }
    });

    return () =>
      h('div', [
        h(UAvatar, {
          alt: 'Avatar',
          icon: 'i-heroicons-photo',
          src: src.value,
          size: 'xl'
        }),
        h('div', { class: 'upload-btn' }, [
          h('input', {
            type: 'file',
            id: 'single',
            accept: 'image/*',
            onChange: uploadAvatar,
            disabled: uploading.value,
            class:
              'block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
          })
        ])
      ]);
  }
});
