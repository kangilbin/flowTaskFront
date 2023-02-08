import { IData } from "@/pages/api/extApi";
import styled from "styled-components";

const AddBtn = styled.button`
  border-radius: 10px;
  margin: 3px;
  border: none;
  cursor: pointer;
  &:hover {
    scale: 1.1;
  }
`;

interface IProp {
  data: IData[];
  setChage: any;
  setOpt: any;
}

export default function CustomList({ data, setChage, setOpt }: IProp) {
  return (
    <>
      {data.map((ext, i) => (
        <AddBtn
          key={i}
          onClick={() => {
            setChage(ext);
            setOpt("delete");
          }}
        >
          {ext.name} x
        </AddBtn>
      ))}
    </>
  );
}
