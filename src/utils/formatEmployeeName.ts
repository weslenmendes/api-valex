export function formatEmployeeName(fullName: string) {
  const namesInArray: string[] = fullName.split(" ");

  const nameLengthLimit = 3;

  const formatName = (
    acc: string,
    currentName: string,
    currentIndex: number,
  ) => {
    const isFirstName = currentIndex === 0;
    const isLastName = currentIndex === namesInArray.length - 1;
    const isLongMiddleName =
      currentName.length >= nameLengthLimit && !isFirstName && !isLastName;

    if (isFirstName) return acc + currentName;

    if (isLastName) return `${acc} ${currentName}`;

    if (isLongMiddleName) return `${acc} ${currentName[0]}`;
    else return `${acc} ${currentName}`;
  };

  const formattedName = namesInArray.reduce(formatName, "").toUpperCase();

  return formattedName;
}
