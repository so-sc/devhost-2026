import Image from "next/image";
import Link from "next/link";

export default function DevHackSection() {
  return (
    <div
      id="devhack"
      className="relative flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden bg-black bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/assets/devhack/background.svg')` }}
    >
      <div className="z-10 flex flex-col items-center justify-center text-center">
        <h1 className="font-norse text-center text-[6rem] leading-none whitespace-nowrap text-[#E4C423] drop-shadow-xl md:text-[12rem]">
          DEV HACK
        </h1>

        <p className="font-trajan mt-2 text-base tracking-[0.3em] whitespace-nowrap text-[#FFFFFF] md:text-2xl">
          36 HOURS. REAL PROBLEMS. WORKING CODE.
        </p>

        <p className="font-lora mx-auto mt-6 max-w-xl px-4 text-center text-lg text-[#CCCCCC]">
          DevHack is the centre of DEVHOST. Teams get a problem statement, 36
          hours, and mentors who&apos;ve shipped actual products. What you build
          in that window is up to you.
        </p>

        <Link
          href="https://forms.gle/your-devhack-register-link"
          className="mt-8 block"
        >
          <Image
            src="/assets/devhack/register-plate.svg"
            alt="Register Now"
            width={250}
            height={80}
            className="w-[200px] transition-transform hover:scale-105 md:w-[250px]"
          />
        </Link>
      </div>
    </div>
  );
}
