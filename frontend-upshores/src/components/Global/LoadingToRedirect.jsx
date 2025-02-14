import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SmallLoader from "./SmallLoader";
function LoadingToRedirect(props) {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);
    count === 0 && navigate(props.to ?? "/");
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="h-[100vh] grid place-items-center ">
      <div className="flex flex-col items-center space-y-5">
        <h4 className="text-2xl">Redirecting in {count} sec</h4>
        <SmallLoader
          favColor={true}
          s
        />
      </div>
    </div>
  );
}

export default LoadingToRedirect;
