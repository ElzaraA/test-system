export const useConfirmModal = () => ({
  ask: async (title, body, confirmLabel = "OK", cancelLabel = "Отмена") => {
    return window.confirm([title, body, `${confirmLabel} / ${cancelLabel}`].filter(Boolean).join("\n\n"));
  },
});
