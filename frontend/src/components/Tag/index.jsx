import { useMemo } from "react";
import styled from "styled-components";
import useNavigateCustom from "../../hooks/useNavigateCustom";

const PALETA = [
  "#cb8446",
  "#d39255",
  "#e0a166",
  "#edae78",
  "#f0b98a",
  "#5b4028",
  "#6a4a30",
  "#795538",
  "#896041",
  "#9a6c4b",
  "#E89953",
  "#f0a767",
  "#f6b57b",
  "#f9c28f",
  "#ffd0a4",
  "#b66f36",
  "#c77d3f",
  "#d88c4a",
  "#e99b55",
  "#ffac61",
  "#8c5e32",
  "#9d6a3a",
  "#ad7643",
  "#be824c",
  "#ce8f56",
  "#a86b3f",
  "#b8784a",
  "#c88655",
  "#d99460",
  "#eaa26c",
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
    <SC_TagList>
      {tags.map((tag, i) => (
        <button
          key={tag}
          type="button"
          style={{ "--tag-color": cores[i % cores.length] }}
          onClick={() => goTo(`/tag/${tag.replace(/ /g, "_")}`)}
          onKeyDown={(e) => e.key === 'Enter' && goTo(`/tag/${tag.replace(/ /g, "_")}`)}
        >
          {tag}
        </button>
      ))}
    </SC_TagList>
  );
}

const SC_TagList = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  flex-wrap: wrap;

  > button {
    color: var(--tag-color, black);
    border: 1px solid var(--tag-color, black);
    background-color: transparent;
    padding: 6px 12px;
    border-radius: 12px;
    user-select: none;
    white-space: nowrap;
    font-family: 'Raleway';
    transition: 0.4s ease-out;

    &:hover {
        background-color: var(--tag-color, black);
        color: white;
        cursor: pointer;
    }
  }

`;

function _Tag({ cor, children, onClick }) {
  return (
    <SC_Tag cor={cor} onClick={onClick}>
      {children}
    </SC_Tag>
  );
}

export default TagsList;
