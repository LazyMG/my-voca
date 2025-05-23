import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, sectionState, selectedWordListState } from "../atoms";
import styled from "styled-components";
import Button from "./elements/Button";
import WordHeader from "./Word/WordHeader";
import WordRow from "./Word/WordRow";
import { useEffect, useRef, useState } from "react";
import { getCurrentList, getRandomWords } from "../utils/randomSelect";
import { useReactToPrint } from "react-to-print";
import WordPage from "./Word/WordPage";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 25px;
  border: #6f7071 solid 2px;
  width: fit-content;
  padding: 5px;
  margin-top: 8px;
  font-weight: bold;
  color: #f5f6fa;
  background-color: #e1b12c;
  border-radius: 10px;

  ${(props) =>
    props.$current === "LIST"
      ? `
      transform: scale(1.1); 
      `
      : null}
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding-top: 10px;
`;

const WordContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px 5px;
  padding-top: 15px;
  box-sizing: border-box;
`;

const WordOption = styled.div``;

const WordSelect = styled.select`
  padding: 3px 10px;
  font-size: 15px;
  font-family: inherit;
  border-radius: 10px;
  outline: none;
  color: black;
  cursor: pointer;
  /* &:hover {
    opacity: 0.8;
  } */
`;

const WordList = styled.div`
  width: 100%;
  height: 90%;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 5px;
`;

const WordRows = styled.div`
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const WordSelectDiv = styled.div`
  display: flex;
  gap: 5px;
  div {
    font-weight: 600;
    font-size: 20px;
  }
`;

const WordSelectButton = styled.div`
  cursor: pointer;
  font-weight: 600;
`;

const PrintDiv = styled.div`
  display: none;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ListSec = () => {
  const [currentSection, setCurrentSection] = useRecoilState(sectionState);
  const category = useRecoilValue(categoryState);
  const [currentPage, setCurrentPage] = useState(1);
  const selectedWordList = useRecoilValue(selectedWordListState);
  const [meanList, setMeanList] = useState([]);
  const [wordList, setWordList] = useState([]);

  let rowCount = 1;

  const componentRef = useRef();

  useEffect(() => {
    if (selectedWordList.length === 0) {
      return;
    }

    if (currentSection === "LIST") {
      setCurrentPage(1);
    } else {
      return;
    }

    let totalList = [];

    for (let page = 0; page < category.page; page++) {
      const tempObject = {
        id: page,
        list: getRandomWords(selectedWordList, category.mean + category.word),
      };
      totalList.push(tempObject);
    }

    const meanTempList = [];
    const wordTempList = [];

    totalList.forEach((item) => {
      // console.log("listsec totallist", item);
      // id를 그대로 가져오고, list를 분할하여 새로운 배열에 추가
      meanTempList.push({
        id: item.id,
        list: item.list.slice(0, category.mean),
      }); // 첫 6개 요소
      wordTempList.push({ id: item.id, list: item.list.slice(category.mean) }); // 나머지 요소
    });

    setMeanList(meanTempList);
    setWordList(wordTempList);
  }, [selectedWordList, category, setMeanList, setWordList, currentSection]);

  const pageInc = () => {
    if (currentPage + 1 > category.page) return;
    setCurrentPage(currentPage + 1);
  };

  const pageDec = () => {
    setCurrentPage(currentPage - 1 < 1 ? 1 : currentPage - 1);
  };

  const prevSection = (event) => {
    event.preventDefault();
    setCurrentSection("SELECT");
  };

  const handleSelectChange = (event) => {
    setCurrentPage(event.target.value);
  };

  const renderOptions = (count) => {
    const options = [];
    for (let i = 1; i <= count; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const printPage = () => {
    handlePrint();
  };

  const savePage = async () => {
    if (!localStorage.getItem("user")) {
      alert("로그인이 필요합니다.");
      return;
    }
    const localUser = JSON.parse(localStorage.getItem("user"));
    const fetchUser = async () => {
      try {
        const userQuery = query(
          collection(db, "users"),
          where("userId", "==", localUser?.uid)
        );
        const snapshot = await getDocs(userQuery);
        snapshot.forEach(async (doc) => {
          const userRef = doc.ref;
          await updateDoc(userRef, {
            myWordList: {
              meanList,
              wordList,
              currentPage: category.page,
            },
          });
        });
      } catch (error) {
        alert("저장에 실패했습니다.");
      }

      // console.log("complete");
      alert("저장되었습니다.");
    };
    fetchUser();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Voca Test",
    removeAfterPrint: true,
  });

  return (
    <>
      <Wrapper>
        <Title $current={currentSection}>STEP 3</Title>
        <Content>
          <WordContainer>
            <WordOption>
              <WordSelect value={currentPage} onChange={handleSelectChange}>
                {renderOptions(category.page)}
              </WordSelect>
            </WordOption>
            <WordList>
              <WordHeader />
              <WordRows>
                {meanList.length !== 0 && currentSection === "LIST"
                  ? getCurrentList(meanList, currentPage - 1).map(
                      (item, index) => {
                        return (
                          <WordRow
                            count={rowCount++}
                            key={index + "meaning"}
                            category={"mean"}
                            mean={item.meaning}
                            word={item.word}
                          />
                        );
                      }
                    )
                  : null}
                {wordList.length !== 0 && currentSection === "LIST"
                  ? getCurrentList(wordList, currentPage - 1).map(
                      (item, index) => {
                        return (
                          <WordRow
                            count={rowCount++}
                            key={index + "word"}
                            category={"word"}
                            mean={item.meaning}
                            word={item.word}
                          />
                        );
                      }
                    )
                  : null}
              </WordRows>
            </WordList>
            <WordSelectDiv>
              <WordSelectButton onClick={pageDec}>{"<"}</WordSelectButton>
              <div>{currentPage}</div>
              <WordSelectButton onClick={pageInc}>{">"}</WordSelectButton>
            </WordSelectDiv>
          </WordContainer>

          <ButtonDiv>
            <Button onClick={prevSection} text={"이전"} />
            <Button onClick={savePage} text={"저장"} />
            <Button onClick={printPage} text={"출력"} isPrint={true} />
          </ButtonDiv>
        </Content>
      </Wrapper>
      {currentSection === "LIST" ? (
        <PrintDiv>
          <WordPage
            meanList={meanList}
            wordList={wordList}
            currentPage={category.page}
            forPrintRef={componentRef}
          />
        </PrintDiv>
      ) : null}
    </>
  );
};

export default ListSec;
