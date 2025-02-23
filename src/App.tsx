import './App.css';

import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import { Route, Routes } from "react-router-dom";
import { PageIndex } from "./components/PageIndex";
import { PageProtokoll } from "./components/PageProtokoll";
import { PageEintrag } from "./components/PageEintrag";
import { PageAdmin } from "./components/PageAdmin";
import { PagePrefs } from "./components/PagePrefs";
import Header from "./components/Header";
import { LoginContext, LoginInfo } from './components/LoginContext';
import { useEffect, useState } from 'react';
import { getLogin } from './backend/api';
import { ProtokollNew } from './components/ProtokollNew';
import { ProtokollEdit } from './components/ProtokollEdit';
import { PageProtokollEdit } from './components/PageProtokollEdit';
import { PageProtokollNew } from './components/PageProtokollNew';
import { PageEintragNew } from './components/PageEintragNew';
import { PageEintragEdit } from './components/PageEintragEdit';

function App() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo | false| undefined>(undefined);
  useEffect(()=>{
    (async()=>{
      const loginFromServer = await getLogin();
      setLoginInfo(loginFromServer);
    })();
  },[]);
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <LoginContext.Provider value={{ loginInfo, setLoginInfo }}>
        <div>
          
          <Header />
          <Routes>
            <Route path="/" Component={PageIndex} />
            <Route path="/protokoll/:protokollId" Component={PageProtokoll} />
            <Route path="/protokoll/:protokollId/edit" Component={PageProtokollEdit} />
            <Route path="/eintrag/:eintragId" Component={PageEintrag} />
            <Route path="/admin" Component={PageAdmin} />
            <Route path="/prefs" Component={PagePrefs} />
            <Route path="*" Component={PageIndex} />
            <Route path="/protokoll/:protokollId/eintrag/neu" Component={PageEintragNew} />
            <Route path="/eintrag/:eintragId/edit" Component={PageEintragEdit} />


          </Routes>
        </div>
      </LoginContext.Provider>
      </ErrorBoundary>

    </>
  );
}

export default App;