
import HeroSectionPage from '../../components/HeroSection';
import LatestProduct from '../../components/LatestProduct';
import MarketplaceStatsPage from '../../components/MarketplaceStatsPage';
import SuccessStories from '../../components/SuccessStories';
import SustainabilityImpact from '../../components/SustainabilityImpact';


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