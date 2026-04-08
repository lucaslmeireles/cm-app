const colors = [
    'bg-red-500', 
    'bg-blue-500', 
    'bg-green-500', 
    'bg-yellow-500', 
    'bg-purple-500', 
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500'
  ];

export function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }


const colorsRGB = [
  "#03045e",
  "#023e8a",
  "#0077b6",
  "#0096c7",
  "#00b4d8",
  "#48cae4",
  "#90e0ef"
]


  export function getRandomColorRGB() {
    const randomIndex = Math.floor(Math.random() * colorsRGB.length);
    return colorsRGB[randomIndex];
  }