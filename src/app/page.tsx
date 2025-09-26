import Image from "next/image";
import styles from "@/styles/home.module.css";
import cardStyles from "@/styles/cardsSection.module.css";
// import sectionStyles from "@/styles/section.module.css";
import growStyles from "@/styles/growSection.module.css";
import hoverStyles from "@/styles/hovercardSection.module.css";


export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        {/* Background image */}
        <div className={styles.heroBg}>
          <Image
            src="/herobg.png"
            alt="Background pattern"
            fill
            priority
            className={styles.bgImage}
          />
        </div>

        {/* Content container */}
        <div className={styles.heroContent}>
          {/* Left side text */}
          <div className={styles.left}>
            <h1>
              Simplify Photo Sharing with
              Powerful Digital Album Solution
            </h1>
            <div className={styles.up}>
              <button className={styles.uploadBtn}>Upload</button>
              <p>Create Memories Anywhere, Anytime.</p>
            </div>

            <div className={styles.storeBtns}>
              <div className={styles.buttons}>
                <div>
                  <p>Download it on</p>
                  <p>App Store</p>
                </div>
                <div>
                  <Image
                    src="/apple-log.svg"
                    alt="Download on the App Store"
                    width={40}
                    height={40}
                  />
                </div>
              </div>

              <div className={styles.buttons}>
                <div>
                  <p>Get it on</p>
                  <p>Google Play</p>
                </div>
                <div>
                  <Image
                    src="/playstore-logo.svg"
                    alt="Get it on Google Play"
                    width={35}
                    height={30}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Mockup OUTSIDE hero to prevent clipping */}
      <div className={styles.mobileWrapper}>
        <Image
          src="/mobile.svg"
          alt="Mobile Mockup"
          width={500}
          height={500}
          className={styles.mobileImg}
        />
      </div>


      {/* Cards Section */}
      <section className={cardStyles.cardsContainer}>
        {/* Top Row Cards */}
        <div className={cardStyles.cardRow}>
          {/* Card 1 */}
          <div className={`${cardStyles.card} ${cardStyles.topCard}`}>
            <div className={cardStyles.cardHeader}>
              <h3>Facial Recognition</h3>
              <div className={cardStyles.arrowIcon}>
                <Image src="/arrow-up-right.svg" alt="Arrow icon" width={20} height={20} />
              </div>
            </div>
            <p>
              Automatically Find Your Photos With Smart Facial Recognition—No Endless Scrolling.
            </p>
            <div className={cardStyles.cardIcon}>
              <Image src="/facial-recognition.svg" alt="Facial Recognition Icon" width={90} height={90} />
            </div>
          </div>

          {/* Card 2 */}
          <div className={`${cardStyles.card} ${cardStyles.topCard}`}>
            <div className={cardStyles.cardHeader}>
              <h3>Quality Retention</h3>
              <div className={cardStyles.arrowIcon}>
                <Image src="/arrow-up-right.svg" alt="Arrow icon" width={20} height={20} />
              </div>
            </div>
            <p>Keep your photos sharp and clear without losing quality after upload.</p>
            <div className={cardStyles.cardIcon}>
              <Image src="/quality-retention.svg" alt="Quality Retention Icon" width={80} height={80} />
            </div>
          </div>

          {/* Card 3 */}
          <div className={`${cardStyles.card} ${cardStyles.topCard}`}>
            <div className={cardStyles.cardHeader}>
              <h3>Unlimited Event Groups</h3>
              <div className={cardStyles.arrowIcon}>
                <Image src="/arrow-up-right.svg" alt="Arrow icon" width={20} height={20} />
              </div>
            </div>
            <p>Organize memories with unlimited event groups for every occasion.</p>
            <div className={cardStyles.cardIcon}>
              <Image src="/unlimited-event-group.svg" alt="Event Groups Icon" width={80} height={80} />
            </div>
          </div>
        </div>

        {/* Second Row Cards */}
        <div className={cardStyles.cardRow}>
          {/* Card 4 */}
          <div className={cardStyles.statscard}>
            <div className={cardStyles.statscontent}>
              <Image src="/15K.svg" alt="15K" width={60} height={60} />
              <div>
                <h3>15K</h3>
                <p>Active User On App</p>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className={cardStyles.statscard}>
            <div className={cardStyles.statscontent}>
              <Image src="/1M.svg" alt="1M" width={60} height={60} />
              <div>
                <h3>1M</h3>
                <p>photos Upload & Share</p>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className={cardStyles.statscard}>
            <div className={cardStyles.statscontent}>
              <Image src="/ninenine.svg" alt="99%" width={60} height={60} />
              <div>
                <h3>99%</h3>
                <p>face Recognition Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* What is Klickshare */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-12 md:mx-[150px]">
        <div className="w-full md:w-1/2">
          <Image
            src="/what-is-klickshare.svg"
            alt="Image"
            width={500}
            height={500}
            className="w-full h-auto rounded-xl"
          />
        </div>
        <div className="w-full md:w-1/2 mt-6 md:mt-0 text-center md:text-left">
          <h2 className="text-[#1F6563] text-2xl font-bold mb-4">What is Klickshare?</h2>
          <p className="text-black text-base leading-relaxed">
            Klickshare is a smart digital album platform that helps you organize, share, and relive memories effortlessly.
            With facial recognition, quality retention, unlimited event groups, and one-shot uploads, it makes photo sharing simple,
            secure, and fun. It’s built for photographers, families, and event organizers who want stress-free photo management.
          </p>
        </div>
      </section>


      {/* Grow Section */}
      <section className={growStyles.growSection}>
        <div className={growStyles.growWrapper}>
          <h2>Grow Your Photography Business Today</h2>
          <div className={growStyles.growContent}>
            <p>Stand out with professionalism and leave a lasting impression.</p>
            <button className={growStyles.growButton}>Start Sharing Now</button>
          </div>
        </div>
      </section>


      {/* 4 HOVER CARD SECTION */}
      <section className={hoverStyles.hovercardSection}>
        <h1 className={hoverStyles.sectionHeading}>Get Started with Klickshare – 4 Steps</h1>

        <div className={hoverStyles.cardsSection}>
          {/* Card 1 */}
          <div className={`${hoverStyles.card} ${hoverStyles.top} ${hoverStyles.expandUp}`}>
            <div className={hoverStyles.cardInner}>
              <div className={hoverStyles.cardHeader}>
                <h1 className={hoverStyles.cardNumber}>01</h1>
                <h2 className={hoverStyles.cardTitle}>Sign Up & Face Recognition</h2>
              </div>
              <div className={hoverStyles.cardContent}>
                <p className={hoverStyles.shortText}>Sign up using your phone number or email...</p>
                <p className={hoverStyles.extraText}>This ensures a secure, verified identity for safe photo sharing.</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className={`${hoverStyles.card} ${hoverStyles.top} ${hoverStyles.expandUp}`}>
            <div className={hoverStyles.cardInner}>
              <div className={hoverStyles.cardHeader}>
                <h1 className={hoverStyles.cardNumber}>02</h1>
                <h2 className={hoverStyles.cardTitle}>Join and Create Groups</h2>
              </div>
              <div className={hoverStyles.cardContent}>
                <p className={hoverStyles.shortText}>Upload photos from multiple sources...</p>
                <p className={hoverStyles.extraText}>Everyone in the group can view, enjoy, and engage.</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className={`${hoverStyles.card} ${hoverStyles.bottom} ${hoverStyles.expandDown}`}>
            <div className={hoverStyles.cardInner}>
              <div className={hoverStyles.cardHeader}>
                <h1 className={hoverStyles.cardNumber}>03</h1>
                <h2 className={hoverStyles.cardTitle}>Relive & Securely Download</h2>
              </div>
              <div className={hoverStyles.cardContent}>
                <p className={hoverStyles.shortText}>View and download your photos securely anytime...</p>
                <p className={hoverStyles.extraText}>Premium plans unlock extra storage and options.</p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className={`${hoverStyles.card} ${hoverStyles.bottom} ${hoverStyles.expandDown}`}>
            <div className={hoverStyles.cardInner}>
              <div className={hoverStyles.cardHeader}>
                <h1 className={hoverStyles.cardNumber}>04</h1>
                <h2 className={hoverStyles.cardTitle}>Share Memories</h2>
              </div>
              <div className={hoverStyles.cardContent}>
                <p className={hoverStyles.shortText}>Join existing event groups or create your own...</p>
                <p className={hoverStyles.extraText}>Keep photos organized and shared with the people.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Camera Image */}
      <section className="m-0">
        <Image
            src="/Camera.svg"
            alt="Image"
            width={500}
            height={500}
            className="w-full h-auto rounded-xl"
          />
      </section>


    </>
  );
}
