

export const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 max-w-4xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                    Predictor de Comportamiento Financiero
                </h1>
                <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--insecap-primary)]">
                        INSECAP
                    </span>
                    <span className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--insecap-secondary)]">
                        GPS
                    </span>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                    Sistema inteligente de análisis y predicción financiera
                </p>
            </div>
        </div>        
    );
}