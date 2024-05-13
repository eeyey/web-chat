import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dialog, Message } from '../../../types';
import { fetchDialogs } from './asyncActions';

interface DialogState {
  dialogs: Dialog[];
  status: 'error' | 'success' | 'loading';
}

const initialState: DialogState = {
  dialogs: [],
  status: 'success',
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{ dialogId: number; message: Message }>,
    ) => {
      const { dialogId, message } = action.payload;

      const newDialogs = state.dialogs.map((dialog) => {
        if (dialog.id === dialogId) {
          return {
            ...dialog,
            messages: [...dialog.messages, message],
          };
        }
        return dialog;
      });

      const existingDialog = newDialogs.find(
        (dialog) => dialog.id === dialogId,
      );
      if (!existingDialog) {
        newDialogs.unshift({
          id: dialogId,
          messages: [message],
        });
      }

      state.dialogs = newDialogs;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDialogs.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchDialogs.fulfilled, (state, action) => {
        const dialogs = action.payload;

        dialogs.sort((a, b) => {
          const lastMsg1 = a.messages[a.messages.length - 1];
          const lastMsg2 = b.messages[b.messages.length - 1];

          if (lastMsg1.created_at > lastMsg2.created_at) return -1;
          if (lastMsg1.created_at < lastMsg2.created_at) return 1;

          return 0;
        });

        state.dialogs = [...dialogs];
        state.status = 'success';
      })
      .addCase(fetchDialogs.rejected, (state, action) => {
        state.status = 'error';
      });
  },
});

export const { reducer: dialogReducer, actions: dialogActions } = dialogSlice;
