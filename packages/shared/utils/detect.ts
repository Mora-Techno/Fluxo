export const detectIdentifier = (identifier: string) => {
  const value = identifier.trim();

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhone = /^(\+62|62|0)8[1-9][0-9]{6,11}$/.test(value);

  if (isEmail) {
    return { email: value };
  }

  if (isPhone) {
    return { phone: value };
  }

  return { username: value };
};

export const detect2Identifier = (identifier: string) => {
  const value = identifier.trim();

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  if (isEmail) {
    return { email: value };
  } else {
    return { phone: value };
  }
};
