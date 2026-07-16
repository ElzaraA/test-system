const messages = [];

export const useMessageManager = () => ({
  addMessage: (text, type = "info") => {
    if (import.meta.env.MODE === "development") {
      console.log(`[${type}]`, text);
    }
    messages.push({ text, type });
  },
});
