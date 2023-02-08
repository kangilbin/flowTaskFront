import CustomList from "@/components/CustomList";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";
import FixList from "./../components/FixList";
import {
  delExtList,
  getExtList,
  IData,
  IGetExtList,
  postExtList,
  putExtList,
} from "./api/extApi";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
const Grid = styled.div`
  display: grid;
  height: 50vh;
  width: 50vw;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(10, 1fr);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 3px 3px 5px 3px rgb(190 190 190);
`;
const GridTTL = styled.div`
  grid-column: span 10;
  grid-row: span 2;
  align-items: center;
  font-weight: bold;
  font-size: 2rem;
  border-top: 1px solid;
  border-bottom: 3px double;
  padding: 20px;
  align-self: center;
`;

const GridCTT = styled.div`
  grid-column: span 10;
  grid-row: span 1;
  padding: 10px;
`;

const ExtText = styled.div`
  grid-column: span 2;
  grid-row: span 1;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const FixBox = styled.div`
  grid-column: span 8;
  grid-row: span 1;
  align-self: center;
`;

const CustomBox = styled.input`
  border-radius: 10px;
  grid-column: span 6;
  grid-row: span 1;
  padding: 10px;
  border: 1px solid;
`;
const Button = styled.button`
  grid-column: span 2;
  grid-row: span 1;
  border-radius: 15px;
  border: none;
  margin: 3px;
  color: white;
  background: #bbbaba;
  font-weight: bold;
  cursor: pointer;
`;

const CustomBigBox = styled.div`
  border: 1px solid;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0px;
  grid-column: span 8/11;
  grid-row: span 5/11;
`;

export default function Home() {
  const [fixData, setFixData] = useState<IData[]>([]);
  const [cusData, setCusData] = useState<IData[]>([]);
  const [change, setChage] = useState<IData>();
  const [max, setMax] = useState(0);
  const [opt, setOpt] = useState("");
  const { isLoading, data, refetch } = useQuery<IGetExtList>(
    ["extList"],
    () =>
      opt === ""
        ? getExtList()
        : opt === "update"
        ? putExtList(change)
        : opt === "delete"
        ? delExtList(change)
        : postExtList(change),
    {
      refetchOnWindowFocus: false,
      staleTime: 5000,
    }
  );
  useEffect(() => {
    refetch();
  }, [change, refetch]);

  useEffect(() => {
    setFixData([]);
    setCusData([]);
    let cnt = 0;
    data?.data.forEach((ext) => {
      if (ext.fix_yn === "Y") setFixData((data) => [...data, ext]);
      else {
        setCusData((data) => [...data, ext]);
        cnt++;
      }
    });
    setMax(cnt);
  }, [data]);

  return (
    <Container>
      {isLoading ? null : (
        <Grid>
          <GridTTL>파일 확장자 차단</GridTTL>
          <GridCTT>
            파일확장자에 따라 특정 형식의 파일을 첨부하거나 전송하지 못하도록
            제한
          </GridCTT>
          <ExtText>고정 확장자</ExtText>
          <FixBox>
            <FixList data={fixData} setChage={setChage} setOpt={setOpt} />
          </FixBox>
          <ExtText>커스텀 확장자</ExtText>
          <CustomBox placeholder="확장자 입력" id="extNm" />
          <Button
            onClick={() => {
              if (max < 200) {
                const ext = {
                  name: (document.getElementById("extNm") as HTMLInputElement)
                    .value,
                  fix_yn: "N",
                  checked: "N",
                  seq: 0,
                };
                setChage(ext);
                setOpt("add");
              } else {
                alert("최대 개수를 초과하였습니다.");
              }
            }}
          >
            + 추가
          </Button>
          <CustomBigBox>
            <div style={{ marginBottom: "10px" }}>{max + " / 200"}</div>
            <CustomList data={cusData} setChage={setChage} setOpt={setOpt} />
          </CustomBigBox>
        </Grid>
      )}
    </Container>
  );
}
