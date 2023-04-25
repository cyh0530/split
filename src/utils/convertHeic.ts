import heic2any from "heic2any";

export const convertHeic = async (file: File): Promise<Blob | undefined> => {
  const converted = await heic2any({
    blob: file,
  });
  if (converted instanceof Blob) {
    return converted;
  } else if (converted.length > 0) {
    return converted[0];
  }
};
