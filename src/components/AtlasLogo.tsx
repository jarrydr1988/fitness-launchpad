import atlasLogo from "@/assets/atlas-logo.png";

const AtlasLogo = ({
  className = "w-10 h-10"
}: {
  className?: string;
}) => {
  return (
    <img 
      src={atlasLogo} 
      alt="Atlas Strength & Performance Logo" 
      className={className}
    />
  );
};

export default AtlasLogo;