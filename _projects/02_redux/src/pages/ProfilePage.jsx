import { useDispatch } from "react-redux";
import ProfileForm from "../components/ProfileForm";
import { capitilizeName, resetName } from "../redux/user/slice";

export default function ProfilePage() {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetName());
  };

  const handleCapitalize = () => {
    dispatch(capitilizeName());
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <p>Welcome to your profile page!</p>
      <ProfileForm />
      <button onClick={handleReset}>Сбросить имя</button>
      <button onClick={handleCapitalize}>Заглавить имя</button>
    </div>
  );
}
