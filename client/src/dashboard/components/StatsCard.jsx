const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white hover:bg-indigo-300 hover:text-white text-gray-500  shadow rounded-xl p-6">

      <p className="text-sm">
        {title}
      </p>

      <h2 className="text-2xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
};

export default StatsCard;