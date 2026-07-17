import * as recipe_data from '../data/recipes.js';
import '../styles/recipes.css';
import { useIsMobile } from '../hooks/isMobile';
import { useEffect, useState } from 'react';
import '../utils/arrayHelpers';
import { Dropdown } from '../components/Dropdown';
import { RecipeCard } from '../components/RecipeCard';

export function Recipes() {
  const isMobile = useIsMobile();

  const [showFilter, setShowFilter] = useState(!isMobile);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState(recipe_data.recipes);

  useEffect(() => {
    const timeout = setTimeout(() => {
      filterRecipes(selectedCategories, selectedCuisines, searchTerm);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const matchesSearch = (recipe, term) => {
    if (!term) {
      return true;
    }

    const needle = term.toLowerCase();

    return recipe.name.toLowerCase().includes(needle) ||
      recipe.description.toLowerCase().includes(needle) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(needle)) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(needle));
  };

  const filterRecipes = (categories, cuisines, term) => {
    setRecipes(recipe_data.recipes.filter(r =>
      (categories.length === 0 || categories.includes(r.category)) &&
      (cuisines.length === 0 || cuisines.includes(r.cuisine)) &&
      matchesSearch(r, term)
    ));
  };

  return (
    <div className='recipes' style={{height: '100%', width: '100%', overflowY: 'auto'}}>
      <div style={{padding: isMobile ? 20 : '20px 10%'}}>
        <h1 style={{marginBottom: 5}}>Recipes</h1>
        <p style={{marginTop: 0, marginBottom: 20, maxWidth: 700}}>These are recipes we've cooked at home and iterated on over the years. Hope you enjoy!</p>
        {isMobile ?
          <div style={{display: 'flex', alignItems: 'center', marginLeft: 10, borderBottom: '2px solid white'}} onClick={() => setShowFilter(!showFilter)}>
            <h3>Filter</h3>
            <div style={{flex: '1 0 0'}} />
            <i style={{height: 30, width: 30, fontSize: '30px', color: 'white'}} className={`bi bi-chevron-${showFilter ? 'down' : 'right'}`}/>
          </div>
        : null}
        <div style={{display: showFilter ? 'flex' : 'none', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'start', alignItems: 'center', padding: isMobile ? 10 : '10px 10px 10px 0px', borderBottom: '2px solid white', marginBottom: 10}}>
          <Dropdown name='Category' isMulti={true} options={recipe_data.categories} setSelected={vals => {
            setSelectedCategories(vals);
            filterRecipes(vals, selectedCuisines, searchTerm);
          }}/>
          <Dropdown name='Cuisine' isMulti={true} options={recipe_data.cuisines} setSelected={vals => {
            setSelectedCuisines(vals);
            filterRecipes(selectedCategories, vals, searchTerm);
          }}/>
          <input className='recipeSearch' type='text' placeholder='Search recipes...' value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
        </div>
        <div style={{display: 'flex', flexFlow: 'wrap'}}>
          {recipes.map(recipe =>
            <RecipeCard key={recipe.name} recipe={recipe}/>
          )}
        </div>
      </div>
    </div>
  );
}
