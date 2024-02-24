export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-md h-12 w-12 border-4 border-t-4 border-red-500 animate-spin absolute"></div>
      <div className="rounded-md h-12 w-12 border-4 border-t-4 border-red-500 animate-spin absolute"></div>
    </div>
  );
}
