export type Me = {
  id: string;
  email: string;
  phoneNumber: {
    countryCode: string;
    phoneNumber: string;
  };
  lastName: string;
  firstName: string;
  balance: {
    amount: number;
    currency: {
      code: string;
      symbol: string;
    };
  };
};
