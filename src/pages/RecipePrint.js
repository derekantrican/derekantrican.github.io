import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { findRecipeBySlug } from '../data/recipes';
import { InlineMarkdown } from '../components/InlineMarkdown';
import '../styles/recipePrint.css';

export function RecipePrint() {
  const { slug } = useParams();
  const recipe = findRecipeBySlug(slug);
  const [showImage, setShowImage] = useState(true);
  const [showNotes, setShowNotes] = useState(true);

  if (!recipe) {
    return (
      <div className='recipePrint'>
        <h2>Recipe not found</h2>
        <Link to='/recipes'>Back to recipes</Link>
      </div>
    );
  }

  return (
    <div className='recipePrint'>
      <div className='printToolbar'>
        <div className='printOptions'>
          <label>
            <input type='checkbox' checked={showImage} onChange={e => setShowImage(e.target.checked)}/> Include image
          </label>
          <label>
            <input type='checkbox' checked={showNotes} onChange={e => setShowNotes(e.target.checked)}/> Include notes
          </label>
        </div>
        <button className='printTrigger' onClick={() => window.print()}>
          <i className='bi bi-printer'/> Print
        </button>
      </div>

      <h1>{recipe.name}</h1>
      <p className='description'><InlineMarkdown>{recipe.description}</InlineMarkdown></p>

      {showImage && recipe.image ?
        <img src={recipe.image} alt={recipe.name}/>
      : null}

      <div className='metaBar'>
        <div className='metaItem'>
          <span className='metaLabel'>Prep Time</span>
          <span className='metaValue'>{recipe.prepTime}</span>
        </div>
        <div className='metaItem'>
          <span className='metaLabel'>Cook Time</span>
          <span className='metaValue'>{recipe.cookTime}</span>
        </div>
        <div className='metaItem'>
          <span className='metaLabel'>Total Time</span>
          <span className='metaValue'>{recipe.totalTime}</span>
        </div>
        <div className='metaItem'>
          <span className='metaLabel'>Servings</span>
          <span className='metaValue'>{recipe.servings}</span>
        </div>
        <div className='metaItem'>
          <span className='metaLabel'>Course</span>
          <span className='metaValue'>{recipe.category}</span>
        </div>
        <div className='metaItem'>
          <span className='metaLabel'>Cuisine</span>
          <span className='metaValue'>{recipe.cuisine}</span>
        </div>
      </div>

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, i) => <li key={i}><InlineMarkdown>{ingredient}</InlineMarkdown></li>)}
      </ul>

      <h2>Instructions</h2>
      <ol>
        {recipe.instructions.map((step, i) => <li key={i}><InlineMarkdown>{step}</InlineMarkdown></li>)}
      </ol>

      {showNotes && recipe.notes ?
        <>
          <h2>Notes</h2>
          <p><InlineMarkdown>{recipe.notes}</InlineMarkdown></p>
        </>
      : null}

      {recipe.source ?
        <p className='source'>Source: <a href={recipe.source} target='_blank' rel='noreferrer'>{recipe.source}</a></p>
      : null}
    </div>
  );
}
