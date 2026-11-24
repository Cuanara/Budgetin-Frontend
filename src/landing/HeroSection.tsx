import { Link } from "react-router-dom";
import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";

export const HeroSection = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex flex-col w-full items-start pt-20 pb-24 px-[120px] max-lg:px-6 max-md:px-5 max-md:pt-8 max-md:pb-12"
    >
      <div className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] grid-rows-[470px] max-w-[1200px] h-[470px] gap-12 px-10 py-0 max-lg:w-full max-lg:h-auto max-lg:grid-cols-1 max-lg:grid-rows-none max-lg:gap-10 max-lg:px-0 max-md:gap-2">
        <div className="relative row-[1_/_2] col-[1_/_2] self-center w-full h-fit flex flex-col items-start gap-[17.4px]">
          <div className="inline-flex items-start px-4 py-2 relative flex-[0_0_auto] bg-white rounded-[20px] border border-solid border-[#dce9e1]">
            <div className="relative flex items-center w-fit [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-[#0d452f] text-sm tracking-[0] leading-[normal]">
              Keuangan buat anak muda
            </div>
          </div>

          <div className="items-start pt-[1.82px] pb-[0.67px] px-0 flex flex-col relative self-stretch w-full flex-[0_0_auto]">
            <h1
              id="hero-heading"
              className="relative self-stretch mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-transparent text-7xl tracking-[-2.50px] leading-[73.4px] max-md:text-[44px] max-md:leading-[48px] max-md:tracking-[-1.5px]"
            >
              <span className="text-[#0d452f] tracking-[-1.80px]">
                Duit rapi,
                <br />
              </span>
              <span className="text-[#7ad9ae] tracking-[-1.80px]">
                wishlist kebeli.
              </span>
            </h1>
          </div>

          <div className="flex flex-col max-w-[500px] w-[500px] items-start relative flex-[0_0_auto] max-lg:w-full">
            <p className="relative w-fit mt-[-1.00px] mr-[-16.00px] [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-[#5b6e63] text-[19px] tracking-[0] leading-[29.5px] max-md:mr-0 max-md:text-base max-md:leading-6 max-md:[&_br]:hidden">
             Budgetin bantu anda catat pemasukan dan pengeluaran,{" "}
            <br />
            atur budget bulanan, dan tahan belanja impulsif lewat{" "}
            <br />
            wishlist yang pintar.
            </p>
          </div>

          <div className="flex items-start gap-2.5 pt-[12.6px] pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
            <Link
              to="/register"
              className="inline-flex h-11 justify-center px-6 py-0 flex-[0_0_auto] bg-[#0d452f] rounded-[22px] items-center relative transition-colors hover:bg-[#0a3826] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d452f] focus-visible:ring-offset-2"
            >
              <span className="relative flex items-center justify-center w-fit [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-white text-[15px] text-center tracking-[0] leading-[normal]">
                Mulai
              </span>
            </Link>
            <a
              href="#cara-kerja"
              className="inline-flex h-11 justify-center px-6 py-0 flex-[0_0_auto] bg-white rounded-[22px] border border-solid border-[#dce9e1] items-center relative transition-colors hover:bg-[#f5f9f6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d452f] focus-visible:ring-offset-2"
            >
              <span className="relative flex items-center justify-center w-fit [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-[#0e1a14] text-[15px] text-center tracking-[0] leading-[normal]">
                Lihat cara kerja
              </span>
            </a>
          </div>
        </div>

        <div
          aria-label="Ringkasan keuangan Budgetin"
          className="relative row-[1_/_2] col-[2_/_3] self-center w-full h-[470px] max-lg:row-[2_/_3] max-lg:col-[1_/_2] max-lg:mx-auto max-lg:max-w-[495px] max-md:flex max-md:h-auto max-md:max-w-none max-md:flex-col max-md:gap-4 max-md:gap-0"
        >
          <div
            className="absolute -top-0.5 left-[115px] w-[380px] animate-fade-up motion-reduce:animate-none transition-[scale] duration-500 ease-out hover:scale-105 max-md:static max-md:w-full max-md:-my-1 max-md:left-0 max-md:top-0 max-md:right-0"
            style={{ animationDelay: "0.1s" }}
          >
            <img
              src={hero1}
              alt="Kartu saldo tabungan Rp 2.350.000"
              className="block w-full h-auto animate-orbit will-change-transform motion-reduce:animate-none"
              style={{
                animationDuration: "5s",
                ["--orbit-r" as string]: "8px",
              }}
            />
          </div>

          <div
            className="absolute top-[148px] -left-1 w-80 animate-fade-up motion-reduce:animate-none transition-[scale] duration-500 ease-out hover:scale-105 max-md:static max-md:w-full max-md:-my-5 max-md:left-0 max-md:top-0 max-md:right-0"
            style={{ animationDelay: "0.3s" }}
          >
            <img
              src={hero2}
              alt="Kartu wishlist headphone nirkabel, progres 62%"
              className="block w-full h-auto animate-orbit will-change-transform motion-reduce:animate-none"
              style={{
                animationDuration: "6s",
                animationDirection: "reverse",
                animationDelay: "-3s",
                ["--orbit-r" as string]: "12px",
              }}
            />
          </div>

          <div
            className="absolute top-[290px] right-px w-[290px] animate-fade-up motion-reduce:animate-none transition-[scale] duration-500 ease-out hover:scale-105 max-md:static max-md:w-full max-md:-my-5 max-md:left-0 max-md:top-0 max-md:right-0"
            style={{ animationDelay: "0.5s" }}
          >
            <img
              src={hero3}
              alt="Kartu pengeluaran Rp 650.000 dengan grafik mingguan"
              className="block w-full h-auto animate-orbit will-change-transform motion-reduce:animate-none"
              style={{
                animationDuration: "4.5s",
                animationDelay: "-2s",
                ["--orbit-r" as string]: "10px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};