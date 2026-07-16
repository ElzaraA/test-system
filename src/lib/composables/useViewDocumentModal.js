import { ref, shallowRef } from "vue";
import { MOCK_DOCUMENTS } from "../auth/mockData";

const visible = ref(false);
const documentId = ref(null);
const documentContent = shallowRef(null);

export const useViewDocumentModal = () => {
  const open = (docId) => {
    documentId.value = docId;
    documentContent.value = MOCK_DOCUMENTS[docId] ?? {
      title: "Документ",
      content: "Демонстрационный документ.",
    };
    visible.value = true;
  };

  const close = () => {
    visible.value = false;
    documentId.value = null;
    documentContent.value = null;
  };

  return { visible, documentId, documentContent, open, close };
};
