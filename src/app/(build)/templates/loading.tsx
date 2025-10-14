export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 dark:border-white border-solid mb-4"></div>
      <p className="text-lg font-medium text-gray-600">
        Verifying payment, please wait...
      </p>
    </div>
  );
}
