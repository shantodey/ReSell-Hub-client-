
import HeroSectionPage from '../Component/HeroSection';
import LatestProduct from '../Component/LatestProduct';
import MarketplaceStatsPage from '../Component/MarketplaceStatsPage';
import SuccessStories from '../Component/SuccessStories';
import SustainabilityImpact from '../Component/SustainabilityImpact';


const page = () => {
    return (
        <>
            <HeroSectionPage />
           <LatestProduct/>
           <SuccessStories/>
           <MarketplaceStatsPage/>
           <SustainabilityImpact/>
        </>
    );
};

export default page;