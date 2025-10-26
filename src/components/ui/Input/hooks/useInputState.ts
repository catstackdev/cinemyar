import { useState } from "react";

const useInputState = (initialValue: string = "") => {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const reset = () => {
    setValue(initialValue);
    setTouched(false);
  };

  return {
    value,
    touched,
    handleChange,
    handleBlur,
    reset,
  };
};
export default useInputState;
