import styled from "styled-components";

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

const UserWords = ({ meanList, wordList, currentPage, forPrintRef }) => {
  let count = 1;
  let totalPage = currentPage || 1;
  let isProblemStart = true;
  let isAnswerStart = true;

  const initializeCount = (isProblem) => {
    if (isProblem) {
      if (isProblemStart) {
        count = 1;
        isProblemStart = false;
        isAnswerStart = true;
        return count++;
      }
      return count++;
    } else {
      if (isAnswerStart) {
        count = 1;
        isAnswerStart = false;
        isProblemStart = true;
        return count++;
      }
      return count++;
    }
  };

  return (
    <Wrapper ref={forPrintRef}>
      {Array.from({ length: totalPage }).map((_, page) => (
        <div key={page}>
          <PageContainer>
            <PageHeader>
              <PageTitle>단어 테스트 {page + 1}</PageTitle>
              <PageName>
                이름 :
                &#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;
              </PageName>
            </PageHeader>
            <PageProblem>
              {/* 뜻 시험 */}
              {meanList?.length !== 0 &&
                meanList
                  ?.filter((pageMeanList) => pageMeanList.id === page)
                  .map((itemList) =>
                    itemList.list.map((item) => (
                      <ProblemDiv key={item.id + "" + item.day}>
                        <ProblemLeft>
                          <ProblemNum>{initializeCount(true)}.</ProblemNum>
                          <Problem>{item.word}</Problem>
                        </ProblemLeft>
                        <ProblemLine>
                          &#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;
                        </ProblemLine>
                      </ProblemDiv>
                    ))
                  )}
              {/* 단어 시험 */}
              {wordList?.length !== 0 &&
                wordList
                  ?.filter((pageWordList) => pageWordList.id === page)
                  .map((itemList) =>
                    itemList.list.map((item) => (
                      <ProblemDiv key={item.id + "" + item.day}>
                        <ProblemLeft>
                          <ProblemNum>{count++}.</ProblemNum>
                          <Problem>{item.meaning}</Problem>
                        </ProblemLeft>
                        <ProblemLine>
                          &#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;
                        </ProblemLine>
                      </ProblemDiv>
                    ))
                  )}
            </PageProblem>
          </PageContainer>
          <PageAnswerContainer>
            <PageHeader>
              <PageTitle>단어 테스트 {page + 1} 답지</PageTitle>
            </PageHeader>
            <PageProblem>
              {/* 뜻 답지 */}
              {meanList?.length !== 0 &&
                meanList
                  ?.filter((pageMeanList) => pageMeanList.id === page)
                  .map((itemList) =>
                    itemList.list.map((item) => (
                      <ProblemDiv key={item.id + "" + item.day}>
                        <ProblemLeft>
                          <ProblemNum>{initializeCount(false)}.</ProblemNum>
                          <Problem>{item.meaning}</Problem>
                        </ProblemLeft>
                        <ProblemLine></ProblemLine>
                      </ProblemDiv>
                    ))
                  )}
              {wordList?.length !== 0 &&
                wordList
                  ?.filter((pageWordList) => pageWordList.id === page)
                  .map((itemList) =>
                    itemList.list.map((item) => (
                      <ProblemDiv key={item.id + "" + item.day}>
                        <ProblemLeft>
                          <ProblemNum>{count++}.</ProblemNum>
                          <Problem>{item.word}</Problem>
                        </ProblemLeft>
                        <ProblemLine></ProblemLine>
                      </ProblemDiv>
                    ))
                  )}
            </PageProblem>
          </PageAnswerContainer>
        </div>
      ))}
    </Wrapper>
  );
};

export default UserWords;
