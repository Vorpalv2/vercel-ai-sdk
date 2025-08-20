"use client";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";

export default function Home() {
  return (
    <>
      <div className="h-screen w-full bg-black text-white relative">
        <div className="bg-orange-500 py-4">
          <Marquee speed={200} pauseOnHover>
            <p className="inline-block text-4xl">
              これはアニメーションを確認するためのテストスクリプトです。
            </p>
          </Marquee>
        </div>
        <div className="bg-purple-500 py-4 my-20 -rotate-2">
          <Marquee speed={200} pauseOnHover className="absolute">
            <p className="inline-block text-4xl">
              これはアニメーションを確認するためのテストスクリプトです。
            </p>
          </Marquee>
        </div>
      </div>
      <div className="h-screen w-screen bg-amber-700"></div>
      <div className="h-screen w-screen bg-green-700"></div>
      <div className="h-screen w-screen bg-blue-700"></div>
    </>
  );
}

// export default function Home() {
//   const accordionData = [
//     {
//       title: "how does the image transformation work?",
//       content:
//         "Our AI technology analyzes your image and applies various style transfer algorithms specifically trained on Studio Ghibli's artistic style. The system identifies key elements in your photo and transforms them using Ghibli-specific color palettes, brush strokes, and artistic elements.",
//     },
//     {
//       title: "another question?",
//       content: "This is the answer to the second question.",
//     },
//     // Add more accordion items here
//   ];

//   const [openItems, setOpenItems] = useState(accordionData.map(() => false));

//   const toggleItem = (index: Number) => {
//     setOpenItems(openItems.map((item, i) => (i === index ? !item : item)));
//   };

//   return (
//     <div className="w-screen h-screen bg-stone-600 flex justify-center items-center">
//       <div className="h-2/3 w-[600px] flex flex-col items-center bg-white my-4 py-4">
//         <Buttons />
//         <p className="text-black py-8 pt-4">
//           Everything you need to know about our Ghibli transformation
//         </p>
//         {accordionData.map((item, index) => (
//           <div
//             key={index} // Using index as a key is okay here because the list is static
//             className="bg-white max-w-[600px] w-200 flex flex-col -rotate-2 px-8 py-6 gap-4 border-black border-4 shadow-[4px_6px_0px_0px_rgba(0,0,0,1)]"
//           >
//             <div className="flex flex-row justify-between">
//               <p className="text-black text-xl font-bold">{item.title}</p>
//               <p onClick={() => toggleItem(index)} className="text-black">
//                 Icon
//               </p>
//             </div>
//             {openItems[index] && (
//               <>
//                 <hr className="text-pink-400" />
//                 <p className="text-black">{item.content}</p>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// function Buttons() {
//   return (

//     <a className=" w-60 sm:w-auto text-center bg-pink-300 text-black px-8 py-4 font-bold rounded-none border-4 shadow-[6px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_4px_0px_0px_rgba(0,0,0,1)] border-black hover:translate-x-1 hover:translate-y-1 transition-all transform rotate-1 inline-block text-lg">
//       Try it On Now!
//     </a>

//   );
// }
