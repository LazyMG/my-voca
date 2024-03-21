import PropTypes from "prop-types";

import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, numberState } from "../../atoms";
import { useEffect, useState } from "react";
import { getCurrentList } from "../../utils/randomSelect";

const Wrapper = styled.div`
  height: 100vh;
`;

const PageContainer = styled.div`
  width: 100%;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-sizing: border-box;
  page-break-after: always;
  background-color: blue;
`;

const PageHeader = styled.h1`
  font-size: 30px;
`;

const PageName = styled.div`
  width: 100%;
  text-align: end;
  font-size: 18px;
`;

const PageProblem = styled.div``;

const Problem = styled.div``;

const WordPage = ({ meanList, wordList, currentPage, forPrintRef }) => {
  const number = useRecoilValue(numberState);
  const category = useRecoilValue(categoryState);
  const [problems, setProblems] = useState(0);

  useEffect(() => {
    setProblems(category.mean + category.word);
  }, [category.mean, category.word]);

  return (
    <Wrapper ref={forPrintRef}>
      {Array.from({ length: currentPage }).map((_, page) => (
        <PageContainer key={page}>
          <PageHeader>
            단어 테스트 Day {number.length === 1 ? number[0] : null}
          </PageHeader>
          <PageName>이름 : __________</PageName>
          <PageProblem>
            {category.mean !== 0
              ? getCurrentList(meanList, page).map((item, index) => {
                  return <Problem key={index}>{item.word}</Problem>;
                })
              : null}
            {category.word !== 0
              ? getCurrentList(wordList, page).map((item, index) => {
                  return <Problem key={index}>{item.meaning}</Problem>;
                })
              : null}
          </PageProblem>
        </PageContainer>
      ))}
    </Wrapper>
  );
};

// WordPage.propTypes = {
//   //수정필요
//   meanList: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       list: PropTypes.arrayOf(PropTypes.number).isRequired,
//     })
//   ).isRequired,
//   //수정필요
//   wordList: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       list: PropTypes.arrayOf(PropTypes.number).isRequired,
//     })
//   ).isRequired,
//   currentPage: PropTypes.number.isRequired,
//   forPrintRef: PropTypes.object.isRequired,
// };

export default WordPage;
