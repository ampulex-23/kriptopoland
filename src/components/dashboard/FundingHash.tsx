import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogProps,
} from '@mui/material';
import { buttonClasses } from "../../helpers/buttonClasses";
import classNames from "classnames";

export interface FundingHashProps extends DialogProps {
  hashQrUrl: string;
  hash: string;
  onClose(): void;
}

const FundingHash = ({
  hash,
  hashQrUrl,
  onClose,
  ...props
}: FundingHashProps): JSX.Element => {
  return (
    <Dialog {...props} PaperProps={{ style: { maxWidth: '400px' } }}>
      <DialogTitle fontSize={24} fontWeight={'900'}>
        Реквизиты инвестиции
      </DialogTitle>
      <DialogContent>
        <img src={hashQrUrl} alt=''/>
        <span className={classNames('text-xs')}>{hash}</span>
      </DialogContent>
      <DialogActions sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={() => onClose()} className={classNames(buttonClasses(false), 'w-full')}>
          Закрыть
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default FundingHash;