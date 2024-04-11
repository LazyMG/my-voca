import { useSetRecoilState } from "recoil";
import { sectionState } from "../atoms";
import Section from "../components/Section";
import { useEffect } from "react";

const Word = () => {
  const setSection = useSetRecoilState(sectionState);

  useEffect(() => {
    setSection("RANGE");
  }, [setSection]);

  return <Section />;
};

export default Word;
