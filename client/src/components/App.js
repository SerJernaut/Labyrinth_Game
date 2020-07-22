import React, {lazy, Suspense, useEffect} from 'react';
import './App.scss'


function App () {


  return (
    <Suspense fallback={ <div>Loading...</div> }>

    </Suspense>
  );
}

export default App;
