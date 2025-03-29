"use client";

import { useState } from "react";
import StepOne from "@/components/stepOne";
import StepTwo from "@/components/stepTwo";
import StepThree from "@/components/stepThree";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne onNext={() => setCurrentStep(2)} />;
      case 2:
        return <StepTwo onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />;
      case 3:
        return <StepThree />;
      default:
        return <StepOne onNext={() => setCurrentStep(2)} />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-md">
        {renderStep()}
      </main>
    </div>
  );
}
