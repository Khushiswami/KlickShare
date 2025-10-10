"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaUpload } from "react-icons/fa";
import styles from "@/styles/home.module.css";
import qr_styles from "@/styles/qr.module.css";
import htw_styles from "@/styles/howitworks.module.css";
import future_styles from "@/styles/future.module.css";
import trust_styles from "@/styles/trust.module.css";
import AnimatedContent from '../components/Animations/AnimatedContent';
import BounceCards from '../components/Animations/BounceCards';
import CountUp from '../components/Animations/CountUp';

export default function HomePage() {
  const words = ["Photographer", "Weddings", "Corporate Events", "Social Events", "Tours"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [bounce, setBounce] = useState(true);

  const images = [
    "https://picsum.photos/100/100?",
    "https://picsum.photos/500/500?",
    "https://picsum.photos/600/600?",
    "https://picsum.photos/700/700?",
    "https://picsum.photos/300/300?",
    "https://picsum.photos/800/800?",
  ];

  const transformStyles = [
    "rotate(5deg) translate(-380px)",
    "rotate(0deg) translate(-240px)",
    "rotate(-5deg) translate(-80px)",
    "rotate(0deg) translateY(-5px) translateX(90px)",
    "rotate(-4deg) translateY(20px) translateX(250px)",
    "rotate(-5deg) translate(400px)",
  ];

  // Word bounce effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(false); // start exit animation
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setBounce(true); // start bounce animation
      }, 300); // exit duration
    }, 2000); // total time per word
    return () => clearInterval(interval);
  }, []);

  // Scroll-triggered animation for BounceCards
  const [animateCards, setAnimateCards] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateCards(true);
            observer.unobserve(entry.target); // stop observing after first trigger
          }
        });
      },
      { threshold: 0.3 } // trigger when 30% visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>

      {/* Hero Section */}
      <AnimatedContent
        distance={100}
        direction="vertical"
        reverse={false}
        duration={1}
        initialOpacity={0.2}
        animateOpacity
        scale={1}
        threshold={0.2}
        delay={0.3}
      >
        <div><section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-16 lg:py-20 flex flex-col md:flex-row justify-between items-center gap-12 lg:gap-20">

          {/* Left Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 justify-center items-start">
            <h1 className={styles.heading}>
              <span className={styles.headingPrimary}>AI Photo sharing</span>
              <span className={styles.headingPrimary}>Solution for</span>
              <span
                className={`${styles.headingHighlight} ${bounce ? styles.bounceIn : styles.bounceOut}`}
              >
                {words[currentWordIndex]}
              </span>
            </h1>

            <p className={styles.subText}>
              Create Memories Anywhere, Anytime. With <br />Powerful Digital Album Solution
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button className={styles.uploadButton}>
                <FaUpload className="inline mr-2" /> Upload
              </button>

              <button className={`${styles.storeButton} flex items-center gap-2 px-4 py-2 rounded-lg`}>
                App Store
                <img src="/apple-log.svg" alt="Apple Store" className="w-5 h-5" />
              </button>

              <button className={`${styles.storeButton} flex items-center gap-2 px-4 py-2 rounded-lg`}>
                Play Store
                <img src="/playstore-logo.svg" alt="Google Play Store" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0">
            <Image
              src="/Mobile-mockup.svg"
              alt="Mobile Mockup"
              width={400}
              height={400}
              className={styles.mobileImage}
            />
          </div>
        </section></div>
      </AnimatedContent>


      {/* Card section */}
      <AnimatedContent
        distance={100}
        direction="vertical"
        reverse={false}
        duration={1}
        initialOpacity={0.2}
        animateOpacity
        scale={1}
        threshold={0.2}
        delay={0.3}
      >
        <section
          ref={sectionRef}
          className={`${qr_styles.qrSection} max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center min-h-screen text-center`}
        >
          <h2 className={qr_styles.heading}>
            QR Code Photo
            <br />
            Sharing Made Simple
          </h2>
          <p className={qr_styles.subText}>
            A QR code gives your guests an instant way to add their photos to your event collection.
            Everyone can easily contribute their perspective - whether it's photos from the dance floor,
            videos of special moments, or audio messages that capture the joy of your celebration.
            All content is automatically organized in your private digital album.
          </p>

          {/* Bounce Cards: animate on scroll */}
          <div className="mt-30 flex justify-center">
            {animateCards && (
              <BounceCards
                className="custom-bounceCards"
                images={images}
                containerWidth={500}
                containerHeight={250}
                animationDelay={1}
                animationStagger={0.08}
                easeType="elastic.out(1, 0.5)"
                transformStyles={transformStyles}
                enableHover={false}
              />
            )}
          </div>
        </section>
      </AnimatedContent>

      {/* How It Works Section */}
      <AnimatedContent
        distance={100}
        direction="vertical"
        reverse={false}
        duration={1}
        initialOpacity={0.2}
        animateOpacity
        scale={1}
        threshold={0.2}
        delay={0.3}
      >
        <div><section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold ${htw_styles.gradientText}`}>
              How does it work?
            </h2>
            <p className={`mt-4 text-center ${htw_styles.subText} text-lg`}>
              Hassle-free experience - for you and your party guests.
            </p>
          </div>

          {/* Step 1 - Image on Right */}
          <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
            {/* Left Content */}
            <div className="md:w-1/2 flex items-start gap-4">
              <div className={htw_styles.circleStep}>01</div>
              <div className="flex flex-col">
                <span className={htw_styles.stepLabel}>Step 1:</span>
                <span className={htw_styles.stepHeading}>Upload Your Photos</span>
                <span className={htw_styles.stepSubtext}>
                  Effortlessly upload your photos to the platform — quick, simple, and secure. Ideal for photographers and everyday users alike.              </span>
                <button className={htw_styles.button}>Upload</button>
              </div>
            </div>

            {/* Right Image */}
            <div className="md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
              <Image
                src="/step1-image.svg"
                alt="Step 1 Image"
                width={300}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Step 2 - Image on Left */}
          <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
            {/* Left Image */}
            <div className="md:w-1/2 flex justify-center md:justify-start order-1 md:order-1">
              <Image
                src="/step2-image.svg"
                alt="Step 2 Image"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>

            {/* Right Content */}
            <div className="md:w-1/2 flex items-start gap-4 order-2 md:order-2 mt-6 md:mt-0">
              <div className={htw_styles.circleStep}>02</div>
              <div className="flex flex-col">
                <span className={htw_styles.stepLabel}>Step 2:</span>
                <span className={htw_styles.stepHeading}>Create Groups</span>
                <span className={htw_styles.stepSubtext}>
                  Organize your memories into custom groups for events and occasions. Perfect for weddings, school trips,  and family reunions.              </span>
              </div>
            </div>
          </div>

          {/* Step 3 - Image on Right */}
          <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
            {/* Left Content */}
            <div className="md:w-1/2 flex items-start gap-4">
              <div className={htw_styles.circleStep}>03</div>
              <div className="flex flex-col">
                <span className={htw_styles.stepLabel}>Step 3:</span>
                <span className={htw_styles.stepHeading}>AI Recognition</span>
                <span className={htw_styles.stepSubtext}>
                  Let our smart engine automatically identify faces in your photos. Save time with instant and accurate recognition.                   </span>
              </div>
            </div>

            {/* Right Image */}
            <div className="md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
              <Image
                src="/step3-image.svg"
                alt="Step 3 Image"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Step 4 - Image on Left */}
          <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
            {/* Left Image */}
            <div className="md:w-1/2 flex justify-center md:justify-start order-1 md:order-1">
              <Image
                src="/step4-image.svg"
                alt="Step 4 Image"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>

            {/* Right Content */}
            <div className="md:w-1/2 flex items-start gap-4 order-2 md:order-2 mt-6 md:mt-0">
              <div className={htw_styles.circleStep}>04</div>
              <div className="flex flex-col">
                <span className={htw_styles.stepLabel}>Step 4:</span>
                <span className={htw_styles.stepHeading}>Smart Distribution</span>
                <span className={htw_styles.stepSubtext}>
                  Photos are auto-sorted and shared only with the right people. Ensuring privacy and a personalized viewing experience.             </span>
              </div>
            </div>
          </div>
        </section></div>
      </AnimatedContent>


      {/* Future of Photo Sharing Section */}
      <section className="bg-[#E6F9FA] py-16 px-4 sm:px-6 lg:px-12">
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={1}
          initialOpacity={0.2}
          animateOpacity
          scale={1}
          threshold={0.2}
          delay={0.3}
        >
          <div className={`max-w-7xl mx-auto bg-white rounded-xl flex flex-col md:flex-col lg:flex-col  gap-8 shadow ${future_styles.card}`}>

            {/* Flex Section: Left Text + Right Image */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* Left Section */}
              <div className="md:w-1/2 flex flex-col gap-6">
                <h2 className={`text-3xl md:text-4xl font-bold ${future_styles.gradientText}`}>
                  Welcome to the Future of Photo Sharing
                </h2>
                <p className={future_styles.subText}>
                  At Klickshare, we believe the memories deserve more than just storage — they deserve intelligent sharing.
                  We present a next-generation photo sharing platform designed to simplify how moments are captured, organized, and shared using facial recognition and modern group-based distribution.
                </p>
                <div className="flex gap-4 mt-4">
                  <button className={future_styles.joinButton}>Join Group</button>
                  <button className={future_styles.pricingButton}>Pricing</button>
                </div>
              </div>

              {/* Right Section */}
              <div className="md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
                <Image
                  src="/future-section.svg"
                  alt="Future of Photo Sharing"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Thin line */}
            <div className="w-full border-t border-gray-300 my-8"></div>

            {/* Three Info Sections */}
            <div className="flex flex-col md:flex-row justify-between gap-20">
              {/* Info Section 1 */}
              <div className="flex items-center gap-10 md:w-1/3">
                <Image
                  src="/facial-recognition.svg"
                  alt="Info 1"
                  width={50}
                  height={50}
                  className="flex-shrink-0"
                />
                <div className="flex flex-col">
                  <span className={future_styles.infoHeading}>Facial Recognition</span>
                  <span className={future_styles.infoSubtext}>
                    Automatically find your photos with smart facial recognition—no endless scrolling.                </span>
                </div>
              </div>

              {/* Info Section 2 */}
              <div className="flex items-center gap-10 md:w-1/3">
                <Image
                  src="/quality-retention.svg"
                  alt="Info 2"
                  width={50}
                  height={50}
                  className="flex-shrink-0"
                />
                <div className="flex flex-col">
                  <span className={future_styles.infoHeading}>Quality Retention</span>
                  <span className={future_styles.infoSubtext}>
                    Automatically find your photos with smart facial recognition—no endless scrolling.                </span>
                </div>
              </div>

              {/* Info Section 3 */}
              <div className="flex items-center gap-7 md:w-1/3">
                <Image
                  src="/unlimited-event-group.svg"
                  alt="Info 3"
                  width={50}
                  height={50}
                  className="flex-shrink-0"
                />
                <div className="flex flex-col">
                  <span className={future_styles.infoHeading}>Unlimited Event Groups</span>
                  <span className={future_styles.infoSubtext}>
                    Automatically find your photos with smart facial recognition—no endless scrolling.                </span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </section>


      {/* Trusted QR Code Photo Sharing Section */}
      <section className="bg-[#ffffff] py-16 px-4 sm:px-6 lg:px-12">
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={1}
          initialOpacity={0.2}
          animateOpacity
          scale={1}
          threshold={0.2}
          delay={0.3}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-30 ">

            {/* LEFT SECTION */}
            <div className="w-full md:w-1/2 flex flex-col gap-6">

              {/* Heading */}
              <h2 className={`text-3xl md:text-4xl font-bold ${trust_styles.gradientText}`}>
                Trusted QR Code Photo Sharing Worldwide
              </h2>

              {/* Subtext */}
              <p className={trust_styles.subText}>
                At Klickshare, we believe the memories deserve more than just storage — they deserve intelligent sharing.
                We present a next-generation photo sharing platform designed to simplify how moments are captured,
                organized, and shared using facial recognition and modern group-based distribution.
              </p>

              {/* Vertical Cards */}
              <div className="flex flex-col gap-4 mt-4">
                {/* Card 1 */}
                <div className={`flex justify-center items-center gap-4 p-4  ${trust_styles.trustCard}`}>
                  <Image
                    src="/15K.svg"
                    alt="Trust Card 1"
                    width={50}
                    height={50}
                    className="flex-shrink-0"
                  />
                  <div>
                    <h4 className={trust_styles.cardHeading}>
                      <CountUp from={0} to={15} separator="," duration={1} />K
                    </h4>
                    <p className={trust_styles.cardSubtext}>Active Users On App</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className={`flex justify-center items-center gap-4 p-4 rounded-lg ${trust_styles.trustCard}`}>
                  <Image
                    src="/1M.svg"
                    alt="Trust Card 2"
                    width={50}
                    height={50}
                    className="flex-shrink-0"
                  />
                  <div>
                    <h4 className={trust_styles.cardHeading}>
                      <CountUp from={0} to={1} separator="," duration={1} />M
                    </h4>
                    <p className={trust_styles.cardSubtext}>Photos Uploaded & Shared</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className={`flex justify-center items-center gap-4 p-4 rounded-lg ${trust_styles.trustCard}`}>
                  <Image
                    src="/ninenine.svg"
                    alt="Trust Card 3"
                    width={50}
                    height={50}
                    className="flex-shrink-0"
                  />
                  <div>
                    <h4 className={trust_styles.cardHeading}>
                      <CountUp from={0} to={99} duration={1} />%
                    </h4>
                    <p className={trust_styles.cardSubtext}>Face Recognition Accuracy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div className={`w-full md:w-[90%] h-full p-6 rounded-xl flex flex-col justify-between ${trust_styles.rightCard}`}>

                {/* Points */}
                <div className="flex flex-col gap-8">
                  {/* Point 1 */}
                  <div className="flex items-start gap-10">
                    <div className={trust_styles.circle}>
                      <Image src="/point1.svg" alt="Feature 1" width={24} height={24} />
                    </div>
                    <div>
                      <h4 className={`mb-3 ${trust_styles.pointHeading}`}>High resolution photos</h4>
                      <p className={trust_styles.pointSubtext}>Automatically find your photos with smart facial recognition—no endless scrolling.</p>
                    </div>
                  </div>

                  {/* Point 2 */}
                  <div className="flex items-start gap-10">
                    <div className={trust_styles.circle}>
                      <Image src="/point2.svg" alt="Feature 2" width={24} height={24} />
                    </div>
                    <div>
                      <h4 className={`mb-3 ${trust_styles.pointHeading}`}>One-click Download</h4>
                      <p className={trust_styles.pointSubtext}>With just one click, you can download all photos to your device or cloud storage.</p>
                    </div>
                  </div>

                  {/* Point 3 */}
                  <div className="flex items-start gap-10">
                    <div className={trust_styles.circle}>
                      <Image src="/point3.svg" alt="Feature 3" width={24} height={24} />
                    </div>
                    <div>
                      <h4 className={`mb-3 ${trust_styles.pointHeading}`}>Private & Secured</h4>
                      <p className={trust_styles.pointSubtext}>Your photos are private. Only you and those you share them with can access them.</p>
                    </div>
                  </div>

                  {/* Point 4 */}
                  <div className="flex items-start gap-10">
                    <div className={trust_styles.circle}>
                      <Image src="/point4.svg" alt="Feature 4" width={24} height={24} />
                    </div>
                    <div>
                      <h4 className={`mb-3 ${trust_styles.pointHeading}`}>Customizations</h4>
                      <p className={trust_styles.pointSubtext}>Create a personalized experience by customizing everything with your brand's colors and style.</p>
                    </div>
                  </div>

                  {/* Point 5 */}
                  <div className="flex items-start gap-10">
                    <div className={trust_styles.circle}>
                      <Image src="/point5.svg" alt="Feature 5" width={24} height={24} />
                    </div>
                    <div>
                      <h4 className={`mb-3 ${trust_styles.pointHeading}`}>High resolution photos</h4>
                      <p className={trust_styles.pointSubtext}>Automatically find your photos with smart facial recognition—no endless scrolling.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </AnimatedContent>


      </section>
    </>
  );
}
