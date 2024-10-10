import React from "react";
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from "react-router-dom";

// Screens Here
import Home from "./screens/Home";
import About from "./screens/About";
import ContactUs from "./screens/Contact";
import Error from "./screens/Error/Error";
import Root from "./screens/Root";
import Offer from "./screens/Offers/Offer"

import { store } from "./store/store/store"; 
import { Provider } from 'react-redux';
import Account from "./screens/Account";
import TrackOffers from "./components/Offer/TrackOffers";
import PrivacyPolicyScreen from "./screens/privacy/PrivacyPolicyScreen";
import TermsConditionScreen from "./screens/terms/TermsConditionScreen";
import Download from "./screens/Download";

const router = createBrowserRouter([
  {path:'/',element: <Root/>,
  errorElement:<Error/>,
    children:[
    {path:'/',element: <Home/>},
    {path:'/contact',element:<ContactUs/>},
    {path:'/about',element:<About/>},
    {path:'/offers',element:<Offer/>},
    {path:'/account',element:<Account/>},
    {path:'/trackOffers',element:<TrackOffers/>},
    {path:'/terms',element:<TermsConditionScreen/>},
    {path:'/privacy',element:<PrivacyPolicyScreen/>},
    {path:'/download',element:<Download/>},
  ]},
])  


const App: React.FC = () => {
  return (
    <div>
       <Provider store={store}>
      {/* <Toaster toastOptions={{ duration: 2500 }} /> */}
       <RouterProvider router={router}/>
    </Provider>
    </div>
  );
};

export default App;
