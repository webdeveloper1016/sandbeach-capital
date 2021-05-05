export const Banner = ({ hide }: { hide?: boolean }) => {
  if (hide) return null;
  return (
    <div className="flex justify-center py-1 text-lg text-black bg-gray-900">
      ✨ 🏠 💰 🍁
    </div>
  );
};
