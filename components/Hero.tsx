"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import DecryptText from "./animated/TextAnimation";

export default function Hero() {

return (

<div className="
relative
h-screen
w-full
overflow-hidden
bg-black
text-zinc-200
flex
items-center
justify-center
">


{/* Background Glow */}

<div
className="
absolute
inset-0
bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_45%)]
"
/>



{/* Greek Halo */}

<motion.div

animate={{
rotate:360
}}

transition={{
duration:80,
repeat:Infinity,
ease:"linear"
}}

className="
absolute
top-20
h-[600px]
w-[600px]
rounded-full
border
border-[#D4AF37]/50
shadow-[0_0_100px_rgba(212,175,55,0.3)]
"

/>




{/* Statue */}

<motion.div

initial={{
opacity:0,
y:80
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:2
}}

className="
absolute
bottom-0
z-10
h-[85vh]
w-[500px]
"

>


<Image

src="/greek-statue.png"

alt="Greek Statue"

fill

className="
object-contain
"

/>

</motion.div>





{/* Main Content */}

<div
className="
relative
z-20
flex
flex-col
items-center
text-center
"
>


<p
className="
font-serif
tracking-[8px]
text-[#D4AF37]
text-sm
"
>

SAHYADRI PRESENTS

</p>



<h1
className="
mt-5
font-serif
text-7xl
md:text-9xl
tracking-[15px]
bg-gradient-to-b
from-yellow-200
via-yellow-500
to-yellow-800
text-transparent
bg-clip-text
"
>

DEVHOST

</h1>


<h2
className="
font-serif
text-5xl
tracking-[10px]
text-white
"
>

2026

</h2>




<p
className="
mt-8
tracking-[5px]
text-gray-400
"
>

HACKATHON • CONFERENCE • TECH TALKS

</p>


<button
className="
mt-10
border
border-[#D4AF37]
px-10
py-3
tracking-widest
text-[#D4AF37]
hover:bg-[#D4AF37]
hover:text-black
transition
"
>

ENTER THE ARENA

</button>


</div>





{/* Left Ancient Text */}

<div
className="
absolute
left-10
top-32
z-30
text-xs
tracking-[5px]
text-[#D4AF37]/70
"
>


<DecryptText

text="DISCIPLINE TODAY"

startDelayMs={300}

/>


<DecryptText

text="CREATES TOMORROW"

startDelayMs={900}

/>


<DecryptText

text="INNOVATION AWAKENS"

startDelayMs={1500}

/>


</div>





{/* Greek Borders */}

<div
className="
absolute
left-5
top-5
h-16
w-16
border-l
border-t
border-[#D4AF37]
"
/>


<div
className="
absolute
right-5
top-5
h-16
w-16
border-r
border-t
border-[#D4AF37]
"
/>



{/* Scroll */}

<div
className="
absolute
bottom-10
right-10
font-serif
text-[#D4AF37]
tracking-widest
"
>

[ SCROLL TO EXPLORE ]

</div>



{/* Fog */}

<div
className="
absolute
bottom-0
h-48
w-full
bg-gradient-to-t
from-black
to-transparent
z-20
"
/>



</div>

)

}