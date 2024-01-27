import { useIsMobile } from "../hooks/isMobile";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export function Dropdown(props) {
  const isMobile = useIsMobile();
  const styles = {
    option: (styles) => {
      return { ...styles, color: 'black'};
    }
  };

  return (
    <div style={{width: isMobile ? '100%' : 300, margin: isMobile ? 10 : '10px 10px 10px 0px'}}>
      <Select styles={styles}
        placeholder={props.name}
        options={props.options.map(o => {return {value: o, label: o}})}
        defaultValue={props.defaultValue ? {value: props.defaultValue, label: props.defaultValue} : null}
        closeMenuOnSelect={!props.isMulti}
        components={animatedComponents}
        onChange={selected => props.isMulti ? props.setSelected(selected.map(val => val.value)) : props.setSelected(selected.value)}
        isMulti={props.isMulti}
        />
    </div>
  );
}