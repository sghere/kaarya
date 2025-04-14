import { useState } from "react";

const useToggle = (): [boolean, () => void] => {
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => setIsToggled((prev) => !prev);
  return [isToggled, toggle];
};

export default useToggle;
