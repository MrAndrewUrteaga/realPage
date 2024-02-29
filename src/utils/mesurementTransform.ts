export const mesurementTransform = (data: Record<string, number>) => {
  return Object.entries(data).map((item) => ({
    rowName: item[0],
    rowValue: item[1],
  }));
};
