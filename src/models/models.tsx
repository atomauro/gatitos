export interface Gatito {
  id: string;
  width: number;
  height: number;
  url: string;
  breeds: Breed[];
}

export interface Breed {
  weight: Weight;
  id: string;
  name: string;
  cfa_url: string;
  vetstreet_url: string;
  vcahospitals_url: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap: number;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
}

export interface Weight {
  imperial: string;
  metric: string;
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
