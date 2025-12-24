const { useState, useRef, useEffect } = React;

function App() {
  // Put her name here (it will appear automatically)
  const herName = "Your Best Friend"; // change this

  const [clicked, setClicked] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [showHappy, setShowHappy] = useState(false);
  const [typedText, setTypedText] = useState("");

  const audioRef = useRef(null);
  const typeIntervalRef = useRef(null);

  const message =
    "Thank you for every random call, every dumb joke, and every moment you stayed when it really mattered.\n" +
    "This New Year, I just want you to know: you are one of the best things that ever happened to me.";

  useEffect(() => {
    // cleanup interval on unmount
    return () => {
      if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    };
  }, []);

  const startTypewriter = () => {
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    setTypedText("");
    let index = 0;

    typeIntervalRef.current = setInterval(() => {
      index++;
      setTypedText(message.slice(0, index));
      if (index >= message.length) {
        clearInterval(typeIntervalRef.current);
      }
    }, 35);
  };

  const handleTriggerClick = async () => {
    if (clicked) return; // only first click triggers

    setClicked(true);

    // Start music
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } catch (e) {
        alert("Tap once on the screen and then tap again to allow the music.");
        setClicked(false);
        return;
      }
    }

    // Show sliding panel from bottom
    setPanelVisible(true);

    // Happy New Year text
    setTimeout(() => {
      setShowHappy(true);
    }, 500);

    // Typewriter message
    setTimeout(() => {
      startTypewriter();
    }, 800);
  };

  return (
    <div className="app">
      {/* Hidden audio element (put song.mp3 in same folder / public) */}
      <audio ref={audioRef} src="song.mp3" preload="auto" />

      {/* Glowing circle trigger instead of heart */}
      <div className="trigger-wrapper">
        <div
          className={`trigger-circle ${clicked ? "clicked" : ""}`}
          onClick={handleTriggerClick}
          aria-label="Tap to open your surprise"
        >
          <div className="trigger-circle-content">
            TAP<br />ME
          </div>
        </div>
      </div>

      {!clicked && (
        <p className="hint">Tap the glowing circle when you are ready for your surprise.</p>
      )}

      {/* Slide-up greeting panel */}
      <div className={`slide-panel ${panelVisible ? "visible" : ""}`}>
        {panelVisible && (
          <>
            <div className="name-line">{herName}</div>
            <div className="sub-line">this whole thing was made just for you 💗</div>

            <div className={`newyear-line ${showHappy ? "visible" : ""}`}>
              {showHappy && "HAPPY NEW YEAR"}
            </div>

            <div className="typewriter">{typedText}</div>
          </>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
