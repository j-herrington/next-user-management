import type { Notification, NotificationColor } from "#ui/types";

export function useNotification() {
  const toast = useToast();

  const showToast = (title: string, message: string) => {
    let icon = "";
    let color: NotificationColor | undefined = undefined;
    let timeout = 0;

    if (title.toUpperCase().includes("SUCCESS")) {
      icon = "i-heroicons-check-circle";
      color = "primary";
      timeout = 15000;
    } else if (title.toUpperCase().includes("ERROR")) {
      icon = "i-heroicons-x-circle";
      color = "red";
    } else {
      timeout = 15000;
    }

    const notification: Partial<Notification> = {
      title,
      description: message,
      icon,
      timeout,
      color,
    };
    toast.add(notification);
  };

  return {
    showToast,
  };
}
