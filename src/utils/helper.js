export const truncateDescription = (text, wordLimit = 15) => {
  if (!text) return "";

  const words = text.trim().split(/\s+/);

  if (words.length <= wordLimit) {
    return text;
  }

  return words.slice(0, wordLimit).join(" ") + " ....";
};
