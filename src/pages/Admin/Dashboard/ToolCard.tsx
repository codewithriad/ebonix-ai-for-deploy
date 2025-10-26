interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  prompt: string;
  className?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  icon,
  title,
  description,
  prompt,
  className,
}) => {
  return (
    <div className="bg-background p-4 rounded-xl text-foreground hover:bg-background transition-all duration-200 w-full max-w-xs h-auto border mx-auto">
      <div
        className={`text-2xl mb-2 w-10 h-10 rounded-full ${className} flex justify-center items-center mb-4`}
      >
        <p>{icon}</p>
      </div>
      <h4 className="font-semibold text-base mb-2">{title}</h4>
      <p className="text-sm text-para mb-6">{description}</p>
      <div className="text-[10px] text-para border rounded px-2 py-1 mt-4 w-fit">
        {prompt}
      </div>
    </div>
  );
};

export default ToolCard;
