import { setCardHeight } from "./setCardHeight.js";

export function cancelAddFormList(cardContentWrapper, formList) {
  formList.parentElement.removeChild(formList);
  setCardHeight(cardContentWrapper);
}
