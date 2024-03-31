export const generateRandomFullName = (): string => {
  const firstNameList = [
    "John",
    "Jane",
    "Alice",
    "Bob",
    "Emma",
    "Michael",
    "Sophia",
    "William",
    "Olivia",
    "James",
  ];
  const lastNameList = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
  ];
  const randomFirstName =
    firstNameList[Math.floor(Math.random() * firstNameList.length)];
  const randomLastName =
    lastNameList[Math.floor(Math.random() * lastNameList.length)];
  return `${randomFirstName} ${randomLastName}`;
};

export const generateRandomUsername = (): string => {
  const usernameList = [
    "@user123",
    "@awesome_user",
    "@cool_dude",
    "@gamer_girl",
    "@travel_lover",
    "@foodie",
  ];
  return usernameList[Math.floor(Math.random() * usernameList.length)];
};

export const generateRandomAddress = (): string => {
  const streetList = [
    "123 Main St.",
    "456 Elm St.",
    "789 Oak St.",
    "101 Pine St.",
    "202 Maple St.",
  ];
  return streetList[Math.floor(Math.random() * streetList.length)];
};

export const generateRandomCity = (): string => {
  const cityList = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];
  return cityList[Math.floor(Math.random() * cityList.length)];
};

export const generateRandomState = (): string => {
  const stateList = [
    "NY",
    "CA",
    "IL",
    "TX",
    "AZ",
    "PA",
    "TX",
    "CA",
    "TX",
    "CA",
  ];
  return stateList[Math.floor(Math.random() * stateList.length)];
};

export const generateRandomZipCode = (): string => {
  return (Math.floor(Math.random() * 90000) + 10000).toString(); // Genera un número de 5 dígitos
};

export const generateRandomPhoneNumber = (): string => {
  return `+1 ${Math.floor(Math.random() * 900) + 100} ${
    Math.floor(Math.random() * 900) + 100
  } ${Math.floor(Math.random() * 10000) + 1000}`;
};

export const generateRandomCardNumber = (): string => {
  // Genera un número de tarjeta ficticio de 16 dígitos
  let cardNumber = "";
  for (let i = 0; i < 16; i++) {
    cardNumber += Math.floor(Math.random() * 10).toString();
    if ((i + 1) % 4 === 0 && i !== 15) {
      cardNumber += " "; // Añade un espacio cada 4 dígitos
    }
  }
  return cardNumber;
};
