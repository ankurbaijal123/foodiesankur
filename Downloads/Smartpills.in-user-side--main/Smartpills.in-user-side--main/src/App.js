import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import About from './pages/Aboutus';
import Articles from './pages/Articles';
import Bookmarks from './pages/Bookmarks';
import GetCoupons from './pages/getCoupons';
import Coupons from './pages/Coupons';
import Cybersecurity from './pages/Cybersecurity';
import Faq from './pages/Faq';
import Help from './pages/Help';
import Ippolicy from './pages/Ippolicy';
import Onboarding from './pages/Onboarding';
import Privacy from './pages/Privacy';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Tabletinfo from './pages/Tabletinfo';
import Terms from './pages/Terms';
import Working from './pages/Working';
import Otp from './pages/OTP';
import Helplogin from './pages/Helplogin';
import LoginOtp from './pages/LoginOtp';
import Profile from './pages/Profile';
import QueryBox from './pages/QueryBox';
import SmartBuy from './pages/SmartBuy';
import Prescriptions from './pages/Prescriptions';
import Testimonials from './pages/Testimonials';
import DetailTestimonial from './pages/DetailTestimonial';
import NoteState from './context/notes/NoteState';
import '../src/app.css';
import Alliance from './pages/Alliance';
import Smartchamp from './pages/Smartchamp';
import Subscriptionplans from './pages/SubscriptionPlan';
import Paymentsuccess from './pages/PaymentSuccess';
import Paymentfailure from './pages/PaymentFailure';
import ScrollToTop from './components/ScrollToTop';
import Checkout from './pages/Checkout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrescriptionUpload from "./components/PrescriptionUpload";

function App() {
  return (
    <BrowserRouter>
      <NoteState>
        <ScrollToTop/>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/articles" element={<Articles />} />
          <Route exact path="/bookmarks" element={<Bookmarks />} />
          <Route exact path="/coupons" element={<Coupons />} />
          <Route exact path="/cyber-security" element={<Cybersecurity />} />
          <Route exact path="/faq" element={<Faq />} />
          <Route exact path="/help" element={<Help />} />
          <Route exact path="/ip-policy" element={<Ippolicy />} />
          <Route exact path="/onboarding" element={<Onboarding />} />
          <Route exact path="/privacy" element={<Privacy />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/otp" element={<Otp />} />
          <Route exact path="/tablet-info" element={<Tabletinfo />} />
          <Route exact path="/terms" element={<Terms />} />
          <Route exact path="/working" element={<Working />} />
          <Route exact path="/login-help" element={<Helplogin />} />
          <Route exact path="/loginotp" element={<LoginOtp />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/query" element={<QueryBox />} />
          <Route exact path="/smartbuy" element={<SmartBuy />} />
          <Route exact path="/prescriptions" element={<Prescriptions />} />
          <Route exact path="/testimonials" element={<Testimonials />} />
          <Route exact path="/testimonial/:id" element={<DetailTestimonial />} />
          <Route exact path="/alliance" element={<Alliance />} />
          <Route exact path="/smartchamp" element={<Smartchamp />} />
          <Route exact path='/subscriptions' element={<Subscriptionplans/>}></Route>
          <Route exact path='/payment_success' element={<Paymentsuccess/>}></Route>
          <Route exact path='/payment_failure' element={<Paymentfailure/>}></Route>
          <Route exact path='/checkout' element={<Checkout/>}></Route>
          <Route path="/getCoupons" element={<GetCoupons />} /> {/* GetCoupons route */}
          <Route path="/uploadPrescription" element={<PrescriptionUpload />} />
        </Routes>
      </NoteState>
    </BrowserRouter>
  );
}

export default App;
