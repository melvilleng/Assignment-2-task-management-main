import { useState, useEffect } from "react";

export const usePasswordValidation = ({
  password = "",
  requiredLength = 8,
  max_Lengthcheck = 10,
}) => {
  const [validLength, setValidLength] = useState(null);
  const [max_Length, setmax_Length] = useState(null);
  const [hasNumber, setHasNumber] = useState(null);
  const [upperCase, setUpperCase] = useState(null);
  const [lowerCase, setLowerCase] = useState(null);
  const [specialChar, setSpecialChar] = useState(null);

  useEffect(() => {
    setValidLength(password.length >= requiredLength ? true : false);
    setmax_Length(password.length < max_Lengthcheck ? false : true);
    setUpperCase(password.toLowerCase() !== password);
    setLowerCase(password.toUpperCase() !== password);
    setHasNumber(/\d/.test(password));
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password));
  }, [password, requiredLength, max_Lengthcheck]);

  return [
    validLength,
    hasNumber,
    upperCase,
    lowerCase,
    max_Length,
    specialChar,
  ];
};
