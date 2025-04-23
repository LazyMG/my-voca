import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, testState } from "../../atoms";
import { getCurrentList } from "../../utils/randomSelect";
import { useEffect } from "react";

const Wrapper = styled.div`
  height: 100vh;
`;

const PageContainer = styled.div`
  width: 100%;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  box-sizing: border-box;
  page-break-after: always;
`;

const PageAnswerContainer = styled.div`
  width: 100%;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  box-sizing: border-box;
  page-break-after: always;
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const PageTitle = styled.h1`
  font-size: 30px;
  display: flex;
  justify-content: center;
`;

const PageName = styled.div`
  width: 100%;
  text-align: end;
  font-size: 18px;
`;

const PageProblem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  font-size: 20px;
`;

const ProblemDiv = styled.div`
  width: 55%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProblemLeft = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const ProblemNum = styled.span`
  font-size: 18px;
`;

const Problem = styled.span``;

const ProblemLine = styled.span`
  font-size: 20px;
`;

const WordPage = ({ meanList, wordList, currentPage, forPrintRef }) => {
  const category = useRecoilValue(categoryState);
  //const testData = useRecoilValue(testState);

  let count = 0;
  let totalPage = category.page || currentPage || 1;

  // useEffect(() => {
  //   console.log(meanList);
  //   console.log(wordList);
  //   console.log(currentPage);
  //   console.log(category);
  // }, [meanList, wordList, currentPage, category]);

  return (
    <Wrapper ref={forPrintRef}>
      {Array.from({ length: totalPage }).map((_, page) => (
        <div key={page}>
          <PageContainer key={page + "problem"}>
            <PageHeader>
              <PageTitle>단어 테스트 {page + 1}</PageTitle>
              <PageName>
                이름 :
                &#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;
              </PageName>
            </PageHeader>
            <PageProblem>
              {category.mean !== 0
                ? getCurrentList(meanList, page)?.map((item, index) => {
                    return (
                      <ProblemDiv key={index + "meaning"}>
                        <ProblemLeft>
                          <ProblemNum>
                            {count + 1 > category.mean + category.word
                              ? (count = 1)
                              : ++count}
                            .
                          </ProblemNum>
                          <Problem>{item.word}</Problem>
                        </ProblemLeft>
                        <ProblemLine>
                          &#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;
                        </ProblemLine>
                      </ProblemDiv>
                    );
                  })
                : null}

              {category.word !== 0
                ? getCurrentList(wordList, page).map((item, index) => {
                    return (
                      <ProblemDiv key={index + "word"}>
                        <ProblemLeft>
                          <ProblemNum>
                            {count + 1 > category.mean + category.word
                              ? (count = 1)
                              : ++count}
                            .
                          </ProblemNum>
                          <Problem>{item.meaning}</Problem>
                        </ProblemLeft>
                        <ProblemLine>
                          &#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;
                        </ProblemLine>
                      </ProblemDiv>
                    );
                  })
                : null}
            </PageProblem>
          </PageContainer>
          <PageAnswerContainer key={page + "answer"}>
            <PageHeader>
              <PageTitle>단어 테스트 {page + 1} 답지</PageTitle>
            </PageHeader>
            <PageProblem>
              {category.mean !== 0
                ? getCurrentList(meanList, page)?.map((item, index) => {
                    return (
                      <ProblemDiv key={index + "meaningAnswer"}>
                        <ProblemLeft>
                          <ProblemNum>
                            {count + 1 > category.mean + category.word
                              ? (count = 1)
                              : ++count}
                            .
                          </ProblemNum>
                          <Problem>{item.meaning}</Problem>
                        </ProblemLeft>
                        <ProblemLine></ProblemLine>
                      </ProblemDiv>
                    );
                  })
                : null}

              {category.word !== 0
                ? getCurrentList(wordList, page).map((item, index) => {
                    return (
                      <ProblemDiv key={index + "wordAnswer"}>
                        <ProblemLeft>
                          <ProblemNum>
                            {count + 1 > category.mean + category.word
                              ? (count = 1)
                              : ++count}
                            .
                          </ProblemNum>
                          <Problem>{item.word}</Problem>
                        </ProblemLeft>
                        <ProblemLine></ProblemLine>
                      </ProblemDiv>
                    );
                  })
                : null}
            </PageProblem>
          </PageAnswerContainer>
        </div>
      ))}
    </Wrapper>
  );
};

export default WordPage;
