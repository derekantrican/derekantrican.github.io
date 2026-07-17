import { Link, useParams } from 'react-router-dom';
import { findRecipeBySlug, toSlug } from '../data/recipes';
import { useIsMobile } from '../hooks/isMobile';
import { InlineMarkdown } from '../components/InlineMarkdown';
import '../styles/recipes.css';
import '../styles/recipeDetail.css';

export function RecipeDetail() {
  const { slug } = useParams();
  const isMobile = useIsMobile();
  const recipe = findRecipeBySlug(slug);

  if (!recipe) {
    return (
      <div style={{padding: 20}}>
        <h2>Recipe not found</h2>
        <Link style={{color: 'white'}} to='/recipes'>Back to recipes</Link>
      </div>
    );
  }

  return (
    <div className='recipeDetail' style={{height: '100%', width: '100%', overflowY: 'auto'}}>
      <div style={{padding: isMobile ? 20 : '20px 10%', maxWidth: 800, margin: '0 auto'}}>
        <Link style={{color: 'white'}} to='/recipes'><i className='bi bi-arrow-left'/> Back to recipes</Link>
        {recipe.image ?
          <img className='banner' src={recipe.image} alt={recipe.name}/>
        : null}
        <h1 style={{marginBottom: 5}}>{recipe.name}</h1>
        <p style={{marginTop: 0, fontSize: '1.1rem'}}><InlineMarkdown>{recipe.description}</InlineMarkdown></p>
        <div style={{display: 'flex', flexFlow: 'wrap', gap: 10, marginBottom: 20}}>
          <span className='recipeBadge'><i className='bi bi-alarm'/> Prep {recipe.prepTime}</span>
          <span className='recipeBadge'><i className='bi bi-fire'/> Cook {recipe.cookTime}</span>
          <span className='recipeBadge'><i className='bi bi-clock-history'/> Total {recipe.totalTime}</span>
          <span className='recipeBadge'><i className='bi bi-people'/> Serves {recipe.servings}</span>
          <span className='recipeBadge'>{recipe.category}</span>
          <span className='recipeBadge'>{recipe.cuisine}</span>
        </div>

        <div className='actionButtons'>
          <a className='actionButton' href={`/recipes/${toSlug(recipe.name)}/print`} target='_blank' rel='noreferrer'>
            <i className='bi bi-printer'/> Print Recipe
          </a>
          {recipe.source ?
            <a className='actionButton' href={recipe.source} target='_blank' rel='noreferrer'>
              <i className='bi bi-box-arrow-up-right'/> View Original Source
            </a>
          : null}
        </div>

        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, i) => <li key={i}><InlineMarkdown>{ingredient}</InlineMarkdown></li>)}
        </ul>

        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map((step, i) => <li key={i}><InlineMarkdown>{step}</InlineMarkdown></li>)}
        </ol>

        {recipe.notes ?
          <>
            <h2>Notes</h2>
            <p><InlineMarkdown>{recipe.notes}</InlineMarkdown></p>
          </>
        : null}
      </div>
    </div>
  );
}
