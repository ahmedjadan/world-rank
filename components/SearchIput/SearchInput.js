import SearchRounded from '@material-ui/icons/SearchRounded'
import styles from './SearchInput.module.css'
function SearchInput({...rest}) {
    return (
      <div className={styles.wrapper}>
        <SearchRounded width="40" height="40" />
        <input className={styles.input} {...rest} />
      </div>
    );
}

export default SearchInput;
