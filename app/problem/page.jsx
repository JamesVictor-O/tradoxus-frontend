import MainProblemSection from "../../components/problem/MainProblemSection";
import ImpactSection from "../../components/problem/ImpactSection";
import AdditionalProblemsSection from "../../components/problem/AdditionalProblemsSection";

const ProblemPage = () => {
  return (
    <div className="flex flex-col max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24">
      <MainProblemSection />
      <ImpactSection />
      <AdditionalProblemsSection />
    </div>
  );
};

export default ProblemPage;
