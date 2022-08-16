import React from 'react';
import {Resources} from "./components/Resources";
import styles from './App.module.css'
import {WorkSpace} from "./components/WorkSpace/WorkSpace";
function App() {
    return (
        <div className={styles.App}>
            <header className="App-header">
                Mist in Forest
            </header>
            <WorkSpace/>
            {/*<Resources/>*/}
        </div>
    );
}

export default App;
