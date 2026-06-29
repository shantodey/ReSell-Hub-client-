
import HeroSectionPage from '../Component/HeroSection';
import LatestProduct from '../Component/LatestProduct';
import SuccessStories from '../Component/SuccessStories';
import SustainabilityImpact from '../Component/SustainabilityImpact';


const page = () => {
    return (
        <>
            <HeroSectionPage />
           <LatestProduct/>
           <SuccessStories/>
           <SustainabilityImpact/>
        </>
    );
};

export default page;