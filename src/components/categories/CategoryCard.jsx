export default function CategoryCard({ name }) {
    return (
      <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center">
        <h3 className="text-lg font-medium text-gray-700">{name}</h3>
      </div>
    );
  }
  