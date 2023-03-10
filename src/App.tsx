import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const Card = React.lazy (() => import('./components/Home'));
const Create = React.lazy (() => import('./components/Create'));
const Details = React.lazy (() => import('./components/Details'));
const NotFound = React.lazy (() => import('./components/NotFound'));

function App() {
  return (
    <Suspense fallback={<p>Loading component...</p>}>
    <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/hotels/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Card />} />
    </Routes>
    </Suspense>
  );
}

export default App;
