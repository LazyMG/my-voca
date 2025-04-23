import { useSetRecoilState } from "recoil";
import { dbWordListState, sectionState } from "../atoms";
import Section from "../components/Section";
import { useCallback, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const Word = () => {
  const setSection = useSetRecoilState(sectionState);
  const setDBWordList = useSetRecoilState(dbWordListState);

  const getTestWord = useCallback(async () => {
    const wordQuery = query(
      collection(db, "voca"),
      where("vocaId", "==", "test")
    );
    const wordSnapshot = await getDocs(wordQuery);

    const dbWord = wordSnapshot.docs.map((doc) => {
      const { wordList } = doc.data();
      return {
        wordList,
      };
    });
    // console.log("dbWord", dbWord[0].wordList);
    setDBWordList(dbWord[0].wordList);
  }, [setDBWordList]);

  useEffect(() => {
    getTestWord();
  }, [getTestWord]);

  useEffect(() => {
    setSection("RANGE");
  }, [setSection]);

  return <Section />;
};

export default Word;
