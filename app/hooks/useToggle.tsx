import { MouseEventHandler, useState } from "react";

const useToggle = () => {
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => setIsToggled((prev) => !prev);
  return [isToggled, toggle];
};

export default useToggle;
