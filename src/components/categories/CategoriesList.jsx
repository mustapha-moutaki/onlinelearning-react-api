import { useEffect, useState } from 'react';
import { fetchCategories } from '../../services/api';
import CategoryCard from './CategoryCard';

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error('Erreur API :', error));
  }, []);

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={index} name={category.name} />
        ))}
      </div>
    </section>
  );
}