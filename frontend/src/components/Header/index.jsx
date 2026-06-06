import { SC_Header } from "./styles";

export default function Header({ left, right, center }) {
  return (
    <SC_Header>
      <div>{left}</div>
      <div>{center}</div>
      <div>{right}</div>
    </SC_Header>
  );
}
