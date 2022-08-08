import { showNotification } from '@mantine/notifications';
import { Check, AlertCircle } from 'tabler-icons-react';

import uniqueId from 'lodash/uniqueId';

export const notificationSuccess = ({ id, title, color, icon }) => {
  return showNotification({
    id: id || uniqueId('NotificationSuccess'),
    disallowClose: true,
    title: title || "Success",
    color: color || 'success',
    styles: (theme) => ({
      root: {
        width: "fit-content",
        marginLeft: "auto",
        backgroundColor: theme.colors.dark[6],
        borderColor: theme.colors.dark[6],
        '&::before': { backgroundColor: theme.white },
      },
      title: { color: theme.colors.white[1] },
      description: { color: theme.colors.dark[1] },
    }),
    icon: icon || <Check />,
  });
}

export const notificationError = ({ id, title, color, icon, message }) => {
  return showNotification({
    id: id || uniqueId('NotificationError'),
    disallowClose: true,
    title: title || "Error",
    message: message || null,
    color: color || 'secondary',
    styles: (theme) => ({
      root: {
        width: "fit-content",
        marginLeft: "auto",
        backgroundColor: theme.colors.error[6],
        borderColor: theme.colors.error[6],
        '&::before': { backgroundColor: theme.white },
      },
      title: { color: theme.white },
      description: { color: theme.white },
    }),
    icon: icon || <AlertCircle />,
  });
}