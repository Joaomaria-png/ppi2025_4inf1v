import "./styles/theme.css";
import "./styles/global.css";
import { MyGrid } from "./components/MyGrid";
import { MyHeader } from "./components/MyHeader";
import { Myfooter } from "./components/MyFooter";
import { Bell } from 'lucide-react';
export default function App() {
  return (
    <>
      <MyHeader />
      <MyGrid />
      <Myfooter />
    </>
  );
}
