import { IData } from "@/pages/api/extApi";
import styled from "styled-components";

const FixText = styled.span`
  margin-right: 15px;
`;

interface IProp {
  data: IData[];
  setChage: any;
  setOpt: any;
}

export default function FixList({ data, setChage, setOpt }: IProp) {
  return (
    <>
      {data.map((ext, i) => (
        <FixText key={i}>
          <input
            type="checkbox"
            defaultChecked={ext.checked === "Y" ? true : false}
            onClick={() => {
              ext.checked = ext.checked === "Y" ? "N" : "Y";
              setChage(ext);
              setOpt("update");
            }}
          />
          {ext.name}
        </FixText>
      ))}
    </>
  );
}
