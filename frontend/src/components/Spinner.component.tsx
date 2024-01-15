export const Spinner = ({ loadingStatus }: { loadingStatus?: string }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
            <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                <h2 className="text-lg font-semibold text-gray-800">{loadingStatus ? loadingStatus : 'Loading...'}</h2>
            </div>
        </div>
    );
};
