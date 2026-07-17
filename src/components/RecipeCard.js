import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/isMobile';
import { toSlug } from '../data/recipes';
import { InlineMarkdown } from './InlineMarkdown';

export function RecipeCard(props) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const recipe = props.recipe;

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: isMobile ? '100%' : 300, padding: 20, margin: 10, borderRadius: 15, backgroundColor: '#888888', cursor: 'pointer'}}
      onClick={() => navigate(`/recipes/${toSlug(recipe.name)}`)}>
      {recipe.image ?
        <img style={{objectFit: 'cover', height: 200, width: isMobile ? '100%' : 300, borderRadius: 10}} src={recipe.image} alt={recipe.name}/>
      :
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, width: isMobile ? '100%' : 300, borderRadius: 10, backgroundColor: '#6f6f6f'}}>
          <i style={{fontSize: '70px', color: 'white'}} className='bi bi-egg-fried'/>
        </div>
      }
      <h3 style={{marginBottom: 0, textAlign: 'center'}}>{recipe.name}</h3>
      <p style={{marginTop: 5, textAlign: 'center'}}><InlineMarkdown>{recipe.description}</InlineMarkdown></p>
      <div className='recipeBadges' style={{display: 'flex', flexFlow: 'wrap', justifyContent: 'center'}}>
        <span className='recipeBadge'><i className='bi bi-alarm'/> Prep {recipe.prepTime}</span>
        <span className='recipeBadge'><i className='bi bi-fire'/> Cook {recipe.cookTime}</span>
        <span className='recipeBadge'><i className='bi bi-people'/> Serves {recipe.servings}</span>
      </div>
      <div className='recipeBadges' style={{display: 'flex', flexFlow: 'wrap', justifyContent: 'center'}}>
        <span className='recipeBadge'>{recipe.category}</span>
        <span className='recipeBadge'>{recipe.cuisine}</span>
      </div>
    </div>
  );
}
