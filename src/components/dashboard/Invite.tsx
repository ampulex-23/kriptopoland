import React, { ChangeEvent, useState } from "react";
import { buttonClasses } from "../../helpers/buttonClasses";
import {
  Dialog,
  DialogProps,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material';
import { Lang, ReferalStatus, User } from "../../types/types";
import { locale } from "../../config/index.json";

export interface InviteProps extends DialogProps {
  onClose(): void;
  user: User;
  jwt: string;
  lang: Lang;
}

const Invite = ({ onClose, user, jwt, lang, ...props }: InviteProps): JSX.Element => {
  const [email, setEmail] = useState('');
  const {
    cancel,
    referals: {
      dialog: {
        titles, texts, actions
      }
    }
  } = locale;
  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }
  const createReferal = () => {
    const body = JSON.stringify({
      data: {
        email,
        master: user.id,
        status: ReferalStatus.pending
      },
    });
    fetch('http://212.39.67.73:88/api/referals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${jwt}`
      },
      body
    }).then(response => {
      response.json().then(() => {
        onClose();
      });
    })
    onClose();
  }
  return (
    <Dialog {...props}>
      <DialogTitle fontSize={24} fontWeight={'900'}>
        {titles[lang]}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{texts[lang]}</DialogContentText>
        <TextField
          InputProps={{
            style: {
              fontSize: '18px',
              fontWeight: 'bolder',
            },
          }}
          margin="normal"
          label="Email"
          fullWidth
          variant="standard"
          defaultValue={''}
          type="email"
          value={email}
          onChange={handleEmail}
        />
      </DialogContent>
      <DialogActions>
        <button onClick={() => onClose()} className={buttonClasses(true)}>
          {cancel[lang]}
        </button>
        <button
          onClick={() => createReferal()}
          className={buttonClasses(false)}
        >
          {actions[lang]}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default Invite;