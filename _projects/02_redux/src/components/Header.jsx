import { useSelector } from "react-redux";
import { selectName } from "../redux/user/selectors";

export default function Header() {
  const name = useSelector(selectName);
  return <header className="header">{name}</header>;
}
