const BOOLEANS = ['true', 'false'];

const parseBoolean = (value) => {
  if (!BOOLEANS.includes(value)) return;
  return value === 'true' ? true : false;
};

export const parseFilterParams = (query) => {
  return {
    isFavourite: parseBoolean(query.isFavourite),
  };
};
