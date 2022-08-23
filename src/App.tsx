import React from 'react';
import styles from './App.module.css'
import {WorkSpace} from "./components/WorkSpace/WorkSpace";

function App() {
    return (
        <div className={styles.App}>
            <header className="App-header">
                Mist in Forest
            </header>
            <WorkSpace/>
        </div>
    );
}

export default App;
