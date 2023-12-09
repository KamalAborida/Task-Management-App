import LoginForm from "../components/landingPage/LoginForm";
import SplashScreen from "../components/landingPage/SplashScreen";

function LandingPage() {
  return (
    <div className="landing-container">
      <SplashScreen />
      <LoginForm />
    </div>
  );
}

export default LandingPage;
