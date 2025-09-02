import DefaultLayout from "../layouts/default.jsx";

// Simple, non-broken BentoGrid component (replace with real markup as needed)
export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <div className="p-6 border rounded">Item 1</div>
      <div className="p-6 border rounded">Item 2</div>
      <div className="p-6 border rounded">Item 3</div>
    </div>
  );
}

