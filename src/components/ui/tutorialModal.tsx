import Image from 'next/image';
import { useState } from 'react';
import { Button } from './button';
import { toast } from './use-toast';

interface TutorialModalProps {
    isOpen: boolean;
    onClose: () => void;
    steps: JSX.Element[];
    images: string[];
    title: string;
}
export default function TutorialModal({
    isOpen,
    onClose,
    steps,
    images,
    title,
}: TutorialModalProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < images.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 w-full max-w-md max-h-screen flex flex-col justify-between">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                {/* Tutorial Content */}
                <div className="flex flex-col items-center flex-grow">
                    <div className="relative w-full" style={{ height: '60vh' }}>
                        <Image
                            src={images[currentStep]}
                            alt={`Step ${currentStep + 1}`}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-md"
                        />
                    </div>
                    <p className="text-gray-600 my-4 text-center">
                        {steps[currentStep]}
                    </p>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between w-full mt-4">
                        <Button
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className={`px-4 py-2 rounded-md text-sm ${
                                currentStep === 0
                                    ? 'bg-gray-300'
                                    : 'bg-blue-500 text-white'
                            }`}
                            size={'sm'}
                        >
                            Previous
                        </Button>
                        <Button
                            onClick={nextStep}
                            disabled={currentStep === images.length - 1}
                            className={`px-4 py-2 rounded-md text-sm ${
                                currentStep === images.length - 1
                                    ? 'bg-gray-300'
                                    : 'bg-blue-500 text-white'
                            }`}
                            size={'sm'}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
