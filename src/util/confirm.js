import {createConfirmation} from 'react-confirm';
import ModalDlg from '../components/ModalDlg';
import {Dialogs} from '../constants';


// create confirm function
const dlg = createConfirmation(ModalDlg);

/* // This is optional. But I recommend to define your confirm function easy to call.
export default function(confirmation, options = {}) {
  // You can pass whatever you want to the component. These arguments will be your Component's props
  return confirm({ confirmation, options });
}
 */


export function msgOk(translate, msgKey) {
    return dlg({translate, dialog: Dialogs.MSG_OK, status: 'ok', msgKey})
}

export function msgErr(translate, msgKey) {
    return dlg({translate, dialog: Dialogs.MSG_ERR, status: 'err', msgKey})
}

export default function confirmDeleteUser(translate, user) {
    return dlg({translate, dialog: Dialogs.CONFIRM_DELETE_USER, status: 'confirm', user})
}

export function msgDeleteUserOk(translate, user) {
    console.debug('msgDeleteUserOk', translate);
    return dlg({translate, dialog: Dialogs.MSG_USER_DELETE_OK, status: 'ok', user})
}