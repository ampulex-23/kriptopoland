import React, { useState, MouseEvent, ChangeEvent } from "react";
import {
  Dialog,
  DialogProps,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { Currency, FundingStatus, Lang, User } from "../../types/types";
import { getCurrencyIcon } from "../../helpers";
import classNames from "classnames";
import { buttonClasses } from "../../helpers/buttonClasses";

export interface NewFundingProps extends DialogProps {
  user: User;
  onClose(): void;
  jwt: string;
  lang: Lang;
  config: any;
}

const CURRENCIES = [
  Currency.LTC,
  Currency.XRP,
  Currency.ADA,
];

const NewFunding = ({
  user,
  onClose,
  jwt,
  lang,
  config: { locale },
  ...props
}: NewFundingProps): JSX.Element => {
  const [currency, setCurrency] = useState<Currency>(Currency.LTC);
  const [amount, setAmount] = useState<string>('0');

  const {
    cancel,
    amount: sum,
    fundings: {
      dialog: { actions, texts, titles },
    },
  } = locale;

  const handleCurrency = (
    _: MouseEvent<HTMLElement>,
    newCurrency: Currency
  ) => {
    setCurrency(newCurrency);
  };

  const handleAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const createFunding = () => {
    const body = JSON.stringify({
      data: {
        currency,
        amount: +amount,
        user: user.id,
        status: FundingStatus.pending,
      },
    });
    fetch('http://212.39.67.73:88/api/fundings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${jwt}`,
      },
      body,
    }).then((response) => {
      response.json().then(() => {
        onClose();
      });
    });
    onClose();
  };

  return (
    <Dialog {...props}>
      <DialogTitle fontSize={24} fontWeight={'900'}>
        {titles[lang]}
      </DialogTitle>
      <DialogContent>
        <DialogContentText fontSize={20} marginBottom={2}>
          {texts[lang]}
        </DialogContentText>
        <ToggleButtonGroup value={currency} exclusive onChange={handleCurrency}>
          {CURRENCIES.map((c, key) => (
            <ToggleButton value={c} key={key}>
              <img
                src={getCurrencyIcon(c)}
                className={classNames('w-10', 'h-10')}
              />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <TextField
          InputProps={{
            style: {
              fontSize: '28px',
              fontWeight: 'bolder',
            },
          }}
          margin="normal"
          label={sum[lang]}
          fullWidth
          variant="standard"
          defaultValue={1}
          value={amount}
          onChange={handleAmount}
        />
      </DialogContent>
      <DialogActions>
        <button onClick={() => onClose()} className={buttonClasses(true)}>
          {cancel[lang]}
        </button>
        <button
          onClick={() => createFunding()}
          className={buttonClasses(false)}
        >
          {actions[lang]}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default NewFunding;