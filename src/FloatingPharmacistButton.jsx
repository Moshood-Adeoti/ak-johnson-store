import { useState, useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingPharmacistButton({
  waLink,
  pharmacistNumber,
  colors,
}) {
  const [position, setPosition] = useState({
    x: window.innerWidth - 270,
    y: window.innerHeight - 100,
  });

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const startDrag = (x, y) => {
    dragging.current = true;

    offset.current = {
      x: x - position.x,
      y: y - position.y,
    };
  };

  const moveDrag = (x, y) => {
    if (!dragging.current) return;

    const width = 230;
    const height = 60;

    let newX = x - offset.current.x;
    let newY = y - offset.current.y;

    newX = Math.max(0, Math.min(newX, window.innerWidth - width));
    newY = Math.max(0, Math.min(newY, window.innerHeight - height));

    setPosition({
      x: newX,
      y: newY,
    });
  };

  const stopDrag = () => {
    dragging.current = false;
  };

  useEffect(() => {
    const mouseMove = (e) => moveDrag(e.clientX, e.clientY);
    const touchMove = (e) =>
      moveDrag(e.touches[0].clientX, e.touches[0].clientY);

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", stopDrag);

    window.addEventListener("touchmove", touchMove);
    window.addEventListener("touchend", stopDrag);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", stopDrag);

      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [position]);

  return (
    <a
      href={waLink(
        pharmacistNumber,
        "Hello Pharmacist, I need help with:"
      )}
      target="_blank"
      rel="noreferrer"
      onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
      onTouchStart={(e) =>
        startDrag(e.touches[0].clientX, e.touches[0].clientY)
      }
     className="
fixed z-50
flex items-center gap-2
px-3 md:px-4
py-2.5 md:py-3
text-sm md:text-base
rounded-full
font-bold
shadow-2xl
select-none
max-w-[90vw]
animate-bounce
"
      style={{
        left: position.x,
        top: position.y,
        background: colors.gold,
        color: colors.ink,
        cursor: "grab",
        touchAction: "none",
      }}
    >
      <MessageCircle size={18} />
      Speak to Pharmacist
    </a>
  );
}