import { useDispatch, useSelector } from "react-redux";
import { setName } from "../redux/user/slice";
import { selectName } from "../redux/user/selectors";
import { useEffect, useState } from "react";

export default function TextInput() {
  const defaultName = useSelector(selectName);

  const [name, setNameInput] = useState(defaultName);

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setName(name));
  };

  useEffect(() => {
    setNameInput(defaultName);
  }, [defaultName]);

  return (
    <div className="text-input">
      <input
        type="text"
        value={name}
        placeholder="Type something..."
        onChange={(e) => setNameInput(e.target.value)}
      />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}
