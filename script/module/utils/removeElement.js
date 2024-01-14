export function removeElement(target) {
  target.style.maxHeight = `${target.scrollHeight}px`;
  target.style.overflow = "hidden";
  setTimeout(() => {
    target.style.transition = "all 300ms";
    target.style.maxHeight = "0";
    target.style.paddingBlock = "0";
  }, 300);
  setTimeout(() => {
    target.parentElement.removeChild(target);
    // renderCards();
  }, 600);
}
