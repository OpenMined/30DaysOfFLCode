import { useState, useEffect } from "react";

function Timer({
  deadline,
  onFinish,
}: {
  deadline: Date;
  onFinish: () => void;
}) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const countDownDate = new Date(deadline).getTime();

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(intervalId);
        onFinish();
        return;
      }

      setDays(Math.floor(distance / day));
      setHours(Math.floor((distance % day) / hour));
      setMinutes(Math.floor((distance % hour) / minute));
      setSeconds(Math.floor((distance % minute) / second));
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, [deadline, onFinish]);

  return (
    <div className="flex justify-center py-4">
      <div className="grid w-fit grid-cols-4 gap-4">
        {[
          { value: days, label: "DAYS" },
          { value: hours, label: "HOURS" },
          { value: minutes, label: "MINUTES" },
          { value: seconds, label: "SECONDS" },
        ].map((props) => (
          <TimerItem {...props} />
        ))}
      </div>
    </div>
  );
}

function TimerItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl">{value}</div>
      <div>{label}</div>
    </div>
  );
}

export default Timer;
