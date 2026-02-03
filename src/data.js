export const API_KEY = "AIzaSyAREmZqPsVht71_fSFymt6WYgESWFSGXHI";

export const value_converter = (value) => {
  if (value >= 1_000_000) {
    return Math.floor(value / 1_000_000) + "M";
  } else if (value >= 1_000) {
    return Math.floor(value / 1_000) + "k";
  } else {
    return value;
  }
};
