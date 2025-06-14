import { ShapeProps } from "../../../tyeps";

const Square = ({width = 100,height = 100,  fill = '',stroke = '#5b21b6',strokeWidth = 1,borderRadius = 0,className = '',text = '', textColor = 'black', textSize = 16,  
}: ShapeProps) => {

  const rx = Math.min(borderRadius, Math.min(width, height) / 2);
  
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background rectangle */}
      <rect
        width={width}
        height={height}
        rx={rx}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      
      {/* Text centered inside the SVG */}
      {text && (
        <text
          x="50%" 
          y="50%" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          fill={textColor}
          fontSize={textSize}
          fontFamily="Arial, sans-serif" 
        >
          {text}
        </text>
      )}
    </svg>
  );
};

export default Square;