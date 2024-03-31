export interface Gatito {
  id: string;
  width: number;
  height: number;
  url: string;
  breeds: {
    weight: {
      imperial: string;
      metric: string;
    };
    id: string;
    name: string;
    temperament: string;
    origin: string;
    country_codes: string;
    country_code: string;
    life_span: string;
    wikipedia_url: string;
  }[];
}

export interface UserInformation {
  userId: string;
  date: string;
  userDetails: {
    fullName: string;
    username: string;
    shippingInformation: {
      fullName: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
    };
    billingInformation: string; // Podría ser una cadena que indique si es la misma que la dirección de envío o no
    customerInformation: {
      customer: string;
      email: string;
      phone: string;
    };
    paymentInformation: {
      method: string;
      cardNumber: string;
    };
  };
}
