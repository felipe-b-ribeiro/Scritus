import { useMemo } from "react";
import styled from "styled-components";
import useNavigateCustom from "../../hooks/useNavigateCustom";

const PALETA = [
  "#cb8446", "#d39255", "#e0a166", "#edae78", "#f0b98a",
  "#5b4028", "#6a4a30", "#795538", "#896041", "#9a6c4b",
  "#E89953", "#f0a767", "#f6b57b", "#f9c28f", "#ffd0a4",
  "#b66f36", "#c77d3f", "#d88c4a", "#e99b55", "#ffac61",
  "#8c5e32", "#9d6a3a", "#ad7643", "#be824c", "#ce8f56",
  "#a86b3f", "#b8784a", "#c88655", "#d99460", "#eaa26c"
];

function TagsList({ tags }) {
  // embaralha só uma vez quando o componente monta
  const { goTo } = useNavigateCustom();
  const cores = useMemo(() => {
    const arr = [...PALETA];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  return (
    <div style={{marginLeft: '20px', display: 'flex', gap: '5px', padding: '10px 0'}}>
      {tags.map((tag, i) => (
        <Tag key={tag} cor={cores[i % cores.length]} onClick={() => goTo(`/tag/${tag.replace(/ /g, "_")}`)}>
          {tag}
        </Tag>
      ))}
    </div>
  );
}

const SC_Tag = styled.span`
    color: ${props => props.cor || 'black'};
    border: 1px solid ${props => props.cor || 'black'};
    padding: 6px 12px;
    border-radius: 12px;
    margin-right: 6px;
    user-select: none;
    font-family: 'Raleway';
    transition: 0.4s ease-out;

    &:hover {
        background-color: ${props => props.cor || 'black'};
        color: white;
        cursor: pointer;
    }

`;


function Tag({ cor, children, onClick}) {
  return (
    <SC_Tag cor={cor} onClick={onClick}>
      {children}
    </SC_Tag>
  );
}

export default TagsList;