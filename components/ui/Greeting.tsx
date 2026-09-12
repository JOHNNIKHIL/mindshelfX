"use client";

import { useEffect, useState } from "react";

function getGreeting(hour: number) {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 21) return "Good evening";
  return "Good night";
}

export default function Greeting() {
  const [greeting, setGreeting] = useState("Good day");

  useEffect(() => {
    const update = () => setGreeting(getGreeting(new Date().getHours()));
    update();

    // Re-check every minute so the greeting changes while the app is open.
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return <h1>{greeting}, Nikhil.</h1>;
}
