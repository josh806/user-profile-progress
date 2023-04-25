import './ProgressBar.css';

type Props = {
  bgColor?: string;
  percentage: number;
};

export default function ProgressBar({ bgColor, percentage }: Props) {
  const progressBarStyles = {
    backgroundColor: bgColor,
    width: `${percentage}%`,
  };

  const progressBarLabelStyles: React.CSSProperties = {
    position: 'absolute',
    left: 'calc(100% + 0.5rem)',
    color: 'inherit',
  };

  return (
    <div className="progress-bar">
      <div className="progress-bar__inner" style={progressBarStyles}>
        <span
          className="progress-bar__label"
          style={percentage < 10 ? progressBarLabelStyles : {}}
        >{`${percentage}%`}</span>
      </div>
    </div>
  );
}
