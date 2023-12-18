import styles from './TSSnackbar.module.scss';

import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

function TSSnackbar(props) {
  const { open, message, autoHideDuration = 6000, onClose, action } = props;
  return (
    <Snackbar
      className={styles.snackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <SnackbarContent
        className={styles.snackbarContent}
        message={message}
        action={action}
      />
    </Snackbar>
  );
}

export default TSSnackbar;
